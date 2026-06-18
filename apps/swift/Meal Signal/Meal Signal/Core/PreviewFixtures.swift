import Foundation

enum PreviewFixtures {
    static let meal = Meal(
        id: "meal-1",
        uid: "preview-user",
        inputMode: .text,
        rawInput: "Turkey sandwich, chips, iced coffee",
        interpretedText: "Turkey sandwich with chips and iced coffee",
        eatenAt: Date().addingTimeInterval(-3600),
        notes: nil,
        status: "complete",
        analysis: MealAnalysis(
            mealName: "Turkey Sandwich",
            foods: ["turkey", "bread", "chips", "coffee"],
            irritants: [
                IrritantSignal(
                    name: "coffee",
                    category: "caffeine",
                    confidence: 0.72,
                    evidence: "Often appears before reflux symptoms."
                ),
                IrritantSignal(
                    name: "chips",
                    category: "high fat",
                    confidence: 0.58,
                    evidence: "Appears in a few high-severity windows."
                ),
            ],
            summary: "Possible caffeine and high-fat signals."
        ),
        createdAt: Date().addingTimeInterval(-3600),
        updatedAt: Date().addingTimeInterval(-3300),
        reanalyzedAt: nil
    )

    static let event = GIEvent(
        id: "event-1",
        uid: "preview-user",
        occurredAt: Date().addingTimeInterval(-900),
        severity: 6,
        symptoms: ["reflux", "bloating"],
        notes: nil,
        stoolType: 4,
        durationMinutes: 35,
        createdAt: Date().addingTimeInterval(-850)
    )

    static let recentEntries = [
        RecentEntry.meal(meal),
        RecentEntry.event(event),
    ]

    static let analysis = CorrelationAnalysis(
        id: "current",
        uid: "preview-user",
        status: "complete",
        generatedAt: Date().addingTimeInterval(-1800),
        mealCount: 14,
        eventCount: 5,
        summary: "Coffee and high-fat meals show the strongest relationship with symptoms in the available data.",
        findings: [
            CorrelationFinding(
                irritant: "coffee",
                confidence: 0.76,
                direction: "possible_trigger",
                windowHours: 6,
                evidence: "Three reflux events occurred within six hours of meals containing coffee.",
                suggestedAction: "Try logging coffee separately for the next week."
            ),
        ],
        dataQualityNotes: ["More GI event logs will improve confidence."]
    )
}
