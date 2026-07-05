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
            Section("Optional context") {
                TextField("Urgency (0–10)", value: $draft.urgencyScore, format: .number).keyboardType(.numberPad)
                TextField("Stress (0–10)", value: $draft.stressLevel, format: .number).keyboardType(.numberPad)
                TextField("Previous night sleep (0–10)", value: $draft.sleepQuality, format: .number).keyboardType(.numberPad)
                Toggle("Recent illness", isOn: $draft.recentIllness)
                Picker("Exercise in prior 24 hours", selection: $draft.exerciseIntensity) { Text("Not set").tag(""); ForEach(["none", "light", "moderate", "vigorous"], id: \.self) { Text($0.capitalized).tag($0) } }
                TextField("Suspected cause", text: $draft.suspectedCause)
                ForEach(["NSAIDs", "antibiotics", "antacids", "laxatives"], id: \.self) { medication in
                    Toggle(medication, isOn: Binding(get: { draft.medicationFlags.contains(medication) }, set: { enabled in if enabled { draft.medicationFlags.append(medication) } else { draft.medicationFlags.removeAll { $0 == medication } } }))
                }
            }
        }
    }
}

#Preview("Completed event") {
    @Previewable @State var draft = GIEventDraft(
        severity: 7,
        symptoms: ["bloating", "reflux", "nausea"],
        notes: "Symptoms started after lunch and eased after drinking water.",
        stoolType: 4,
        durationMinutes: 35
    )

    NavigationStack {
        GIEventEntryForm(draft: $draft, message: .success("Event is ready to save."))
            .navigationTitle("Add GI Event")
    }
}

#Preview("Validation error") {
    @Previewable @State var draft = GIEventDraft()

    NavigationStack {
        GIEventEntryForm(draft: $draft, message: .error("Choose a symptom or stool type."))
            .navigationTitle("Add GI Event")
    }
}
