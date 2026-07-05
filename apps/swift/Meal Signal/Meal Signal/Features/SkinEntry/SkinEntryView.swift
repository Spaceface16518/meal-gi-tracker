import SwiftUI

private enum SkinEntryMode: String, CaseIterable, Identifiable {
    case daily = "Day"
    case timed = "Time"

    var id: String { rawValue }
}

private struct SkinEntryDraft {
    var mode: SkinEntryMode = .daily
    var date = Date()
    var occurredAt = Date()
    var severity = 4
    var symptoms: [String] = []
    var bodyAreas: [String] = []
    var conditions = SkinEntryDraft.savedConditions
    var durationMinutes: Int?
    var notes = ""

    var trimmedNotes: String? {
        notes.trimmingCharacters(in: .whitespacesAndNewlines).nilIfEmpty
    }

    static var defaultConditions: [SkinConditionAssessment] {
        skinConditionOptions.map { SkinConditionAssessment(condition: $0, severity: 0, bodyAreas: []) }
    }

    static var savedConditions: [SkinConditionAssessment] {
        guard
            let data = UserDefaults.standard.data(forKey: "meal-signal:daily-skin-settings:v1"),
            let decoded = try? JSONDecoder().decode([SkinConditionAssessment].self, from: data)
        else { return defaultConditions }

        let saved = Dictionary(uniqueKeysWithValues: decoded.map { ($0.condition, $0) })
        return skinConditionOptions.map { saved[$0] ?? SkinConditionAssessment(condition: $0, severity: 0, bodyAreas: []) }
    }

    func persistConditions() {
        guard let data = try? JSONEncoder().encode(conditions) else { return }
        UserDefaults.standard.set(data, forKey: "meal-signal:daily-skin-settings:v1")
    }
}

struct SkinEntryView: View {
    @Environment(\.firebaseService) private var service
    @Environment(\.dismiss) private var dismiss

    let readOnly: Bool
    @State private var draft = SkinEntryDraft()
    @State private var message: AppMessage?
    @State private var isSaving = false

    var body: some View {
        NavigationStack {
            Form {
                if let message {
                    Section { StatusBanner(message: message) }
                }

                Section {
                    Picker("Entry type", selection: $draft.mode) {
                        ForEach(SkinEntryMode.allCases) { mode in
                            Text(mode.rawValue).tag(mode)
                        }
                    }
                    .pickerStyle(.segmented)
                    .onChange(of: draft.mode) { _, _ in Haptics.selection() }
                } footer: {
                    Text(draft.mode == .daily
                        ? "Record skin quality for a calendar day. Saving the same day updates it."
                        : "Record a specific observation or flare.")
                }

                if draft.mode == .daily {
                    dailyForm
                } else {
                    timedForm
                }

                Section("Notes") {
                    TextField("Optional notes", text: $draft.notes, axis: .vertical)
                        .lineLimit(2...5)
                        .onChange(of: draft.notes) { _, value in
                            draft.notes = String(value.prefix(1000))
                        }
                }
            }
            .navigationTitle("Track Skin")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    ToolbarActionButton(title: "Cancel", systemImage: "xmark") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    ToolbarActionButton(
                        title: isSaving ? "Saving skin entry" : "Save skin entry",
                        systemImage: "checkmark",
                        isLoading: isSaving,
                        action: save
                    )
                    .disabled(!canSave)
                }
            }
        }
        .presentationDetents([.medium, .large])
    }

    private var canSave: Bool {
        !isSaving && (draft.mode == .daily || !draft.symptoms.isEmpty)
    }

    private var dailyForm: some View {
        Group {
            Section("Date") {
                DatePicker("Skin day", selection: $draft.date, displayedComponents: .date)
            }

            ForEach($draft.conditions) { $condition in
                Section(condition.condition.capitalized) {
                    Stepper("Severity: \(condition.severity)", value: $condition.severity, in: 0...10)
                    SkinTagPicker(
                        title: "Body areas",
                        options: skinBodyAreaOptions,
                        selection: $condition.bodyAreas
                    )
                }
            }
        }
    }

    private var timedForm: some View {
        Group {
            Section("Timing") {
                DatePicker("Observed at", selection: $draft.occurredAt)
                Stepper("Severity: \(draft.severity)", value: $draft.severity, in: 1...10)
            }

            Section("Symptoms") {
                SkinTagPicker(
                    title: "Choose at least one",
                    options: skinSymptomOptions,
                    selection: $draft.symptoms
                )
            }

            Section("Body areas") {
                SkinTagPicker(
                    title: "Optional",
                    options: skinBodyAreaOptions,
                    selection: $draft.bodyAreas
                )
            }

            Section("Duration") {
                TextField("Minutes", value: $draft.durationMinutes, format: .number)
                    .keyboardType(.numberPad)
                if let duration = draft.durationMinutes, !(1...1440).contains(duration) {
                    Text("Use a duration from 1 to 1440 minutes.")
                        .font(.footnote)
                        .foregroundStyle(.red)
                }
            }
        }
    }

    private func save() {
        if readOnly {
            message = .error(demoReadOnlyMessage)
            Haptics.warning()
            return
        }
        if draft.mode == .timed, draft.symptoms.isEmpty {
            message = .error("Choose at least one skin symptom.")
            Haptics.warning()
            return
        }
        if let duration = draft.durationMinutes, !(1...1440).contains(duration) {
            message = .error("Use a duration from 1 to 1440 minutes.")
            Haptics.warning()
            return
        }

        Task {
            isSaving = true
            defer { isSaving = false }
            do {
                if draft.mode == .daily {
                    try await service.saveDailySkinEntry(
                        localDate: draft.date.formatted(.iso8601.year().month().day()),
                        conditions: draft.conditions,
                        notes: draft.trimmedNotes
                    )
                    draft.persistConditions()
                } else {
                    try await service.saveTimedSkinEntry(
                        occurredAt: draft.occurredAt,
                        severity: draft.severity,
                        symptoms: draft.symptoms,
                        bodyAreas: draft.bodyAreas,
                        notes: draft.trimmedNotes,
                        durationMinutes: draft.durationMinutes
                    )
                }
                Haptics.success()
                dismiss()
            } catch {
                message = .error("Skin entry could not be saved.")
                Haptics.error()
            }
        }
    }
}

private struct SkinTagPicker: View {
    let title: String
    let options: [String]
    @Binding var selection: [String]

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(title)
                .font(.footnote)
                .foregroundStyle(.secondary)
            FlowLayout(spacing: 8) {
                ForEach(options, id: \.self) { option in
                    Button(option.capitalized) { toggle(option) }
                        .buttonStyle(.bordered)
                        .tint(selection.contains(option) ? MealSignalDesign.brand : .secondary)
                        .accessibilityValue(selection.contains(option) ? "Selected" : "Not selected")
                }
            }
        }
        .padding(.vertical, 4)
    }

    private func toggle(_ option: String) {
        if selection.contains(option) {
            selection.removeAll { $0 == option }
        } else {
            selection.append(option)
        }
        Haptics.selection()
    }
}

#Preview("Daily skin") {
    SkinEntryView(readOnly: false)
}
