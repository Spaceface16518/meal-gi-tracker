import SwiftUI

struct LocalInterpretationEditor: View {
    let title: String
    @Binding var text: String

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.subheadline.weight(.semibold))
                .foregroundStyle(.secondary)
            TextEditor(text: $text)
                .frame(minHeight: 96)
                .scrollContentBackground(.hidden)
                .padding(10)
                .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 8))
                .onChange(of: text) { _, value in
                    text = String(value.prefix(8000))
                }
        }
        .padding(.vertical, 4)
    }
}

#Preview {
    @Previewable @State var text = "Chicken rice bowl with salsa and avocado"

    LocalInterpretationEditor(title: "Description", text: $text)
        .padding()
}
