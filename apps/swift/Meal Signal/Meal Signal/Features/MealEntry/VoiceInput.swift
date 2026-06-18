import SwiftUI

struct VoiceInput: View {
    let isRecording: Bool
    let hasAudio: Bool
    let toggleRecording: () -> Void

    var body: some View {
        VStack(spacing: 12) {
            Button(action: toggleRecording) {
                Label(buttonTitle, systemImage: isRecording ? "stop.circle.fill" : "mic.circle.fill")
                    .frame(maxWidth: .infinity, minHeight: 44)
            }
            .buttonStyle(.borderedProminent)
            .tint(isRecording ? .red : MealSignalDesign.brand)

            MediaReadyRow(isReady: hasAudio, label: "Audio ready")
        }
        .padding(.vertical, 4)
    }

    private var buttonTitle: String {
        if isRecording { return "Stop recording" }
        return hasAudio ? "Record again" : "Record"
    }
}

#Preview {
    VoiceInput(isRecording: false, hasAudio: true, toggleRecording: {})
        .padding()
}
