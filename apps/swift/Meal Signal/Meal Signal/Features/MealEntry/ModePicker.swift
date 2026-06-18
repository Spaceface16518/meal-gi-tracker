import SwiftUI

struct ModePicker: View {
    @Binding var mode: InputMode

    var body: some View {
        Picker("Input mode", selection: $mode) {
            Label("Text", systemImage: "fork.knife").tag(InputMode.text)
            Label("Voice", systemImage: "mic").tag(InputMode.voice)
            Label("Image", systemImage: "camera").tag(InputMode.image)
        }
        .pickerStyle(.segmented)
    }
}

#Preview {
    @Previewable @State var mode = InputMode.text

    ModePicker(mode: $mode)
        .padding()
}
