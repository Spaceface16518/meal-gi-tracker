import Observation
import SwiftUI

@MainActor
@Observable
final class Haptics {
    private(set) var event = Event()

    func selection() {
        play(.selection)
    }

    func impact(_ weight: SensoryFeedback.Weight = .light) {
        play(weight == .medium ? .mediumImpact : .lightImpact)
    }

    func success() {
        play(.success)
    }

    func error() {
        play(.error)
    }

    func warning() {
        play(.warning)
    }

    private func play(_ kind: Kind) {
        event = Event(sequence: event.sequence + 1, kind: kind)
    }

    struct Event: Equatable {
        var sequence = 0
        var kind: Kind?
    }

    enum Kind: Equatable {
        case selection
        case lightImpact
        case mediumImpact
        case success
        case warning
        case error

        var feedback: SensoryFeedback {
            switch self {
            case .selection: .selection
            case .lightImpact: .impact(weight: .light, intensity: 1)
            case .mediumImpact: .impact(weight: .medium, intensity: 1)
            case .success: .success
            case .warning: .warning
            case .error: .error
            }
        }
    }
}
