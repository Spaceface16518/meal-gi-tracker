import SwiftUI

struct GIEventEntryForm: View {
    @Binding var draft: GIEventDraft
    let message: AppMessage?

    var body: some View {
        Form {
            if let message {
                Section { StatusBanner(message: message) }
            }

            Section("Timing") {
                DatePicker("Occurred at", selection: $draft.occurredAt)
                Stepper("Severity: \(draft.severity)", value: $draft.severity, in: 1...10)
            }

            Section("Symptoms") {
                SymptomsPicker(symptoms: $draft.symptoms)
            }

            Section("Stool") {
                StoolTypeSlider(stoolType: $draft.stoolType)
            }

            Section("Details") {
                TextField("Duration minutes", value: $draft.durationMinutes, format: .number)
                TextField("Notes", text: $draft.notes)
                    .onChange(of: draft.notes) { _, value in
                        draft.notes = String(value.prefix(1000))
                    }
            }
        }
    }
}

#Preview {
    @Previewable @State var draft = GIEventDraft(symptoms: ["bloating", "reflux"], stoolType: 4)

    NavigationStack {
        GIEventEntryForm(draft: $draft, message: .error("Choose a symptom or stool type."))
            .navigationTitle("Add GI Event")
    }
}
