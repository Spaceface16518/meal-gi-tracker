import SwiftUI

struct MealDraft {
    var mode: InputMode = .text
    var text = ""
    var notes = ""
    var eatenAt = Date()
    var mediaBase64 = ""
    var mimeType = ""

    var trimmedText: String {
        text.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    var trimmedNotes: String? {
        notes.trimmingCharacters(in: .whitespacesAndNewlines).nilIfEmpty
    }

    var textPayload: String? {
        mode == .text ? trimmedText : nil
    }

    var hasMedia: Bool {
        !mediaBase64.isEmpty && !mimeType.isEmpty
    }

    var canSave: Bool {
        switch mode {
        case .text:
            trimmedText.count > 2
        case .voice, .image:
            hasMedia
        }
    }

    mutating func clearMedia() {
        mediaBase64 = ""
        mimeType = ""
    }
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
                        Button("Save", action: save)
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
                    mediaBase64: draft.mediaBase64,
                    mimeType: draft.mimeType,
                    eatenAt: draft.eatenAt,
                    notes: draft.trimmedNotes
                )
                dismiss()
            } catch {
                message = .error("Meal could not be saved.")
            }
        }
    }
}
