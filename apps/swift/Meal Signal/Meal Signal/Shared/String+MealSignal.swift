import Foundation

extension String {
    var nilIfEmpty: String? { isEmpty ? nil : self }
    var isBlank: Bool { trimmingCharacters(in: .whitespacesAndNewlines).isEmpty }
}
