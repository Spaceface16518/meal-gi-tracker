import PhotosUI
import SwiftUI

struct MealEntryForm: View {
    @Binding var draft: MealDraft
    let message: AppMessage?

    @State private var selectedImage: PhotosPickerItem?
    @State private var isCameraPresented = false
    @State private var mediaMessage: AppMessage?
    @State private var audioRecorder = AudioRecorder()

    var body: some View {
        Form {
            if let message {
                Section { StatusBanner(message: message) }
            }
            if let mediaMessage {
                Section { StatusBanner(message: mediaMessage) }
            }

            Section("Meal") {
                ModePicker(mode: $draft.mode)
                    .onChange(of: draft.mode) { _, _ in
                        draft.clearMedia()
                        mediaMessage = nil
                    }

                switch draft.mode {
                case .text:
                    TextInput(text: $draft.text)
                case .voice:
                    VoiceInput(
                        isRecording: audioRecorder.isRecording,
                        hasAudio: draft.hasMedia,
                        toggleRecording: toggleRecording
                    )
                case .image:
                    ImageInput(
                        selectedImage: $selectedImage,
                        hasImage: draft.hasMedia,
                        takePhoto: { isCameraPresented = true }
                    )
                }
            }

            Section("Details") {
                DatePicker("Eaten at", selection: $draft.eatenAt)
                TextField("Notes", text: $draft.notes)
                    .onChange(of: draft.notes) { _, value in
                        draft.notes = String(value.prefix(1000))
                    }
            }
        }
        .onChange(of: selectedImage) { _, item in
            Task { await loadImage(item) }
        }
        .sheet(isPresented: $isCameraPresented) {
            CameraCapture(onCapture: loadCameraImage)
                .ignoresSafeArea()
        }
    }

    private func toggleRecording() {
        Task {
            do {
                if audioRecorder.isRecording {
                    let media = try audioRecorder.stop()
                    try setMedia(media)
                    mediaMessage = .success("Audio ready.")
                } else {
                    try await audioRecorder.start()
                    draft.clearMedia()
                    mediaMessage = .info("Recording.")
                }
            } catch {
                mediaMessage = .error(error.localizedDescription)
            }
        }
    }

    private func loadImage(_ item: PhotosPickerItem?) async {
        guard let item else { return }

        do {
            guard let data = try await item.loadTransferable(type: Data.self) else {
                mediaMessage = .error("Image could not be read.")
                return
            }

            let mimeType = item.supportedContentTypes.first?.preferredMIMEType ?? "image/jpeg"
            try setMedia(Media(data: data, mimeType: mimeType))
            mediaMessage = .success("Image ready.")
        } catch {
            mediaMessage = .error(error.localizedDescription)
        }
    }

    private func loadCameraImage(_ media: Media) {
        do {
            try setMedia(media)
            selectedImage = nil
            mediaMessage = .success("Image ready.")
        } catch {
            mediaMessage = .error(error.localizedDescription)
        }
    }

    private func setMedia(_ media: Media) throws {
        guard media.data.count <= Media.maxBytes else {
            draft.clearMedia()
            throw MediaError.fileTooLarge
        }

        draft.mediaBase64 = media.data.base64EncodedString()
        draft.mimeType = media.mimeType
    }
}

#Preview {
    @Previewable @State var draft = MealDraft(text: "Turkey sandwich, chips, iced coffee")

    NavigationStack {
        MealEntryForm(draft: $draft, message: .info("Draft preview"))
            .navigationTitle("Add Meal")
    }
}
