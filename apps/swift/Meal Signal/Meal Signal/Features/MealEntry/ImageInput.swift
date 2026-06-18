import PhotosUI
import SwiftUI

struct ImageInput: View {
    @Binding var selectedImage: PhotosPickerItem?
    let hasImage: Bool

    var body: some View {
        VStack(spacing: 12) {
            PhotosPicker(selection: $selectedImage, matching: .images) {
                Label(hasImage ? "Choose another photo" : "Choose meal photo", systemImage: "photo")
                    .frame(maxWidth: .infinity, minHeight: 44)
            }
            .buttonStyle(.borderedProminent)
            .tint(MealSignalDesign.brand)

            MediaReadyRow(isReady: hasImage, label: "Image ready")
        }
        .padding(.vertical, 4)
    }
}

#Preview {
    @Previewable @State var item: PhotosPickerItem?

    ImageInput(selectedImage: $item, hasImage: true)
        .padding()
}
