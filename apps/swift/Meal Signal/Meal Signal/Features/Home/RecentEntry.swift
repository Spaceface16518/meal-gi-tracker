import Foundation

struct RecentEntry: Identifiable, Hashable {
    enum Kind { case meal, event }

    let kind: Kind
    let id: String
    let uid: String
    let date: Date
    let title: String
    let detail: String
    let chips: [String]
    let meal: Meal?
    let event: GIEvent?

    static func meal(_ meal: Meal) -> RecentEntry {
        RecentEntry(
            kind: .meal,
            id: meal.id,
            uid: meal.uid,
            date: meal.eatenAt,
            title: meal.analysis.mealName,
            detail: meal.interpretedText,
            chips: meal.analysis.irritants.prefix(3).map(\.name),
            meal: meal,
            event: nil
        )
    }

    static func event(_ event: GIEvent) -> RecentEntry {
        var details = event.symptoms
        if let stoolType = event.stoolType { details.append("stool type \(stoolType)") }
        return RecentEntry(
            kind: .event,
            id: event.id,
            uid: event.uid,
            date: event.occurredAt,
            title: "Severity \(event.severity)",
            detail: details.isEmpty ? "No details recorded" : details.joined(separator: ", "),
            chips: event.symptoms,
            meal: nil,
            event: event
        )
    }
}
