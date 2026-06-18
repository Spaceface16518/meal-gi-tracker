import AVFoundation
import Foundation
import FoundationModels
import Speech
import Vision

struct MealInterpretation: Equatable {
    enum Source: String {
        case localVoice
        case localImage
    }

    let text: String
    let confidence: Double
    let warnings: [String]
    let source: Source

    var usableText: String? {
        let trimmed = text.trimmingCharacters(in: .whitespacesAndNewlines)
        return trimmed.count > 2 && confidence >= 0.25 ? trimmed : nil
    }

    var warningText: String? {
        warnings.joined(separator: " ").nilIfEmpty
    }
}

enum LocalMealInterpretationError: LocalizedError {
    case unavailable(String)
    case unusable

    var errorDescription: String? {
        switch self {
        case .unavailable(let reason):
            reason
        case .unusable:
            "Local processing did not produce enough meal text."
        }
    }
}

protocol LocalMealInterpreter {
    func interpretVoice(fileURL: URL) async throws -> MealInterpretation
    func interpretImage(_ media: Media) async throws -> MealInterpretation
}

struct AppleLocalMealInterpreter: LocalMealInterpreter {
    func interpretVoice(fileURL: URL) async throws -> MealInterpretation {
        guard #available(iOS 26.0, *) else {
            throw LocalMealInterpretationError.unavailable("Local speech transcription requires iOS 26.")
        }
        guard SpeechTranscriber.isAvailable else {
            throw LocalMealInterpretationError.unavailable("Local speech transcription is unavailable.")
        }

        let locale = await SpeechTranscriber.supportedLocale(equivalentTo: .current) ?? .current
        let transcriber = SpeechTranscriber(locale: locale, preset: .transcription)
        let modules: [any SpeechModule] = [transcriber]
        try await prepareSpeechAssets(for: modules)

        let audioFile = try AVAudioFile(forReading: fileURL)
        async let transcript = transcriber.results.reduce("") { partial, result in
            [partial, String(result.text.characters)]
                .filter { !$0.isEmpty }
                .joined(separator: " ")
        }

        let analyzer = SpeechAnalyzer(modules: modules)
        _ = try await analyzer.analyzeSequence(from: audioFile)
        try await analyzer.finalizeAndFinishThroughEndOfInput()

        let text = try await transcript.trimmingCharacters(in: .whitespacesAndNewlines)
        let interpretation = MealInterpretation(
            text: text,
            confidence: text.count > 2 ? 0.85 : 0,
            warnings: [],
            source: .localVoice
        )
        guard interpretation.usableText != nil else { throw LocalMealInterpretationError.unusable }
        return interpretation
    }

    func interpretImage(_ media: Media) async throws -> MealInterpretation {
        let handler = ImageRequestHandler(media.data)
        var textRequest = RecognizeTextRequest()
        textRequest.recognitionLevel = .accurate
        textRequest.automaticallyDetectsLanguage = true
        textRequest.usesLanguageCorrection = true

        async let recognizedText = recognizeText(with: handler, request: textRequest)
        async let classifications = classifyImage(with: handler)

        let imageText = try await recognizedText
        let labels = try await classifications
        let confidence = max(imageText.confidence, labels.first?.confidence ?? 0)

        var warnings = [String]()
        let localDescription: String?
        do {
            localDescription = try await describeMeal(text: imageText.lines, labels: labels.map(\.name))
        } catch {
            localDescription = nil
            warnings.append("Apple Intelligence was unavailable; used local Vision output.")
        }
        let fallbackDescription = fallbackDescription(text: imageText.lines, labels: labels.map(\.name))
        let description = localDescription ?? fallbackDescription

        let interpretation = MealInterpretation(
            text: description,
            confidence: Double(confidence),
            warnings: localDescription == nil && warnings.isEmpty
                ? ["Apple Intelligence was unavailable; used local Vision output."]
                : warnings,
            source: .localImage
        )
        guard interpretation.usableText != nil else { throw LocalMealInterpretationError.unusable }
        return interpretation
    }

    @available(iOS 26.0, *)
    private func prepareSpeechAssets(for modules: [any SpeechModule]) async throws {
        switch await AssetInventory.status(forModules: modules) {
        case .installed:
            return
        case .supported, .downloading:
            guard let request = try await AssetInventory.assetInstallationRequest(supporting: modules) else { return }
            try await request.downloadAndInstall()
        case .unsupported:
            throw LocalMealInterpretationError.unavailable("Local speech assets are unsupported for this locale.")
        @unknown default:
            throw LocalMealInterpretationError.unavailable("Local speech assets are unavailable.")
        }
    }

    private func recognizeText(
        with handler: ImageRequestHandler,
        request: RecognizeTextRequest
    ) async throws -> (lines: [String], confidence: Float) {
        let observations = try await handler.perform(request)
        let candidates = observations.compactMap { observation in
            observation.topCandidates(1).first.map {
                (text: $0.string.trimmingCharacters(in: .whitespacesAndNewlines), confidence: observation.confidence)
            }
        }
        return (
            candidates.map(\.text).filter { !$0.isEmpty },
            candidates.map(\.confidence).max() ?? 0
        )
    }

    private func classifyImage(with handler: ImageRequestHandler) async throws -> [(name: String, confidence: Float)] {
        let observations = try await handler.perform(ClassifyImageRequest())
        return observations
            .filter { $0.confidence >= 0.2 }
            .prefix(8)
            .map { ($0.identifier.replacingOccurrences(of: "_", with: " "), $0.confidence) }
    }

    private func describeMeal(text: [String], labels: [String]) async throws -> String? {
        guard #available(iOS 26.0, *) else { return nil }

        let model = SystemLanguageModel(useCase: .contentTagging)
        guard model.isAvailable else { return nil }

        let prompt = """
        Create one concise editable meal description from local image signals.
        Return only the likely meal foods, not analysis or advice.
        Visible text: \(text.joined(separator: ", "))
        Image labels: \(labels.joined(separator: ", "))
        """
        let session = LanguageModelSession(
            model: model,
            instructions: "You write short meal descriptions for a food tracking app."
        )
        let response = try await session.respond(to: prompt)
        return response.content.trimmingCharacters(in: .whitespacesAndNewlines).nilIfEmpty
    }

    private func fallbackDescription(text: [String], labels: [String]) -> String {
        if !text.isEmpty {
            return text.joined(separator: ", ")
        }
        return labels.prefix(5).joined(separator: ", ")
    }
}
