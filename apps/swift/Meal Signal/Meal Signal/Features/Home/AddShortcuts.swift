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
        ViewThatFits {
            HStack(spacing: 12) {
                buttons
            }
            VStack(spacing: 12) {
                buttons
            }
        }
    }

    @ViewBuilder
    private var buttons: some View {
        AddShortcutButton(
            title: "Log meal",
            subtitle: "Food, notes, voice, or photo",
            value: "\(mealCount)",
            caption: "meals",
            systemImage: "fork.knife",
            action: addMeal
        )
        AddShortcutButton(
            title: "Log GI event",
            subtitle: "Symptoms, severity, stool type",
            value: "\(eventCount)",
            caption: "events",
            systemImage: "waveform.path.ecg",
            action: addEvent
        )
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
    let subtitle: String
    let value: String
    let caption: String
    let systemImage: String
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(alignment: .center, spacing: 14) {
                Image(systemName: systemImage)
                    .font(.title3.weight(.semibold))
                    .foregroundStyle(.white)
                    .frame(width: 44, height: 44)
                    .background(MealSignalDesign.brand, in: RoundedRectangle(cornerRadius: 12, style: .continuous))

                VStack(alignment: .leading, spacing: 4) {
                    Text(title)
                        .font(.headline)
                        .foregroundStyle(.primary)
                    Text(subtitle)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .lineLimit(2)
                        .fixedSize(horizontal: false, vertical: true)
                }

                Spacer(minLength: 8)

                CountBadge(value: value, caption: caption)
            }
            .frame(maxWidth: .infinity, minHeight: 82, alignment: .leading)
            .padding(14)
            .contentShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
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
    }
}

private struct CountBadge: View {
    let value: String
    let caption: String

    var body: some View {
        VStack(spacing: 1) {
            Text(value)
                .font(.headline.weight(.bold))
                .lineLimit(1)
                .minimumScaleFactor(0.75)
            Text(caption)
                .font(.caption2.weight(.medium))
                .foregroundStyle(.secondary)
        }
        .frame(minWidth: 46)
        .padding(.horizontal, 8)
        .padding(.vertical, 7)
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 10, style: .continuous))
    }
}

#Preview {
    @Previewable @State var addSheet: AddSheet?

    VStack(spacing: 20) {
        AddShortcuts(mealCount: 12, eventCount: 4, addSheet: $addSheet)
        AddShortcuts(mealCount: 128, eventCount: 42, addSheet: $addSheet)
            .frame(width: 330)
    }
    .padding()
    .background(MealSignalDesign.background)
}
