import SwiftUI

struct RecentEntryRow: View {
    @Environment(\.firebaseService) private var service

    let entry: RecentEntry
    @Binding var deleteConfirmation: RecentEntry?
    @State private var isReanalyzing = false
    @State private var message: AppMessage?

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 2) {
                    Text(entry.title).font(.subheadline.weight(.semibold))
                    Text(entry.date.relativeMealSignalText).font(.caption).foregroundStyle(.secondary)
                }
                Spacer()
                if entry.kind == .meal {
                    Button("Reanalyze", systemImage: "arrow.clockwise", action: reanalyzeEntry)
                        .labelStyle(.iconOnly)
                        .disabled(isReanalyzing)
                }
                Button("Delete", systemImage: "trash", action: confirmDelete)
                    .labelStyle(.iconOnly)
            }
            Text(entry.detail).font(.footnote).foregroundStyle(.secondary).lineLimit(2)
            IrritantChips(chips: entry.chips)
            if let message {
                Text(message.text)
                    .font(.caption.weight(.medium))
                    .foregroundStyle(message.tone == .error ? .red : MealSignalDesign.brand)
            }
        }
        .padding(12)
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 10))
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

private struct IrritantChips: View {
    let chips: [String]

    var body: some View {
        if !chips.isEmpty {
            FlowLayout(spacing: 6) {
                ForEach(chips, id: \.self) { chip in
                    Text(chip)
                        .font(.caption.weight(.medium))
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(.background, in: RoundedRectangle(cornerRadius: 6))
                }
            }
        }
    }
}

#Preview {
    @Previewable @State var deleteConfirmation: RecentEntry?

    RecentEntryRow(
        entry: PreviewFixtures.recentEntries[0],
        deleteConfirmation: $deleteConfirmation
    )
    .padding()
    .background(MealSignalDesign.background)
}
