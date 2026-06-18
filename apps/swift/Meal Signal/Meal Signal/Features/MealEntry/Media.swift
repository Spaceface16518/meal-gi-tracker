import Foundation

struct Media {
    static let maxBytes = 5 * 1024 * 1024

    let data: Data
    let mimeType: String
}

struct RecordedMedia {
    let media: Media
    let fileURL: URL

    func removeTemporaryFile() {
        try? FileManager.default.removeItem(at: fileURL)
    }
}

enum MediaError: LocalizedError {
    case fileTooLarge
    case recordingUnavailable

    var errorDescription: String? {
        switch self {
        case .fileTooLarge:
            "Use media smaller than 5 MB."
        case .recordingUnavailable:
            "Audio recording is not available."
        }
    }
}
