import SwiftUI

enum AddSheet: String, Identifiable {
    case meal
    case event

    var id: String { rawValue }
}

struct AddShortcuts: View {
    let mealCount: Int
    let eventCount: Int
    @Binding var addSheet: AddSheet?

    var body: some View {
        HStack(spacing: 10) {
            AddShortcutButton(
                title: "Add meal",
                value: "\(mealCount)",
                caption: "Meals",
                systemImage: "fork.knife",
                action: addMeal
            )
            AddShortcutButton(
                title: "Add GI event",
                value: "\(eventCount)",
                caption: "Events",
                systemImage: "waveform.path.ecg",
                action: addEvent
            )
        }
    }

    private func addMeal() {
        addSheet = .meal
    }

    private func addEvent() {
        addSheet = .event
    }
}

private struct AddShortcutButton: View {
    let title: String
    let value: String
    let caption: String
    let systemImage: String
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(alignment: .leading, spacing: 6) {
                Image(systemName: systemImage).foregroundStyle(MealSignalDesign.brand)
                Text(value).font(.headline).lineLimit(1).minimumScaleFactor(0.7)
                Text(caption).font(.caption).foregroundStyle(.secondary)
                Text(title).font(.subheadline.weight(.semibold))
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .buttonStyle(.plain)
        .padding()
        .glassSurface(interactive: true)
    }
}

#Preview {
    @Previewable @State var addSheet: AddSheet?

    AddShortcuts(mealCount: 12, eventCount: 4, addSheet: $addSheet)
        .padding()
        .background(MealSignalDesign.background)
}
