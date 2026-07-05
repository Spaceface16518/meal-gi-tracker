import Foundation

enum PreviewFixtures {
    private static let referenceDate = ISO8601DateFormatter().date(from: "2026-07-04T18:00:00Z")!

    private static func hoursAgo(_ hours: Double) -> Date {
        referenceDate.addingTimeInterval(-hours * 3600)
    }

    static let meal = Meal(
        id: "meal-turkey-sandwich",
        uid: "preview-user",
        inputMode: .text,
        rawInput: "Turkey sandwich, kettle chips, and an iced coffee with oat milk",
        interpretedText: "Turkey sandwich on sourdough with kettle chips and an iced oat milk coffee",
        eatenAt: hoursAgo(1),
        notes: "Lunch at my desk. Coffee was a large cold brew.",
        status: "complete",
        analysis: MealAnalysis(
            mealName: "Turkey Sandwich & Iced Coffee",
            foods: ["turkey", "sourdough bread", "kettle chips", "coffee", "oat milk"],
            irritants: [
                IrritantSignal(
                    name: "coffee",
                    category: "caffeine",
                    confidence: 0.72,
                    evidence: "Caffeine may increase reflux symptoms for some people."
                ),
                IrritantSignal(
                    name: "kettle chips",
                    category: "high fat",
                    confidence: 0.58,
                    evidence: "Higher-fat foods may slow digestion."
                ),
            ],
            summary: "A balanced lunch with possible caffeine and high-fat signals."
        ),
        createdAt: hoursAgo(1),
        updatedAt: hoursAgo(0.9),
        reanalyzedAt: nil
    )

    static let breakfast = Meal(
        id: "meal-breakfast",
        uid: "preview-user",
        inputMode: .image,
        rawInput: "breakfast-photo.jpg",
        interpretedText: "Greek yogurt bowl with blueberries, banana, granola, chia seeds, and honey",
        eatenAt: hoursAgo(6.5),
        notes: "Used lactose-free yogurt.",
        status: "complete",
        analysis: MealAnalysis(
            mealName: "Berry Yogurt Bowl",
            foods: ["Greek yogurt", "blueberries", "banana", "granola", "chia seeds", "honey"],
            irritants: [],
            summary: "No common irritants were identified in this meal."
        ),
        createdAt: hoursAgo(6.4),
        updatedAt: hoursAgo(6.3),
        reanalyzedAt: hoursAgo(2)
    )

    static let dinner = Meal(
        id: "meal-dinner",
        uid: "preview-user",
        inputMode: .voice,
        rawInput: "Spicy chicken curry with garlic naan and sparkling water",
        interpretedText: "Chicken curry with tomato, onion, garlic, chili, basmati rice, and garlic naan",
        eatenAt: hoursAgo(23),
        notes: nil,
        status: "needs_review",
        analysis: MealAnalysis(
            mealName: "Spicy Chicken Curry",
            foods: ["chicken", "tomato", "onion", "garlic", "chili", "rice", "naan"],
            irritants: [
                IrritantSignal(name: "chili", category: "spicy food", confidence: 0.84, evidence: "Spicy meals often precede reflux logs."),
                IrritantSignal(name: "garlic", category: "fructan", confidence: 0.67, evidence: "Garlic is a concentrated fructan source."),
                IrritantSignal(name: "onion", category: "fructan", confidence: 0.63, evidence: "Onion is a common fermentable carbohydrate source."),
            ],
            summary: "Several ingredients may be worth comparing with later symptoms."
        ),
        createdAt: hoursAgo(22.9),
        updatedAt: hoursAgo(22.8),
        reanalyzedAt: nil
    )

    static let event = GIEvent(
        id: "event-reflux",
        uid: "preview-user",
        occurredAt: hoursAgo(0.25),
        severity: 6,
        symptoms: ["reflux", "bloating", "nausea"],
        notes: "Started after lunch and eased after drinking water.",
        stoolType: 4,
        durationMinutes: 35,
        createdAt: hoursAgo(0.2)
    )

    static let mildEvent = GIEvent(
        id: "event-cramping",
        uid: "preview-user",
        occurredAt: hoursAgo(8),
        severity: 3,
        symptoms: ["cramping", "gas"],
        notes: "Brief symptoms before breakfast.",
        stoolType: nil,
        durationMinutes: 15,
        createdAt: hoursAgo(7.9)
    )

    static let skinEntry = SkinEntry(
        id: "daily-2026-07-04",
        uid: "preview-user",
        entryType: .daily,
        severity: nil,
        symptoms: [],
        bodyAreas: [],
        conditions: [
            SkinConditionAssessment(condition: "eczema", severity: 3, bodyAreas: ["hands", "arms"]),
            SkinConditionAssessment(condition: "dryness", severity: 5, bodyAreas: ["face"]),
        ],
        notes: "Less redness than yesterday; dryness remains around cheeks.",
        durationMinutes: nil,
        localDate: "2026-07-04",
        occurredAt: nil,
        sortAt: hoursAgo(0.5),
        createdAt: hoursAgo(0.5),
        updatedAt: hoursAgo(0.5)
    )

    static let skinObservation = SkinEntry(
        id: "skin-observation-1",
        uid: "preview-user",
        entryType: .timed,
        severity: 7,
        symptoms: ["itching", "redness", "raised bumps"],
        bodyAreas: ["neck", "chest"],
        conditions: [],
        notes: "Flared shortly after exercising outdoors.",
        durationMinutes: 50,
        localDate: nil,
        occurredAt: hoursAgo(26),
        sortAt: hoursAgo(26),
        createdAt: hoursAgo(25.9),
        updatedAt: hoursAgo(25.9)
    )

    static let recentEntries = [
        RecentEntry.event(event),
        RecentEntry.meal(meal),
        RecentEntry.skin(skinEntry),
        RecentEntry.meal(breakfast),
        RecentEntry.event(mildEvent),
        RecentEntry.meal(dinner),
        RecentEntry.skin(skinObservation),
    ]

    static let analysis = CorrelationAnalysis(
        id: "current",
        uid: "preview-user",
        status: "complete",
        generatedAt: hoursAgo(0.5),
        mealCount: 42,
        eventCount: 16,
        summary: "Coffee, spicy meals, and meals containing onion or garlic show the strongest relationship with symptoms in the available data.",
        findings: [
            CorrelationFinding(
                irritant: "Coffee and caffeine",
                confidence: 0.82,
                direction: "possible_trigger",
                windowHours: 6,
                evidence: "Five reflux events occurred within six hours of meals containing coffee.",
                suggestedAction: "Try logging decaf and regular coffee separately for the next week."
            ),
            CorrelationFinding(
                irritant: "Spicy food",
                confidence: 0.69,
                direction: "possible_trigger",
                windowHours: 8,
                evidence: "Higher-severity events followed three of the last four meals containing chili.",
                suggestedAction: "Compare mild and spicy versions of otherwise similar meals."
            ),
            CorrelationFinding(
                irritant: "Onion and garlic",
                confidence: 0.57,
                direction: "possible_trigger",
                windowHours: 12,
                evidence: "Bloating was logged after several meals containing concentrated fructans.",
                suggestedAction: "Continue logging portion size before drawing a conclusion."
            ),
        ],
        dataQualityNotes: [
            "Only 16 GI events are available, so moderate-confidence findings may change.",
            "Several meals do not include portion sizes.",
        ]
    )
}
