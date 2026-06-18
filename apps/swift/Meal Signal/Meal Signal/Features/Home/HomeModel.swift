import FirebaseFirestore
import Foundation
import Observation

@MainActor
@Observable
final class HomeModel {
    var meals: [Meal] = []
    var events: [GIEvent] = []
    var message: AppMessage?
    var isLoading = true

    private let service: FirebaseService
    private let uid: String
    private var listeners: [ListenerRegistration] = []
    private var mealsLoaded = false
    private var eventsLoaded = false

    var entries: [RecentEntry] {
        (meals.map(RecentEntry.meal) + events.map(RecentEntry.event))
            .sorted { $0.date > $1.date }
            .prefix(12)
            .map { $0 }
    }

    init(uid: String, service: FirebaseService) {
        self.uid = uid
        self.service = service
        subscribe()
    }

    private func subscribe() {
        listeners.forEach { $0.remove() }
        listeners = [
            service.mealsQuery(uid: uid).addSnapshotListener { [weak self] snapshot, error in
                Task { @MainActor in
                    if error != nil { self?.message = .error("Meal history is temporarily unavailable.") }
                    self?.meals = snapshot?.documents.map(meal(from:)) ?? []
                    self?.mealsLoaded = true
                    self?.refreshLoadingState()
                }
            },
            service.eventsQuery(uid: uid).addSnapshotListener { [weak self] snapshot, error in
                Task { @MainActor in
                    if error != nil { self?.message = .error("Event history is temporarily unavailable.") }
                    self?.events = snapshot?.documents.map(giEvent(from:)) ?? []
                    self?.eventsLoaded = true
                    self?.refreshLoadingState()
                }
            },
        ]
    }

    private func refreshLoadingState() {
        isLoading = !(mealsLoaded && eventsLoaded)
    }
}
