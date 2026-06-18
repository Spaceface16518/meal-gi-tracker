import SwiftUI

struct TextInput: View {
    @Binding var text: String

    var body: some View {
        TextEditor(text: $text)
            .frame(minHeight: 140)
            .overlay(alignment: .topLeading) {
                if text.isEmpty {
                    Text("Turkey sandwich, chips, iced coffee")
                        .foregroundStyle(.tertiary)
                        .padding(.top, 8)
                        .allowsHitTesting(false)
                }
            }
    }
}

#Preview {
    @Previewable @State var text = ""

    TextInput(text: $text)
        .padding()
}
