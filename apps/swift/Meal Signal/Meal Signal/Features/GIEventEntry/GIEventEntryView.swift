import SwiftUI

struct GIEventDraft {
    var occurredAt = Date()
    var severity = 4
    var symptoms: [String] = []
    var notes = ""
    var stoolType: Int?
    var durationMinutes: Int?

    var trimmedNotes: String? {
        notes.trimmingCharacters(in: .whitespacesAndNewlines).nilIfEmpty
    }
}

struct GIEventEntryView: View {
    @Environment(\.firebaseService) private var service
    @Environment(\.dismiss) private var dismiss

    @State private var draft = GIEventDraft()
    @State private var message: AppMessage?
    @State private var isSaving = false

    private var canSave: Bool {
        (!draft.symptoms.isEmpty || draft.stoolType != nil) && !isSaving
    }

    var body: some View {
        NavigationStack {
            GIEventEntryForm(draft: $draft, message: message)
                .navigationTitle("Add GI Event")
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
            guard !draft.symptoms.isEmpty || draft.stoolType != nil else {
                message = .error("Choose a symptom or stool type.")
                return
            }

            isSaving = true
            defer { isSaving = false }

            do {
                try await service.createEvent(
                    occurredAt: draft.occurredAt,
                    severity: draft.severity,
                    symptoms: draft.symptoms,
                    notes: draft.trimmedNotes,
                    stoolType: draft.stoolType,
                    durationMinutes: draft.durationMinutes
                )
                dismiss()
            } catch {
                message = .error("Event could not be saved.")
            }
        }
    }
}
