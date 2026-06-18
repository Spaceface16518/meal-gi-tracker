import SwiftUI

struct HomeView: View {
    @Environment(\.firebaseService) private var service

    let history: HomeModel
    let session: AuthSession

    @State private var deleteConfirmation: RecentEntry?
    @State private var addSheet: AddSheet?
    @State private var actionMessage: AppMessage?

    var body: some View {
        NavigationStack {
            HomeContent(
                message: actionMessage ?? history.message,
                mealCount: history.meals.count,
                eventCount: history.events.count,
                entries: history.entries,
                addSheet: $addSheet,
                deleteConfirmation: $deleteConfirmation
            )
            .navigationTitle("Meal Signal")
            .toolbar { AccountToolbar(session: session) }
        }
        .sheet(item: $addSheet) { sheet in
            switch sheet {
            case .meal:
                MealEntryView()
            case .event:
                GIEventEntryView()
            }
        }
        .confirmationDialog(
            "Delete this entry? This cannot be undone.",
            isPresented: Binding(
                get: { deleteConfirmation != nil },
                set: { if !$0 { deleteConfirmation = nil } }
            )
        ) {
            Button("Delete", role: .destructive, action: deleteEntry)
        }
    }

    private func deleteEntry() {
        guard let entry = deleteConfirmation else { return }
        Task {
            do {
                switch entry.kind {
                case .meal:
                    try await service.deleteMeal(uid: entry.uid, id: entry.id)
                    actionMessage = .success("Meal deleted.")
                case .event:
                    try await service.deleteEvent(uid: entry.uid, id: entry.id)
                    actionMessage = .success("Event deleted.")
                }
            } catch {
                actionMessage = .error("The entry could not be deleted.")
            }
        }
    }
}
