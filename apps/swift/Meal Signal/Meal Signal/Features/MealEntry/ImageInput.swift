import PhotosUI
import SwiftUI
import UIKit

struct ImageInput: View {
    @Binding var selectedImage: PhotosPickerItem?
    let hasImage: Bool
    let hasDescription: Bool
    let takePhoto: () -> Void

    var body: some View {
        VStack(spacing: 12) {
            HStack(spacing: 10) {
                PhotosPicker(selection: $selectedImage, matching: .images) {
                    Label(hasImage ? "Replace" : "Choose", systemImage: "photo")
                        .frame(maxWidth: .infinity, minHeight: 44)
                        .foregroundStyle(MealSignalDesign.brand)
                }
                .buttonStyle(.bordered)

                Button(action: takePhoto) {
                    Label("Take Photo", systemImage: "camera")
                        .frame(maxWidth: .infinity, minHeight: 44)
                        .foregroundStyle(.white)
                }
                .buttonStyle(.borderedProminent)
                .tint(MealSignalDesign.brand)
                .disabled(!UIImagePickerController.isSourceTypeAvailable(.camera))
            }

            MediaReadyRow(isReady: hasImage || hasDescription, label: hasDescription ? "Description ready" : "Image ready")
        }
        .padding(.vertical, 4)
    }
}

#Preview("Image states") {
    @Previewable @State var item: PhotosPickerItem?

    VStack(spacing: 24) {
        ImageInput(selectedImage: $item, hasImage: false, hasDescription: false, takePhoto: {})
        ImageInput(selectedImage: $item, hasImage: true, hasDescription: false, takePhoto: {})
        ImageInput(selectedImage: $item, hasImage: true, hasDescription: true, takePhoto: {})
    }
        .padding()
}
