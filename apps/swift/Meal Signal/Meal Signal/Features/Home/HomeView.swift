import SwiftUI

struct HomeView: View {
    @Environment(\.firebaseService) private var service

    let history: HomeModel
    let session: AuthSession

    @State private var deleteConfirmation: RecentEntry?
    @State private var deletingEntryID: String?
    @State private var addSheet: AddSheet?
    @State private var selectedEntry: RecentEntry?
    @State private var actionMessage: AppMessage?

    var body: some View {
        NavigationStack {
            HomeContent(
                message: actionMessage ?? history.message,
                mealCount: history.meals.count,
                eventCount: history.events.count,
                isLoading: history.isLoading,
                entries: history.entries,
                deletingEntryID: deletingEntryID,
                addSheet: $addSheet,
                deleteConfirmation: $deleteConfirmation,
                selectedEntry: $selectedEntry
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
        .sheet(item: $selectedEntry) { entry in
            EntryDetailSheet(entry: entry)
        }
        .alert("Delete this entry?", isPresented: deleteAlertBinding) {
            Button("Cancel", role: .cancel) {
                deleteConfirmation = nil
            }
            Button(deletingEntryID == nil ? "Delete" : "Deleting", role: .destructive, action: deleteEntry)
                .disabled(deletingEntryID != nil)
        } message: {
            Text("This cannot be undone.")
        }
    }

    private var deleteAlertBinding: Binding<Bool> {
        Binding(
            get: { deleteConfirmation != nil },
            set: { if !$0 && deletingEntryID == nil { deleteConfirmation = nil } }
        )
    }

    private func deleteEntry() {
        guard let entry = deleteConfirmation, deletingEntryID == nil else { return }
        Task {
            deletingEntryID = entry.id
            defer {
                deletingEntryID = nil
                deleteConfirmation = nil
            }
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
