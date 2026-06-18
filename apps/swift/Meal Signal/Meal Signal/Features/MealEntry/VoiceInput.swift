import SwiftUI

struct VoiceInput: View {
    let isRecording: Bool
    let hasAudio: Bool
    let hasTranscript: Bool
    let toggleRecording: () -> Void

    var body: some View {
        VStack(spacing: 12) {
            Button(action: toggleRecording) {
                Label(buttonTitle, systemImage: isRecording ? "stop.circle.fill" : "mic.circle.fill")
                    .frame(maxWidth: .infinity, minHeight: 44)
                    .tint(.primary)
            }
            .buttonStyle(.borderedProminent)
            .tint(isRecording ? .red : MealSignalDesign.brand)

            MediaReadyRow(isReady: hasAudio || hasTranscript, label: hasTranscript ? "Transcript ready" : "Audio ready")
        }
        .padding(.vertical, 4)
    }

    private var buttonTitle: String {
        if isRecording { return "Stop recording" }
        return hasAudio ? "Record again" : "Record"
    }
}

#Preview {
    @Previewable @State var recording = false;
    
    VoiceInput(isRecording: recording, hasAudio: false, hasTranscript: true, toggleRecording: {recording = !recording})
        .padding()
}
