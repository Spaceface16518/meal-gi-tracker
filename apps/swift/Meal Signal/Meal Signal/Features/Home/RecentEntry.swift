import Foundation

struct RecentEntry: Identifiable, Hashable {
    enum Kind { case meal, event, skin }

    let kind: Kind
    let id: String
    let uid: String
    let date: Date
    let title: String
    let detail: String
    let chips: [String]
    let meal: Meal?
    let event: GIEvent?
    let skin: SkinEntry?

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
            event: nil,
            skin: nil
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
            event: event,
            skin: nil
        )
    }


    static func skin(_ skin: SkinEntry) -> RecentEntry {
        let activeConditions = skin.conditions.filter { $0.severity > 0 }
        let dailySeverity = activeConditions.map(\.severity).max() ?? 0
        let detail: String
        let chips: [String]
        if skin.entryType == .daily {
            detail = activeConditions.isEmpty
                ? "No active conditions"
                : activeConditions.map { "\($0.condition) \($0.severity)/10" }.joined(separator: ", ")
            chips = activeConditions.map(\.condition)
        } else {
            detail = skin.symptoms.isEmpty ? "No details recorded" : skin.symptoms.joined(separator: ", ")
            chips = skin.symptoms + skin.bodyAreas.prefix(2)
        }
        return RecentEntry(
            kind: .skin,
            id: skin.id,
            uid: skin.uid,
            date: skin.sortAt,
            title: skin.entryType == .daily ? "Skin day · \(dailySeverity)/10" : "Skin observation · \(skin.severity ?? 0)/10",
            detail: detail,
            chips: chips,
            meal: nil,
            event: nil,
            skin: skin
        )
    }
}
