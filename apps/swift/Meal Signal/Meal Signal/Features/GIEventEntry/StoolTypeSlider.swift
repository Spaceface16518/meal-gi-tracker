import SwiftUI

struct StoolTypeSlider: View {
    @Binding var stoolType: Int?

    private var selectedType: StoolType? {
        stoolType.flatMap(StoolType.init(value:))
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            header
            VStack(spacing: 10) {
                StoolTypeSummary(type: selectedType)
                Slider(value: sliderValue, in: 1...7, step: 1)
                    .tint(MealSignalDesign.brand)
                    .accessibilityLabel("Bristol stool type")
                HStack {
                    Text("1")
                    Spacer()
                    Text("7")
                }
                .font(.caption2.weight(.medium))
                .foregroundStyle(.secondary)
            }
            .padding(12)
            .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 10))
        }
    }

    private var header: some View {
        HStack {
            Text("Stool type").font(.subheadline.weight(.medium))
            Spacer()
            if stoolType != nil {
                Button("Clear", action: clear)
                    .font(.caption.weight(.semibold))
            }
        }
    }

    private var sliderValue: Binding<Double> {
        Binding(
            get: { Double(stoolType ?? 4) },
            set: { stoolType = Int($0.rounded()) }
        )
    }

    private func clear() {
        stoolType = nil
    }
}

private struct StoolTypeSummary: View {
    let type: StoolType?

    var body: some View {
        HStack(spacing: 12) {
            BristolStoolIcon(type: type?.value)
                .frame(width: 58, height: 36)
                .foregroundStyle(type == nil ? Color.secondary.opacity(0.45) : Color.primary)
                .accessibilityHidden(true)

            VStack(alignment: .leading, spacing: 2) {
                Text(type.map { "Type \($0.value)" } ?? "Not set")
                    .font(.subheadline.weight(.semibold))
                    .frame(height: 20, alignment: .leading)
                Text(type?.label ?? "Move slider to set")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .lineLimit(2)
                    .frame(height: 34, alignment: .topLeading)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .frame(minHeight: 58)
    }
}

private struct BristolStoolIcon: View {
    let type: Int?

    var body: some View {
        ZStack {
            switch type {
            case 1:
                Circle().frame(width: 10, height: 10).offset(x: -18, y: 5)
                Circle().frame(width: 9, height: 9).offset(x: -5, y: -3)
                Circle().frame(width: 11, height: 11).offset(x: 10, y: 6)
                Circle().frame(width: 8, height: 8).offset(x: 22, y: -6)
            case 2:
                Capsule().frame(width: 48, height: 17)
                WavyHighlight().stroke(.white.opacity(0.75), lineWidth: 2).frame(width: 42, height: 14)
            case 3:
                Capsule().frame(width: 50, height: 16)
                CrackMarks().stroke(.white.opacity(0.75), style: StrokeStyle(lineWidth: 2, lineCap: .round))
                    .frame(width: 42, height: 18)
            case 4:
                SmoothStoolShape().frame(width: 52, height: 24)
            case 5:
                Ellipse().frame(width: 18, height: 14).offset(x: -16, y: 4)
                Ellipse().frame(width: 20, height: 15).offset(x: 2, y: -3)
                Ellipse().frame(width: 17, height: 13).offset(x: 18, y: 6)
            case 6:
                SoftStoolShape().frame(width: 50, height: 26)
                CrackMarks().stroke(.white.opacity(0.65), style: StrokeStyle(lineWidth: 1.5, lineCap: .round))
                    .frame(width: 38, height: 18)
            case 7:
                Ellipse().opacity(0.55).frame(width: 52, height: 16).offset(y: 4)
                Ellipse().opacity(0.7).frame(width: 18, height: 7).offset(x: -11)
                Ellipse().opacity(0.55).frame(width: 20, height: 7).offset(x: 13, y: 5)
            default:
                SmoothStoolShape().frame(width: 48, height: 22).opacity(0.7)
            }
        }
    }
}

private struct SmoothStoolShape: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: CGPoint(x: rect.minX + rect.width * 0.06, y: rect.midY + rect.height * 0.1))
        path.addCurve(
            to: CGPoint(x: rect.minX + rect.width * 0.7, y: rect.minY + rect.height * 0.2),
            control1: CGPoint(x: rect.minX + rect.width * 0.25, y: rect.minY - rect.height * 0.2),
            control2: CGPoint(x: rect.minX + rect.width * 0.5, y: rect.minY)
        )
        path.addCurve(
            to: CGPoint(x: rect.maxX - rect.width * 0.03, y: rect.midY),
            control1: CGPoint(x: rect.minX + rect.width * 0.86, y: rect.minY + rect.height * 0.1),
            control2: CGPoint(x: rect.maxX, y: rect.minY + rect.height * 0.18)
        )
        path.addCurve(
            to: CGPoint(x: rect.minX + rect.width * 0.12, y: rect.maxY - rect.height * 0.08),
            control1: CGPoint(x: rect.maxX, y: rect.maxY + rect.height * 0.18),
            control2: CGPoint(x: rect.minX + rect.width * 0.36, y: rect.maxY)
        )
        path.addCurve(
            to: CGPoint(x: rect.minX + rect.width * 0.06, y: rect.midY + rect.height * 0.1),
            control1: CGPoint(x: rect.minX, y: rect.maxY - rect.height * 0.2),
            control2: CGPoint(x: rect.minX - rect.width * 0.02, y: rect.midY + rect.height * 0.25)
        )
        return path
    }
}

private struct SoftStoolShape: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: CGPoint(x: rect.minX + rect.width * 0.08, y: rect.maxY - rect.height * 0.2))
        path.addCurve(
            to: CGPoint(x: rect.minX + rect.width * 0.36, y: rect.minY + rect.height * 0.18),
            control1: CGPoint(x: rect.minX - rect.width * 0.08, y: rect.midY),
            control2: CGPoint(x: rect.minX + rect.width * 0.2, y: rect.minY - rect.height * 0.08)
        )
        path.addCurve(
            to: CGPoint(x: rect.minX + rect.width * 0.68, y: rect.minY + rect.height * 0.28),
            control1: CGPoint(x: rect.minX + rect.width * 0.5, y: rect.minY - rect.height * 0.1),
            control2: CGPoint(x: rect.minX + rect.width * 0.68, y: rect.minY)
        )
        path.addCurve(
            to: CGPoint(x: rect.maxX - rect.width * 0.08, y: rect.maxY - rect.height * 0.18),
            control1: CGPoint(x: rect.maxX + rect.width * 0.1, y: rect.minY + rect.height * 0.2),
            control2: CGPoint(x: rect.maxX + rect.width * 0.04, y: rect.maxY - rect.height * 0.12)
        )
        path.closeSubpath()
        return path
    }
}

private struct WavyHighlight: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: CGPoint(x: rect.minX, y: rect.midY))
        path.addCurve(
            to: CGPoint(x: rect.maxX, y: rect.midY),
            control1: CGPoint(x: rect.minX + rect.width * 0.28, y: rect.minY),
            control2: CGPoint(x: rect.minX + rect.width * 0.62, y: rect.maxY)
        )
        return path
    }
}

private struct CrackMarks: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: CGPoint(x: rect.minX + rect.width * 0.22, y: rect.minY + 2))
        path.addLine(to: CGPoint(x: rect.minX + rect.width * 0.32, y: rect.maxY - 2))
        path.move(to: CGPoint(x: rect.midX, y: rect.minY))
        path.addLine(to: CGPoint(x: rect.midX - 3, y: rect.maxY))
        path.move(to: CGPoint(x: rect.maxX - rect.width * 0.22, y: rect.minY + 3))
        path.addLine(to: CGPoint(x: rect.maxX - rect.width * 0.34, y: rect.maxY - 1))
        return path
    }
}

private struct StoolType: Equatable {
    let value: Int
    let label: String

    nonisolated init?(value: Int) {
        guard let label = Self.label(for: value) else { return nil }
        self.value = value
        self.label = label
    }

    private nonisolated static func label(for value: Int) -> String? {
        switch value {
        case 1: "Separate hard lumps"
        case 2: "Lumpy sausage"
        case 3: "Cracked sausage"
        case 4: "Smooth soft sausage"
        case 5: "Soft blobs"
        case 6: "Mushy pieces"
        case 7: "Watery"
        default: nil
        }
    }
}

#Preview {
    @Previewable @State var stoolType: Int? = 4

    StoolTypeSlider(stoolType: $stoolType)
        .padding()
}
