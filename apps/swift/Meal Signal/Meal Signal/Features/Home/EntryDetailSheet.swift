import SwiftUI

struct EntryDetailSheet: View {
    @Environment(\.firebaseService) private var service
    @Environment(\.dismiss) private var dismiss

    @State private var entry: RecentEntry
    @State private var eventDraft: GIEventDraft
    @State private var isEditingEvent = false
    @State private var isSavingEvent = false
    @State private var message: AppMessage?

    init(entry: RecentEntry) {
        _entry = State(initialValue: entry)
        _eventDraft = State(initialValue: entry.event.map(GIEventDraft.init(event:)) ?? GIEventDraft())
    }

    var body: some View {
        NavigationStack {
            Group {
                if isEditingEvent {
                    GIEventEntryForm(draft: $eventDraft, message: message)
                        .scrollContentBackground(.hidden)
                } else {
                    ScrollView {
                        VStack(alignment: .leading, spacing: 18) {
                            if let message {
                                StatusBanner(message: message)
                            }
                            EntryDetailHeader(entry: entry)

                            if let event = entry.event {
                                GIEventDetailContent(event: event)
                            } else if let meal = entry.meal {
                                MealDetailContent(meal: meal)
                            }
                        }
                        .padding()
                    }
                }
            }
            .background(MealSignalDesign.background.ignoresSafeArea())
            .navigationTitle(entry.kind == .meal ? "Meal Details" : "Event Details")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                if entry.event != nil {
                    ToolbarItem(placement: .topBarLeading) {
                        Button(isEditingEvent ? "View" : "Edit", action: toggleEventEditing)
                            .disabled(isSavingEvent)
                    }
                    if isEditingEvent {
                        ToolbarItem(placement: .confirmationAction) {
                            Button(action: saveEvent) {
                                LoadingLabel(title: isSavingEvent ? "Saving" : "Save", isLoading: isSavingEvent)
                            }
                            .disabled(!canSaveEvent)
                        }
                    }
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") { dismiss() }
                        .disabled(isSavingEvent)
                }
            }
        }
    }

    private var canSaveEvent: Bool {
        (!eventDraft.symptoms.isEmpty || eventDraft.stoolType != nil) && !isSavingEvent
    }

    private func toggleEventEditing() {
        guard !isSavingEvent else { return }
        message = nil
        if isEditingEvent, let event = entry.event {
            eventDraft = GIEventDraft(event: event)
        }
        isEditingEvent.toggle()
    }

    private func saveEvent() {
        guard let event = entry.event, canSaveEvent else {
            message = .error("Choose a symptom or stool type.")
            return
        }

        Task {
            isSavingEvent = true
            defer { isSavingEvent = false }

            do {
                try await service.updateEvent(
                    uid: event.uid,
                    id: event.id,
                    occurredAt: eventDraft.occurredAt,
                    severity: eventDraft.severity,
                    symptoms: eventDraft.symptoms,
                    notes: eventDraft.trimmedNotes,
                    stoolType: eventDraft.stoolType,
                    durationMinutes: eventDraft.durationMinutes
                )
                let updatedEvent = GIEvent(
                    id: event.id,
                    uid: event.uid,
                    occurredAt: eventDraft.occurredAt,
                    severity: eventDraft.severity,
                    symptoms: eventDraft.symptoms,
                    notes: eventDraft.trimmedNotes,
                    stoolType: eventDraft.stoolType,
                    durationMinutes: eventDraft.durationMinutes,
                    createdAt: event.createdAt
                )
                entry = .event(updatedEvent)
                eventDraft = GIEventDraft(event: updatedEvent)
                message = .success("Event saved.")
                isEditingEvent = false
            } catch {
                message = .error("Event could not be saved.")
            }
        }
    }
}

private struct EntryDetailHeader: View {
    let entry: RecentEntry

    var body: some View {
        HStack(alignment: .top, spacing: 14) {
            Image(systemName: entry.kind == .meal ? "fork.knife" : "waveform.path.ecg")
                .font(.title3.weight(.semibold))
                .foregroundStyle(entry.kind == .meal ? MealSignalDesign.brand : .orange)
                .frame(width: 44, height: 44)
                .background(.secondary.opacity(0.12), in: Circle())

            VStack(alignment: .leading, spacing: 4) {
                Text(entry.title)
                    .font(.title3.weight(.semibold))
                Text(entry.date.formatted(date: .abbreviated, time: .shortened))
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                Text(entry.kind == .meal ? "Meal" : "GI event")
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(.secondary)
                    .textCase(.uppercase)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }
}

private struct GIEventDetailContent: View {
    let event: GIEvent

    var body: some View {
        VStack(spacing: 12) {
            DetailMetricGrid(items: [
                DetailMetric(title: "Severity", value: "\(event.severity)/10", icon: "gauge.with.dots.needle.bottom.100percent"),
                DetailMetric(title: "Duration", value: durationText, icon: "timer"),
                DetailMetric(title: "Stool type", value: stoolTypeText, icon: "circle.grid.cross"),
            ])

            DetailSection(title: "Symptoms", systemImage: "list.bullet.clipboard") {
                if event.symptoms.isEmpty {
                    EmptyDetailText("No symptoms recorded")
                } else {
                    FlowLayout(spacing: 8) {
                        ForEach(event.symptoms, id: \.self) { symptom in
                            Text(symptom.capitalized)
                                .font(.subheadline.weight(.medium))
                                .padding(.horizontal, 10)
                                .padding(.vertical, 6)
                                .background(.secondary.opacity(0.12), in: Capsule())
                        }
                    }
                }
            }

            DetailSection(title: "Notes", systemImage: "note.text") {
                if let notes = event.notes, !notes.isBlank {
                    Text(notes).font(.body)
                } else {
                    EmptyDetailText("No notes recorded")
                }
            }

            DetailSection(title: "Record", systemImage: "calendar.badge.clock") {
                DetailField(label: "Occurred", value: event.occurredAt.formatted(date: .abbreviated, time: .shortened))
                DetailField(label: "Created", value: event.createdAt.formatted(date: .abbreviated, time: .shortened))
            }
        }
    }

    private var durationText: String {
        guard let duration = event.durationMinutes else { return "Not set" }
        return "\(duration) min"
    }

    private var stoolTypeText: String {
        guard let stoolType = event.stoolType else { return "Not set" }
        let label = stoolTypeLabels[stoolType] ?? "Type \(stoolType)"
        return "\(stoolType) - \(label)"
    }
}

private struct MealDetailContent: View {
    let meal: Meal

    var body: some View {
        VStack(spacing: 12) {
            DetailSection(title: "Description", systemImage: "text.alignleft") {
                Text(meal.interpretedText.isBlank ? meal.rawInput : meal.interpretedText)
                    .font(.body)
            }

            DetailSection(title: "Foods", systemImage: "fork.knife.circle") {
                if meal.analysis.foods.isEmpty {
                    EmptyDetailText("No foods identified")
                } else {
                    FlowLayout(spacing: 8) {
                        ForEach(meal.analysis.foods, id: \.self) { food in
                            Text(food.capitalized)
                                .font(.subheadline.weight(.medium))
                                .padding(.horizontal, 10)
                                .padding(.vertical, 6)
                                .background(.secondary.opacity(0.12), in: Capsule())
                        }
                    }
                }
            }

            DetailSection(title: "Analysis", systemImage: "chart.line.uptrend.xyaxis") {
                if !meal.analysis.summary.isBlank {
                    Text(meal.analysis.summary).font(.body)
                }
                ForEach(meal.analysis.irritants) { irritant in
                    VStack(alignment: .leading, spacing: 4) {
                        Text(irritant.name.capitalized).font(.subheadline.weight(.semibold))
                        Text(irritant.evidence).font(.footnote).foregroundStyle(.secondary)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.top, 4)
                }
            }

            DetailSection(title: "Record", systemImage: "calendar.badge.clock") {
                DetailField(label: "Input", value: meal.inputMode.rawValue.capitalized)
                DetailField(label: "Status", value: meal.status.replacingOccurrences(of: "_", with: " ").capitalized)
                DetailField(label: "Eaten", value: meal.eatenAt.formatted(date: .abbreviated, time: .shortened))
                DetailField(label: "Updated", value: meal.updatedAt.formatted(date: .abbreviated, time: .shortened))
                if let reanalyzedAt = meal.reanalyzedAt {
                    DetailField(label: "Reanalyzed", value: reanalyzedAt.formatted(date: .abbreviated, time: .shortened))
                }
            }
        }
    }
}

private struct DetailMetric: Identifiable {
    var id: String { title }
    let title: String
    let value: String
    let icon: String
}

private struct DetailMetricGrid: View {
    let items: [DetailMetric]

    var body: some View {
        LazyVGrid(columns: [GridItem(.adaptive(minimum: 96), spacing: 10)], spacing: 10) {
            ForEach(items) { item in
                VStack(alignment: .leading, spacing: 8) {
                    Image(systemName: item.icon)
                        .foregroundStyle(MealSignalDesign.brand)
                    Text(item.value)
                        .font(.subheadline.weight(.semibold))
                        .lineLimit(2)
                        .minimumScaleFactor(0.85)
                    Text(item.title)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                .frame(maxWidth: .infinity, minHeight: 86, alignment: .topLeading)
                .padding(12)
                .background(MealSignalDesign.surface, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
            }
        }
    }
}

private struct DetailSection<Content: View>: View {
    let title: String
    let systemImage: String
    let content: Content

    init(title: String, systemImage: String, @ViewBuilder content: () -> Content) {
        self.title = title
        self.systemImage = systemImage
        self.content = content()
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Label(title, systemImage: systemImage)
                .font(.headline)
            content
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding(14)
        .background(MealSignalDesign.surface, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
    }
}

private struct DetailField: View {
    let label: String
    let value: String

    var body: some View {
        HStack(alignment: .firstTextBaseline) {
            Text(label)
                .font(.subheadline)
                .foregroundStyle(.secondary)
            Spacer(minLength: 16)
            Text(value)
                .font(.subheadline.weight(.medium))
                .multilineTextAlignment(.trailing)
        }
    }
}

private struct EmptyDetailText: View {
    let text: String

    init(_ text: String) {
        self.text = text
    }

    var body: some View {
        Text(text)
            .font(.subheadline)
            .foregroundStyle(.secondary)
    }
}

#Preview("GI Event") {
    EntryDetailSheet(entry: RecentEntry.event(PreviewFixtures.event))
}

#Preview("Meal") {
    EntryDetailSheet(entry: RecentEntry.meal(PreviewFixtures.meal))
}
