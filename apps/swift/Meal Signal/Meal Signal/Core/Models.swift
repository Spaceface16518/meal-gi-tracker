import Foundation
import FirebaseFirestore

enum InputMode: String, CaseIterable, Identifiable {
    case text, voice, image
    var id: String { rawValue }
}

struct IrritantSignal: Identifiable, Hashable {
    var id: String { "\(name)-\(category)-\(evidence)" }
    let name: String
    let category: String
    let confidence: Double
    let evidence: String
}

struct MealAnalysis: Hashable {
    let mealName: String
    let foods: [String]
    let irritants: [IrritantSignal]
    let summary: String

    static let placeholder = MealAnalysis(mealName: "Meal", foods: [], irritants: [], summary: "")
}

struct Meal: Identifiable, Hashable {
    let id: String
    let uid: String
    let inputMode: InputMode
    let rawInput: String
    let interpretedText: String
    let eatenAt: Date
    let notes: String?
    let status: String
    let analysis: MealAnalysis
    let createdAt: Date
    let updatedAt: Date
    let reanalyzedAt: Date?
}

struct GIEvent: Identifiable, Hashable {
    let id: String
    let uid: String
    let occurredAt: Date
    let severity: Int
    let symptoms: [String]
    let notes: String?
    let stoolType: Int?
    let durationMinutes: Int?
    let createdAt: Date
}

struct CorrelationFinding: Identifiable, Hashable {
    var id: String { "\(irritant)-\(windowHours)-\(direction)" }
    let irritant: String
    let confidence: Double
    let direction: String
    let windowHours: Int
    let evidence: String
    let suggestedAction: String
}

struct CorrelationAnalysis: Identifiable, Hashable {
    let id: String
    let uid: String
    let status: String
    let generatedAt: Date
    let mealCount: Int
    let eventCount: Int
    let summary: String
    let findings: [CorrelationFinding]
    let dataQualityNotes: [String]
}

extension QueryDocumentSnapshot {
    var mealSignalDate: Date { Date() }
}

func dateValue(_ value: Any?) -> Date {
    if let timestamp = value as? Timestamp { return timestamp.dateValue() }
    if let date = value as? Date { return date }
    if let string = value as? String, let date = ISO8601DateFormatter().date(from: string) { return date }
    return Date()
}

func stringArray(_ value: Any?) -> [String] {
    value as? [String] ?? []
}

func intValue(_ value: Any?, default fallback: Int = 0) -> Int {
    if let value = value as? Int { return value }
    if let value = value as? Double { return Int(value) }
    return fallback
}

func doubleValue(_ value: Any?, default fallback: Double = 0) -> Double {
    if let value = value as? Double { return value }
    if let value = value as? Int { return Double(value) }
    return fallback
}

func meal(from document: QueryDocumentSnapshot) -> Meal {
    let data = document.data()
    let analysisData = data["analysis"] as? [String: Any] ?? [:]
    let irritants = (analysisData["irritants"] as? [[String: Any]] ?? []).map {
        IrritantSignal(
            name: $0["name"] as? String ?? "Irritant",
            category: $0["category"] as? String ?? "other",
            confidence: doubleValue($0["confidence"]),
            evidence: $0["evidence"] as? String ?? ""
        )
    }

    return Meal(
        id: document.documentID,
        uid: data["uid"] as? String ?? "",
        inputMode: InputMode(rawValue: data["inputMode"] as? String ?? "") ?? .text,
        rawInput: data["rawInput"] as? String ?? "",
        interpretedText: data["interpretedText"] as? String ?? "",
        eatenAt: dateValue(data["eatenAt"]),
        notes: data["notes"] as? String,
        status: data["status"] as? String ?? "needs_review",
        analysis: MealAnalysis(
            mealName: analysisData["mealName"] as? String ?? "Meal",
            foods: stringArray(analysisData["foods"]),
            irritants: irritants,
            summary: analysisData["summary"] as? String ?? ""
        ),
        createdAt: dateValue(data["createdAt"]),
        updatedAt: dateValue(data["updatedAt"]),
        reanalyzedAt: data["reanalyzedAt"].map(dateValue)
    )
}

func giEvent(from document: QueryDocumentSnapshot) -> GIEvent {
    let data = document.data()
    return GIEvent(
        id: document.documentID,
        uid: data["uid"] as? String ?? "",
        occurredAt: dateValue(data["occurredAt"]),
        severity: intValue(data["severity"], default: 1),
        symptoms: stringArray(data["symptoms"]),
        notes: data["notes"] as? String,
        stoolType: (data["stoolType"] as? NSNumber)?.intValue,
        durationMinutes: (data["durationMinutes"] as? NSNumber)?.intValue,
        createdAt: dateValue(data["createdAt"])
    )
}

func correlationAnalysis(from document: DocumentSnapshot) -> CorrelationAnalysis? {
    guard let data = document.data() else { return nil }
    let findings = (data["findings"] as? [[String: Any]] ?? []).map {
        CorrelationFinding(
            irritant: $0["irritant"] as? String ?? "Irritant",
            confidence: doubleValue($0["confidence"]),
            direction: $0["direction"] as? String ?? "insufficient_data",
            windowHours: intValue($0["windowHours"], default: 120),
            evidence: $0["evidence"] as? String ?? "",
            suggestedAction: $0["suggestedAction"] as? String ?? ""
        )
    }

    return CorrelationAnalysis(
        id: document.documentID,
        uid: data["uid"] as? String ?? "",
        status: data["status"] as? String ?? "insufficient_data",
        generatedAt: dateValue(data["generatedAt"]),
        mealCount: intValue(data["mealCount"]),
        eventCount: intValue(data["eventCount"]),
        summary: data["summary"] as? String ?? "No analysis has been generated yet.",
        findings: findings,
        dataQualityNotes: stringArray(data["dataQualityNotes"])
    )
}
