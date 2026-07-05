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

    nonisolated init(
        occurredAt: Date = Date(),
        severity: Int = 4,
        symptoms: [String] = [],
        notes: String = "",
        stoolType: Int? = nil,
        durationMinutes: Int? = nil
    ) {
        self.occurredAt = occurredAt
        self.severity = severity
        self.symptoms = symptoms
        self.notes = notes
        self.stoolType = stoolType
        self.durationMinutes = durationMinutes
    }

    nonisolated init(event: GIEvent) {
        occurredAt = event.occurredAt
        severity = event.severity
        symptoms = event.symptoms
        notes = event.notes ?? ""
        stoolType = event.stoolType
        durationMinutes = event.durationMinutes
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
                        ToolbarActionButton(title: "Cancel", systemImage: "xmark", action: cancel)
                    }
                    ToolbarItem(placement: .confirmationAction) {
                        ToolbarActionButton(
                            title: isSaving ? "Saving event" : "Save event",
                            systemImage: "checkmark",
                            isLoading: isSaving,
                            action: save
                        )
                        .disabled(!canSave)
                    }
                }
        }
        .presentationDetents([.medium, .large])
        .sensoryFeedback(.impact, trigger: isSaving)
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
                isSaving = false
                dismiss()
            } catch {
                message = .error("Event could not be saved.")
            }
        }
    }
}
