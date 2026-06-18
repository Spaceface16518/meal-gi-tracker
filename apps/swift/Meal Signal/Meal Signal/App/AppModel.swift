import Observation

@MainActor
@Observable
final class AppModel {
    let service: FirebaseService
    let session: AuthSession

    init(service: FirebaseService = FirebaseService()) {
        self.service = service
        session = AuthSession(service: service)
    }
}

@MainActor
@Observable
final class TabsModel {
    let session: AuthSession
    let analysis: AnalysisModel
    let history: HomeModel

    init(uid: String, session: AuthSession) {
        self.session = session
        analysis = AnalysisModel(uid: uid, service: session.service)
        history = HomeModel(uid: uid, service: session.service)
    }
}
