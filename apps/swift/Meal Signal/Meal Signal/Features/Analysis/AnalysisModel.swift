import FirebaseFirestore
import Foundation
import Observation

@MainActor
@Observable
final class AnalysisModel {
    var analysis: CorrelationAnalysis?
    var mealCount = 0
    var eventCount = 0
    var message: AppMessage?
    var isLoading = true

    private let service: FirebaseService
    private let uid: String
    private var listeners: [ListenerRegistration] = []
    private var analysisLoaded = false
    private var mealsLoaded = false
    private var eventsLoaded = false

    init(uid: String, service: FirebaseService) {
        self.uid = uid
        self.service = service
        subscribe()
    }

    private func subscribe() {
        listeners.forEach { $0.remove() }
        listeners = [
            service.currentAnalysisRef(uid: uid).addSnapshotListener { [weak self] snapshot, error in
                Task { @MainActor in
                    if error != nil { self?.message = .error("Analysis updates are temporarily unavailable.") }
                    self?.analysis = snapshot.flatMap(correlationAnalysis(from:))
                    self?.analysisLoaded = true
                    self?.refreshLoadingState()
                }
            },
            service.mealsQuery(uid: uid).addSnapshotListener { [weak self] snapshot, error in
                Task { @MainActor in
                    if error != nil { self?.message = .error("Meal count is temporarily unavailable.") }
                    self?.mealCount = snapshot?.documents.count ?? 0
                    self?.mealsLoaded = true
                    self?.refreshLoadingState()
                }
            },
            service.eventsQuery(uid: uid).addSnapshotListener { [weak self] snapshot, error in
                Task { @MainActor in
                    if error != nil { self?.message = .error("Event count is temporarily unavailable.") }
                    self?.eventCount = snapshot?.documents.count ?? 0
                    self?.eventsLoaded = true
                    self?.refreshLoadingState()
                }
            },
        ]
    }

    private func refreshLoadingState() {
        isLoading = !(analysisLoaded && mealsLoaded && eventsLoaded)
    }
}
