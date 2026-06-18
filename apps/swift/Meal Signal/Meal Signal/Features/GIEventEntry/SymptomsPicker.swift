import SwiftUI

struct SymptomsPicker: View {
    @Binding var symptoms: [String]

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Symptoms").font(.subheadline.weight(.medium))
            FlowLayout(spacing: 8) {
                ForEach(symptomOptions, id: \.self) { symptom in
                    Button(symptom) { toggle(symptom) }
                        .buttonStyle(.bordered)
                        .controlSize(.small)
                        .tint(symptoms.contains(symptom) ? MealSignalDesign.brand : .secondary)
                }
            }
        }
    }

    private func toggle(_ symptom: String) {
        if symptoms.contains(symptom) {
            symptoms.removeAll { $0 == symptom }
        } else {
            symptoms.append(symptom)
        }
    }
}

#Preview {
    @Previewable @State var symptoms = ["bloating", "reflux"]

    SymptomsPicker(symptoms: $symptoms)
        .padding()
}
