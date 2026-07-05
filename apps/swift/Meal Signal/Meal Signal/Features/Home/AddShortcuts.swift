import SwiftUI

enum AddSheet: String, Identifiable {
    case meal
    case event
    case skin

    var id: String { rawValue }
}

struct AddShortcuts: View {
    let mealCount: Int
    let eventCount: Int
    let skinCount: Int
    @Binding var addSheet: AddSheet?

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Log")
                .font(.headline)
                .accessibilityAddTraits(.isHeader)

            HStack(spacing: 8) {
                buttons
            }
        }
    }

    @ViewBuilder
    private var buttons: some View {
        AddShortcutButton(
            title: "Meal",
            accessibilityLabel: "Log meal",
            value: "\(mealCount)",
            caption: "meals",
            systemImage: "fork.knife",
            accessibilityHint: "Opens the meal logging form",
            action: addMeal
        )
        AddShortcutButton(
            title: "GI event",
            accessibilityLabel: "Log GI event",
            value: "\(eventCount)",
            caption: "events",
            systemImage: "waveform.path.ecg",
            accessibilityHint: "Opens the GI event logging form",
            action: addEvent
        )
        AddShortcutButton(
            title: "Skin",
            accessibilityLabel: "Track skin",
            value: "\(skinCount)",
            caption: "skin",
            systemImage: "sparkles",
            accessibilityHint: "Opens the skin tracking form",
            action: addSkin
        )
    }

    private func addMeal() {
        addSheet = .meal
    }

    private func addEvent() {
        addSheet = .event
    }

    private func addSkin() {
        addSheet = .skin
    }
}

private struct AddShortcutButton: View {
    let title: String
    let accessibilityLabel: String
    let value: String
    let caption: String
    let systemImage: String
    let accessibilityHint: String
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 7) {
                Image(systemName: systemImage)
                    .font(.body.weight(.semibold))
                    .foregroundStyle(MealSignalDesign.brand)

                Text(title)
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(.primary)
                    .lineLimit(1)
                    .minimumScaleFactor(0.7)
            }
            .frame(maxWidth: .infinity, minHeight: 44)
            .padding(.horizontal, 8)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .background {
            RoundedRectangle(cornerRadius: 14, style: .continuous)
                .fill(MealSignalDesign.surface.opacity(0.72))
                .overlay {
                    RoundedRectangle(cornerRadius: 14, style: .continuous)
                        .stroke(.primary.opacity(0.06))
                }
                .shadow(color: .black.opacity(0.06), radius: 12, y: 4)
        }
        .glassSurface(interactive: true)
        .accessibilityLabel(accessibilityLabel)
        .accessibilityValue("\(value) \(caption)")
        .accessibilityHint(accessibilityHint)
    }
}

#Preview {
    @Previewable @State var addSheet: AddSheet?

    VStack(spacing: 20) {
        AddShortcuts(mealCount: 12, eventCount: 4, skinCount: 6, addSheet: $addSheet)
        AddShortcuts(mealCount: 128, eventCount: 42, skinCount: 25, addSheet: $addSheet)
            .frame(width: 330)
    }
    .padding()
    .background(MealSignalDesign.background)
}
