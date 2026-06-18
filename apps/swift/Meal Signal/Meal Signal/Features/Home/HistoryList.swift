import SwiftUI

struct HistoryList: View {
    let entries: [RecentEntry]
    let isLoading: Bool
    let deletingEntryID: String?
    @Binding var deleteConfirmation: RecentEntry?

    var body: some View {
        Panel {
            VStack(alignment: .leading, spacing: 12) {
                Label("Recent", systemImage: "calendar.badge.clock").font(.headline)
                if isLoading {
                    LoadingStateView(title: "Loading history")
                } else if entries.isEmpty {
                    ContentUnavailableView("No entries yet", systemImage: "calendar")
                } else {
                    ForEach(entries) { entry in
                        RecentEntryRow(
                            entry: entry,
                            isDeleting: deletingEntryID == entry.id,
                            deleteConfirmation: $deleteConfirmation
                        )
                    }
                }
            }
        }
    }
}

#Preview("Entries") {
    @Previewable @State var deleteConfirmation: RecentEntry?

    HistoryList(
        entries: PreviewFixtures.recentEntries,
        isLoading: false,
        deletingEntryID: nil,
        deleteConfirmation: $deleteConfirmation
    )
    .padding()
    .background(MealSignalDesign.background)
}

#Preview("Empty") {
    @Previewable @State var deleteConfirmation: RecentEntry?

    HistoryList(entries: [], isLoading: false, deletingEntryID: nil, deleteConfirmation: $deleteConfirmation)
        .padding()
        .background(MealSignalDesign.background)
}

#Preview("Loading") {
    @Previewable @State var deleteConfirmation: RecentEntry?

    HistoryList(entries: [], isLoading: true, deletingEntryID: nil, deleteConfirmation: $deleteConfirmation)
        .padding()
        .background(MealSignalDesign.background)
}
