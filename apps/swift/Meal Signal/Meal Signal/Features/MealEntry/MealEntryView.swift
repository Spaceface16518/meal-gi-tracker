import SwiftUI

struct MealDraft {
    var mode: InputMode = .text
    var text = ""
    var notes = ""
    var eatenAt = Date()
    var mediaBase64 = ""
    var mimeType = ""
    var processingSource: MealProcessingSource?
    var localProcessingWarning = ""

    var trimmedText: String {
        text.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    var trimmedNotes: String? {
        notes.trimmingCharacters(in: .whitespacesAndNewlines).nilIfEmpty
    }

    var textPayload: String? {
        trimmedText.nilIfEmpty
    }

    var mediaBase64Payload: String? {
        textPayload == nil ? mediaBase64.nilIfEmpty : nil
    }

    var mimeTypePayload: String? {
        textPayload == nil ? mimeType.nilIfEmpty : nil
    }

    var processingSourcePayload: String? {
        processingSource?.rawValue
    }

    var localProcessingWarningPayload: String? {
        localProcessingWarning.trimmingCharacters(in: .whitespacesAndNewlines).nilIfEmpty
    }

    var hasMedia: Bool {
        !mediaBase64.isEmpty && !mimeType.isEmpty
    }

    var hasLocalText: Bool {
        mode != .text && textPayload != nil
    }

    var canSave: Bool {
        switch mode {
        case .text:
            trimmedText.count > 2
        case .voice, .image:
            trimmedText.count > 2 || hasMedia
        }
    }

    mutating func clearMedia() {
        mediaBase64 = ""
        mimeType = ""
        processingSource = nil
        localProcessingWarning = ""
        if mode != .text { text = "" }
    }
}

enum MealProcessingSource: String {
    case local
    case cloud
}

struct MealEntryView: View {
    @Environment(\.firebaseService) private var service
    @Environment(\.dismiss) private var dismiss

    @State private var draft = MealDraft()
    @State private var message: AppMessage?
    @State private var isSaving = false

    private var canSave: Bool {
        draft.canSave && !isSaving
    }

    var body: some View {
        NavigationStack {
            MealEntryForm(draft: $draft, message: message)
                .navigationTitle("Add Meal")
                .navigationBarTitleDisplayMode(.inline)
                .toolbar {
                    ToolbarItem(placement: .cancellationAction) {
                        Button("Cancel", action: cancel)
                    }
                    ToolbarItem(placement: .confirmationAction) {
                        Button(action: save) {
                            LoadingLabel(title: isSaving ? "Saving" : "Save", isLoading: isSaving)
                        }
                            .disabled(!canSave)
                    }
                }
        }
        .presentationDetents([.medium, .large])
    }

    private func cancel() {
        dismiss()
    }

    private func save() {
        Task {
            isSaving = true
            defer { isSaving = false }

            do {
                try await service.createMeal(
                    mode: draft.mode,
                    text: draft.textPayload,
                    mediaBase64: draft.mediaBase64Payload,
                    mimeType: draft.mimeTypePayload,
                    eatenAt: draft.eatenAt,
                    notes: draft.trimmedNotes,
                    processingSource: draft.processingSourcePayload,
                    localProcessingWarning: draft.localProcessingWarningPayload
                )
                dismiss()
            } catch {
                message = .error("Meal could not be saved.")
            }
        }
    }
}
