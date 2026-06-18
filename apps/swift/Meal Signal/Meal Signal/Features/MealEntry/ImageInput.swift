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
                Button(action: takePhoto) {
                    Label("Take Photo", systemImage: "camera")
                        .frame(maxWidth: .infinity, minHeight: 44)
                        .foregroundStyle(.white)
                }
                .buttonStyle(.borderedProminent)
                .tint(MealSignalDesign.brand)
                .disabled(!UIImagePickerController.isSourceTypeAvailable(.camera))

                PhotosPicker(selection: $selectedImage, matching: .images) {
                    Label(hasImage ? "Replace" : "Choose", systemImage: "photo")
                        .frame(maxWidth: .infinity, minHeight: 44)
                        .foregroundStyle(MealSignalDesign.brand)
                }
                .buttonStyle(.bordered)
            }

            MediaReadyRow(isReady: hasImage || hasDescription, label: hasDescription ? "Description ready" : "Image ready")
        }
        .padding(.vertical, 4)
    }
}

#Preview {
    @Previewable @State var item: PhotosPickerItem?

    ImageInput(selectedImage: $item, hasImage: true, hasDescription: true, takePhoto: {})
        .padding()
}
