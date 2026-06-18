import SwiftUI

struct LoadingLabel: View {
    let title: String
    var systemImage: String?
    let isLoading: Bool

    var body: some View {
        HStack(spacing: 6) {
            if isLoading || systemImage != nil {
                LoadingIcon(systemImage: systemImage, isLoading: isLoading)
            }
            Text(title)
        }
    }
}

struct LoadingIcon: View {
    let systemImage: String?
    let isLoading: Bool

    init(systemImage: String? = nil, isLoading: Bool) {
        self.systemImage = systemImage
        self.isLoading = isLoading
    }

    var body: some View {
        Group {
            if isLoading {
                ProgressView()
                    .controlSize(.small)
            } else if let systemImage {
                Image(systemName: systemImage)
            }
        }
        .frame(width: 16, height: 16)
    }
}

struct LoadingStateView: View {
    let title: String

    var body: some View {
        VStack(spacing: 10) {
            ProgressView()
            Text(title)
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 24)
    }
}

#Preview {
    VStack(spacing: 16) {
        Button {} label: {
            LoadingLabel(title: "Saving", isLoading: true)
        }
        Button {} label: {
            LoadingLabel(title: "Run", systemImage: "arrow.clockwise", isLoading: false)
        }
        LoadingStateView(title: "Loading history")
    }
    .padding()
}
