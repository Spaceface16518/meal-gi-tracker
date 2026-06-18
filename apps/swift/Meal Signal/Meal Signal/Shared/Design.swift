import SwiftUI
import UIKit

enum MealSignalDesign {
    static let brand = Color(UIColor { traits in
        traits.userInterfaceStyle == .dark
            ? UIColor(red: 0.34, green: 0.72, blue: 0.56, alpha: 1)
            : UIColor(red: 0.02, green: 0.31, blue: 0.23, alpha: 1)
    })
    static let background = Color(UIColor { traits in
        traits.userInterfaceStyle == .dark
            ? UIColor(red: 0.06, green: 0.07, blue: 0.06, alpha: 1)
            : UIColor(red: 0.97, green: 0.97, blue: 0.94, alpha: 1)
    })
    static let surface = Color(UIColor { traits in
        traits.userInterfaceStyle == .dark
            ? UIColor.secondarySystemGroupedBackground
            : UIColor.white
    })
    static let muted = Color.secondary
}

struct Panel<Content: View>: View {
    let content: Content

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        content
            .padding()
            .background {
                RoundedRectangle(cornerRadius: 14, style: .continuous)
                    .fill(.background)
                    .shadow(color: .black.opacity(0.05), radius: 10, y: 4)
            }
            .glassSurface()
    }
}

struct StatusBanner: View {
    let message: AppMessage

    var body: some View {
        Text(message.text)
            .font(.footnote.weight(.medium))
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(12)
            .background(tint.opacity(0.16), in: RoundedRectangle(cornerRadius: 10))
            .foregroundStyle(tint)
    }

    private var tint: Color {
        switch message.tone {
        case .info: .blue
        case .success: .green
        case .error: .red
        }
    }
}

extension View {
    @ViewBuilder
    func glassSurface(interactive: Bool = false) -> some View {
        if #available(iOS 26.0, *) {
            self.glassEffect(interactive ? .regular.interactive() : .regular, in: .rect(cornerRadius: 14))
        } else {
            self.background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 14, style: .continuous))
        }
    }
}

extension Date {
    var relativeMealSignalText: String {
        let seconds = max(0, Date().timeIntervalSince(self))
        if seconds < 60 { return "just now" }
        if seconds < 3600 { return "\(Int(seconds / 60))m ago" }
        if seconds < 86400 { return "\(Int(seconds / 3600))h ago" }
        if seconds < 604800 { return "\(Int(seconds / 86400))d ago" }
        return formatted(.dateTime.month(.abbreviated).day().year(Calendar.current.component(.year, from: self) == Calendar.current.component(.year, from: Date()) ? .omitted : .defaultDigits))
    }
}

let symptomOptions = ["cramping", "bloating", "reflux", "nausea", "diarrhea", "constipation", "gas", "pain"]

let stoolTypeLabels = [
    1: "Separate hard lumps",
    2: "Lumpy sausage",
    3: "Cracked sausage",
    4: "Smooth soft sausage",
    5: "Soft blobs",
    6: "Mushy pieces",
    7: "Watery",
]
