import SwiftUI

struct ToolbarActionButton: View {
    let title: String
    let systemImage: String
    var isLoading = false
    let action: () -> Void

    var body: some View {
        Button(action: performAction) {
            if isLoading {
                ProgressView()
                    .controlSize(.small)
            } else {
                Image(systemName: systemImage)
            }
        }
        .accessibilityLabel(title)
    }

    private func performAction() {
        Haptics.impact()
        action()
    }
}
