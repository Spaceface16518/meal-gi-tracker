import SwiftUI

struct HistoryList: View {
    let entries: [RecentEntry]
    @Binding var deleteConfirmation: RecentEntry?

    var body: some View {
        Panel {
            VStack(alignment: .leading, spacing: 12) {
                Label("Recent", systemImage: "calendar.badge.clock").font(.headline)
                if entries.isEmpty {
                    ContentUnavailableView("No entries yet", systemImage: "calendar")
                } else {
                    ForEach(entries) { entry in
                        RecentEntryRow(
                            entry: entry,
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
        deleteConfirmation: $deleteConfirmation
    )
    .padding()
    .background(MealSignalDesign.background)
}

#Preview("Empty") {
    @Previewable @State var deleteConfirmation: RecentEntry?

    HistoryList(entries: [], deleteConfirmation: $deleteConfirmation)
        .padding()
        .background(MealSignalDesign.background)
}
