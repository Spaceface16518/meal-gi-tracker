import SwiftUI

struct HomeContent: View {
    let message: AppMessage?
    let mealCount: Int
    let eventCount: Int
    let isLoading: Bool
    let entries: [RecentEntry]
    let deletingEntryID: String?
    @Binding var addSheet: AddSheet?
    @Binding var deleteConfirmation: RecentEntry?
    @Binding var selectedEntry: RecentEntry?

    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                if let message {
                    StatusBanner(message: message)
                }

                AddShortcuts(
                    mealCount: mealCount,
                    eventCount: eventCount,
                    addSheet: $addSheet
                )
                HistoryList(
                    entries: entries,
                    isLoading: isLoading,
                    deletingEntryID: deletingEntryID,
                    deleteConfirmation: $deleteConfirmation,
                    selectedEntry: $selectedEntry
                )
            }
            .padding()
        }
        .background(MealSignalDesign.background.ignoresSafeArea())
    }
}

#Preview {
    @Previewable @State var addSheet: AddSheet?
    @Previewable @State var deleteConfirmation: RecentEntry?
    @Previewable @State var selectedEntry: RecentEntry?

    NavigationStack {
        HomeContent(
            message: .success("Meal saved."),
            mealCount: 8,
            eventCount: 3,
            isLoading: false,
            entries: PreviewFixtures.recentEntries,
            deletingEntryID: nil,
            addSheet: $addSheet,
            deleteConfirmation: $deleteConfirmation,
            selectedEntry: $selectedEntry
        )
        .navigationTitle("Meal Signal")
    }
}
