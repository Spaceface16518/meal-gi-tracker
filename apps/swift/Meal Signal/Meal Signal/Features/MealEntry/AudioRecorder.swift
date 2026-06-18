import AVFoundation
import Foundation
import Observation

@MainActor
@Observable
final class AudioRecorder {
    var isRecording = false

    private var recorder: AVAudioRecorder?
    private var recordingURL: URL?

    func start() async throws {
        guard !isRecording else { return }

        let session = AVAudioSession.sharedInstance()
        let isAllowed = await requestRecordPermission()
        guard isAllowed else { throw MediaError.recordingUnavailable }

        try session.setCategory(.playAndRecord, mode: .spokenAudio)
        try session.setActive(true)

        let url = FileManager.default.temporaryDirectory
            .appendingPathComponent(UUID().uuidString)
            .appendingPathExtension("m4a")
        let settings: [String: Any] = [
            AVFormatIDKey: Int(kAudioFormatMPEG4AAC),
            AVSampleRateKey: 12_000,
            AVNumberOfChannelsKey: 1,
            AVEncoderAudioQualityKey: AVAudioQuality.medium.rawValue,
        ]

        let recorder = try AVAudioRecorder(url: url, settings: settings)
        guard recorder.record() else { throw MediaError.recordingUnavailable }

        self.recorder = recorder
        recordingURL = url
        isRecording = true
    }

    func stop() throws -> Media {
        guard let recorder, let recordingURL else {
            throw MediaError.recordingUnavailable
        }

        recorder.stop()
        isRecording = false
        self.recorder = nil
        self.recordingURL = nil

        let data = try Data(contentsOf: recordingURL)
        try? FileManager.default.removeItem(at: recordingURL)
        return Media(data: data, mimeType: "audio/mp4")
    }

    private func requestRecordPermission() async -> Bool {
        return await AVAudioApplication.requestRecordPermission()
    }
}
