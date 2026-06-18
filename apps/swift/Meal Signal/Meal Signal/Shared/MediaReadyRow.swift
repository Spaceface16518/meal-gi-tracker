import SwiftUI

struct MediaReadyRow: View {
    let isReady: Bool
    let label: String

    var body: some View {
        Label(isReady ? label : "Waiting for media", systemImage: isReady ? "checkmark.circle.fill" : "circle")
            .font(.footnote.weight(.medium))
            .foregroundStyle(isReady ? MealSignalDesign.brand : .secondary)
            .frame(maxWidth: .infinity, alignment: .leading)
    }
}

#Preview {
    MediaReadyRow(isReady: true, label: "Image ready")
        .padding()
}
