import Foundation
import FirebaseAuth
import FirebaseCore
import FirebaseFirestore
import FirebaseFunctions

final class FirebaseService {
    let auth = Auth.auth()
    let db = Firestore.firestore()
    let functions = Functions.functions()

    var isConfigured: Bool {
        Bundle.main.path(forResource: "GoogleService-Info", ofType: "plist") != nil
    }

    func signIn(email: String, password: String) async throws {
        try await auth.signIn(withEmail: email, password: password)
    }

    func signUp(email: String, password: String) async throws {
        try await auth.createUser(withEmail: email, password: password)
    }

    func signOut() throws {
        try auth.signOut()
    }

    func ensureProfile(for user: User) async throws {
        let ref = db.collection("users").document(user.uid)
        let snapshot = try await ref.getDocument()
        let values: [String: Any] = [
            "uid": user.uid,
            "email": user.email as Any,
            "displayName": user.displayName as Any,
            "updatedAt": FieldValue.serverTimestamp(),
        ]

        if snapshot.exists {
            try await ref.updateData(values)
        } else {
            var createValues = values
            createValues["createdAt"] = FieldValue.serverTimestamp()
            try await ref.setData(createValues)
        }
    }

    func createMeal(
        mode: InputMode,
        text: String?,
        mediaBase64: String?,
        mimeType: String?,
        eatenAt: Date,
        notes: String?,
        processingSource: String? = nil,
        localProcessingWarning: String? = nil
    ) async throws {
        var payload: [String: Any] = [
            "mode": mode.rawValue,
            "eatenAt": ISO8601DateFormatter().string(from: eatenAt),
        ]
        if let text { payload["text"] = text }
        if let mediaBase64 { payload["mediaBase64"] = mediaBase64 }
        if let mimeType { payload["mimeType"] = mimeType }
        if let notes { payload["notes"] = notes }
        if let processingSource { payload["processingSource"] = processingSource }
        if let localProcessingWarning { payload["localProcessingWarning"] = localProcessingWarning }
        _ = try await functions.httpsCallable("createMeal").call(payload)
    }

    func updateMeal(
        uid: String,
        id: String,
        mealName: String,
        rawInput: String,
        interpretedText: String,
        eatenAt: Date,
        notes: String?
    ) async throws {
        var payload: [String: Any] = [
            "analysis.mealName": mealName,
            "rawInput": rawInput,
            "interpretedText": interpretedText,
            "eatenAt": eatenAt,
            "updatedAt": FieldValue.serverTimestamp(),
        ]
        if let notes {
            payload["notes"] = notes
        } else {
            payload["notes"] = FieldValue.delete()
        }

        try await db.collection("users").document(uid).collection("meals").document(id).updateData(payload)
    }

    func createEvent(
        occurredAt: Date,
        severity: Int,
        symptoms: [String],
        notes: String?,
        stoolType: Int?,
        durationMinutes: Int?
    ) async throws {
        var payload: [String: Any] = [
            "occurredAt": ISO8601DateFormatter().string(from: occurredAt),
            "severity": severity,
            "symptoms": symptoms,
        ]
        if let notes { payload["notes"] = notes }
        if let stoolType { payload["stoolType"] = stoolType }
        if let durationMinutes { payload["durationMinutes"] = durationMinutes }
        _ = try await functions.httpsCallable("createGiEvent").call(payload)
    }

    func updateEvent(
        uid: String,
        id: String,
        occurredAt: Date,
        severity: Int,
        symptoms: [String],
        notes: String?,
        stoolType: Int?,
        durationMinutes: Int?
    ) async throws {
        var payload: [String: Any] = [
            "occurredAt": occurredAt,
            "severity": severity,
            "symptoms": symptoms,
        ]
        if let notes {
            payload["notes"] = notes
        } else {
            payload["notes"] = FieldValue.delete()
        }
        if let stoolType {
            payload["stoolType"] = stoolType
        } else {
            payload["stoolType"] = FieldValue.delete()
        }
        if let durationMinutes {
            payload["durationMinutes"] = durationMinutes
        } else {
            payload["durationMinutes"] = FieldValue.delete()
        }

        try await db.collection("users").document(uid).collection("events").document(id).updateData(payload)
    }

    func analyzeCorrelations() async throws {
        _ = try await functions.httpsCallable("analyzeCorrelations").call()
    }

    func reanalyzeMeal(id: String) async throws {
        _ = try await functions.httpsCallable("reanalyzeMeal").call(["mealId": id])
    }

    func deleteMeal(uid: String, id: String) async throws {
        try await db.collection("users").document(uid).collection("meals").document(id).delete()
    }

    func deleteEvent(uid: String, id: String) async throws {
        try await db.collection("users").document(uid).collection("events").document(id).delete()
    }

    func mealsQuery(uid: String) -> Query {
        db.collection("users").document(uid).collection("meals")
            .order(by: "eatenAt", descending: true)
            .limit(to: 25)
    }

    func eventsQuery(uid: String) -> Query {
        db.collection("users").document(uid).collection("events")
            .order(by: "occurredAt", descending: true)
            .limit(to: 25)
    }

    func currentAnalysisRef(uid: String) -> DocumentReference {
        db.collection("users").document(uid).collection("analyses").document("current")
    }
}

@MainActor
@Observable
final class AuthSession {
    var user: User?
    var authReady = false
    var message: AppMessage?

    let service: FirebaseService
    private var authHandle: AuthStateDidChangeListenerHandle?

    var isConfigured: Bool { service.isConfigured }
    var userID: String? { user?.uid }
    var userEmail: String { user?.email ?? "Signed in" }

    init(service: FirebaseService) {
        self.service = service
        guard service.isConfigured else {
            authReady = true
            return
        }

        authHandle = service.auth.addStateDidChangeListener { [weak self] _, user in
            Task { @MainActor in
                self?.user = user
                self?.authReady = true
                if let user {
                    await self?.prepareProfile(for: user)
                }
            }
        }
    }

    private func prepareProfile(for user: User) async {
        do {
            try await service.ensureProfile(for: user)
        } catch {
            message = .error("Your profile could not be prepared.")
        }
    }
}

struct AppMessage: Identifiable, Equatable {
    enum Tone { case info, success, error }
    let id = UUID()
    let tone: Tone
    let text: String

    static func info(_ text: String) -> AppMessage { AppMessage(tone: .info, text: text) }
    static func success(_ text: String) -> AppMessage { AppMessage(tone: .success, text: text) }
    static func error(_ text: String) -> AppMessage { AppMessage(tone: .error, text: text) }
}
