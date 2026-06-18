import SwiftUI

struct RecentEntryRow: View {
    @Environment(\.firebaseService) private var service

    let entry: RecentEntry
    let isDeleting: Bool
    @Binding var deleteConfirmation: RecentEntry?
    let openDetails: () -> Void
    @State private var isReanalyzing = false
    @State private var message: AppMessage?

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack(spacing: 12) {
                Button(action: openDetails) {
                    HStack(spacing: 12) {
                        EntryIcon(kind: entry.kind)
                        EntrySummary(entry: entry)
                        Image(systemName: "chevron.right")
                            .font(.caption.weight(.semibold))
                            .foregroundStyle(.tertiary)
                    }
                    .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .frame(maxWidth: .infinity, alignment: .leading)

                RowActions(
                    kind: entry.kind,
                    isDeleting: isDeleting,
                    isReanalyzing: isReanalyzing,
                    reanalyze: reanalyzeEntry,
                    delete: confirmDelete
                )
            }

            if let message {
                Text(message.text)
                    .font(.caption.weight(.medium))
                    .foregroundStyle(message.tone == .error ? .red : MealSignalDesign.brand)
                    .padding(.leading, 44)
            }
        }
        .padding(.vertical, 10)
    }

    private func confirmDelete() {
        deleteConfirmation = entry
    }

    private func reanalyzeEntry() {
        Task {
            isReanalyzing = true
            defer { isReanalyzing = false }
            do {
                try await service.reanalyzeMeal(id: entry.id)
                message = .success("Meal analysis refreshed.")
            } catch {
                message = .error("Meal analysis could not be refreshed.")
            }
        }
    }
}

private struct EntrySummary: View {
    let entry: RecentEntry

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack(spacing: 8) {
                Text(entry.title)
                    .font(.subheadline.weight(.semibold))
                    .lineLimit(1)
                Text(entry.date.relativeMealSignalText)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            Text(entry.detail)
                .font(.footnote)
                .foregroundStyle(.secondary)
                .lineLimit(2)

            EntryChips(chips: entry.chips)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }
}

private struct EntryIcon: View {
    let kind: RecentEntry.Kind

    var body: some View {
        Image(systemName: kind == .meal ? "fork.knife" : "waveform.path.ecg")
            .font(.system(size: 15, weight: .semibold))
            .foregroundStyle(kind == .meal ? MealSignalDesign.brand : .orange)
            .frame(width: 32, height: 32)
            .background(.secondary.opacity(0.12), in: Circle())
    }
}

private struct RowActions: View {
    let kind: RecentEntry.Kind
    let isDeleting: Bool
    let isReanalyzing: Bool
    let reanalyze: () -> Void
    let delete: () -> Void

    var body: some View {
        HStack(spacing: 8) {
            if kind == .meal {
                Button(action: reanalyze) {
                    LoadingIcon(systemImage: "arrow.clockwise", isLoading: isReanalyzing)
                }
                .accessibilityLabel(isReanalyzing ? "Reanalyzing meal" : "Reanalyze meal")
                .disabled(isReanalyzing)
                .buttonStyle(.borderless)
            }

            Button(action: delete) {
                LoadingIcon(systemImage: "trash", isLoading: isDeleting)
            }
            .accessibilityLabel(isDeleting ? "Deleting entry" : "Delete entry")
            .disabled(isDeleting)
            .buttonStyle(.borderless)
        }
        .foregroundStyle(.secondary)
    }
}

private struct EntryChips: View {
    let chips: [String]

    var body: some View {
        if !chips.isEmpty {
            FlowLayout(spacing: 6) {
                ForEach(chips, id: \.self) { chip in
                    Text(chip)
                        .font(.caption.weight(.medium))
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(.secondary.opacity(0.10), in: Capsule())
                }
            }
        }
    }
}

#Preview {
    @Previewable @State var deleteConfirmation: RecentEntry?

    RecentEntryRow(
        entry: PreviewFixtures.recentEntries[0],
        isDeleting: false,
        deleteConfirmation: $deleteConfirmation,
        openDetails: {}
    )
    .padding()
    .background(MealSignalDesign.background)
}
