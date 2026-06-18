import SwiftUI

private struct FirebaseServiceKey: EnvironmentKey {
    static let defaultValue = FirebaseService()
}

extension EnvironmentValues {
    var firebaseService: FirebaseService {
        get { self[FirebaseServiceKey.self] }
        set { self[FirebaseServiceKey.self] = newValue }
    }
}
