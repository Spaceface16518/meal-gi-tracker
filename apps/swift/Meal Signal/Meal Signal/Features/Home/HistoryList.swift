import SwiftUI

struct HistoryList: View {
    let entries: [RecentEntry]
    let isLoading: Bool
    let deletingEntryID: String?
    @Binding var deleteConfirmation: RecentEntry?
    @Binding var selectedEntry: RecentEntry?

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Label("Recent", systemImage: "calendar.badge.clock")
                .font(.headline)
                .padding(.horizontal, 4)

            Group {
                if isLoading {
                    LoadingStateView(title: "Loading history")
                } else if entries.isEmpty {
                    ContentUnavailableView("No entries yet", systemImage: "calendar")
                        .padding(.vertical, 8)
                } else {
                    LazyVStack(spacing: 0) {
                        ForEach(entries) { entry in
                            RecentEntryRow(
                                entry: entry,
                                isDeleting: deletingEntryID == entry.id,
                                deleteConfirmation: $deleteConfirmation,
                                openDetails: { selectedEntry = entry }
                            )
                            if entry.id != entries.last?.id {
                                Divider().padding(.leading, 44)
                            }
                        }
                    }
                }
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 6)
            .background(MealSignalDesign.surface, in: RoundedRectangle(cornerRadius: 14, style: .continuous))
        }
    }
}

#Preview("Entries") {
    @Previewable @State var deleteConfirmation: RecentEntry?
    @Previewable @State var selectedEntry: RecentEntry?

    HistoryList(
        entries: PreviewFixtures.recentEntries,
        isLoading: false,
        deletingEntryID: nil,
        deleteConfirmation: $deleteConfirmation,
        selectedEntry: $selectedEntry
    )
    .padding()
    .background(MealSignalDesign.background)
}

#Preview("Empty") {
    @Previewable @State var deleteConfirmation: RecentEntry?
    @Previewable @State var selectedEntry: RecentEntry?

    HistoryList(
        entries: [],
        isLoading: false,
        deletingEntryID: nil,
        deleteConfirmation: $deleteConfirmation,
        selectedEntry: $selectedEntry
    )
        .padding()
        .background(MealSignalDesign.background)
}

#Preview("Loading") {
    @Previewable @State var deleteConfirmation: RecentEntry?
    @Previewable @State var selectedEntry: RecentEntry?

    HistoryList(
        entries: [],
        isLoading: true,
        deletingEntryID: nil,
        deleteConfirmation: $deleteConfirmation,
        selectedEntry: $selectedEntry
    )
        .padding()
        .background(MealSignalDesign.background)
}
