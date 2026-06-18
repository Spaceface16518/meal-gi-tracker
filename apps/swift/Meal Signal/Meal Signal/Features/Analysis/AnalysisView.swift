import SwiftUI

struct AnalysisView: View {
    @Environment(\.firebaseService) private var service

    let viewModel: AnalysisModel
    let session: AuthSession

    @State private var actionMessage: AppMessage?
    @State private var isRunning = false

    var body: some View {
        NavigationStack {
            AnalysisContent(
                message: actionMessage ?? viewModel.message,
                analysis: viewModel.analysis,
                mealCount: viewModel.mealCount,
                eventCount: viewModel.eventCount,
                isLoading: viewModel.isLoading,
                isRunning: isRunning,
                runAnalysis: runAnalysis
            )
            .navigationTitle("Analysis")
            .toolbar { AccountToolbar(session: session) }
        }
    }

    private func runAnalysis() {
        Task {
            isRunning = true
            defer { isRunning = false }

            do {
                try await service.analyzeCorrelations()
                actionMessage = .info("Analysis queued.")
            } catch {
                actionMessage = .error("Analysis could not be started.")
            }
        }
    }
}

struct AnalysisContent: View {
    let message: AppMessage?
    let analysis: CorrelationAnalysis?
    let mealCount: Int
    let eventCount: Int
    let isLoading: Bool
    let isRunning: Bool
    let runAnalysis: () -> Void

    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                if let message {
                    StatusBanner(message: message)
                }

                Panel {
                    VStack(alignment: .leading, spacing: 14) {
                        AnalysisHeader(
                            analysis: analysis,
                            mealCount: mealCount,
                            eventCount: eventCount,
                            isLoading: isLoading,
                            isRunning: isRunning,
                            runAnalysis: runAnalysis
                        )
                        AnalysisResults(analysis: analysis, isLoading: isLoading)
                    }
                }
            }
            .padding()
        }
        .background(MealSignalDesign.background.ignoresSafeArea())
    }
}

private struct AnalysisHeader: View {
    let analysis: CorrelationAnalysis?
    let mealCount: Int
    let eventCount: Int
    let isLoading: Bool
    let isRunning: Bool
    let runAnalysis: () -> Void

    private var subtitle: String {
        if isLoading {
            return "Loading meal and event counts"
        }
        if let analysis {
            return "Updated \(analysis.generatedAt.formatted(date: .abbreviated, time: .shortened))"
        }
        return "\(mealCount) meals and \(eventCount) GI events available"
    }

    var body: some View {
        HStack(alignment: .top) {
            VStack(alignment: .leading, spacing: 4) {
                Text("Correlation analysis").font(.headline)
                Text(subtitle).font(.subheadline).foregroundStyle(.secondary)
            }
            Spacer()
            Button(action: runAnalysis) {
                LoadingLabel(title: isRunning ? "Starting" : "Run", systemImage: "arrow.clockwise", isLoading: isRunning)
            }
                .buttonStyle(.borderedProminent)
                .disabled(isRunning)
        }
    }
}

private struct AnalysisResults: View {
    let analysis: CorrelationAnalysis?
    let isLoading: Bool

    var body: some View {
        if let analysis {
            VStack(alignment: .leading, spacing: 14) {
                AnalysisSummary(analysis: analysis)
                ForEach(analysis.findings) { finding in
                    FindingRow(finding: finding)
                }
                DataQualityNotes(notes: analysis.dataQualityNotes)
            }
        } else if isLoading {
            LoadingStateView(title: "Loading analysis")
        } else {
            ContentUnavailableView("No analysis yet", systemImage: "chart.bar")
                .frame(maxWidth: .infinity)
        }
    }
}

#Preview("With analysis") {
    NavigationStack {
        AnalysisContent(
            message: .info("Analysis queued."),
            analysis: PreviewFixtures.analysis,
            mealCount: 14,
            eventCount: 5,
            isLoading: false,
            isRunning: false,
            runAnalysis: {}
        )
        .navigationTitle("Analysis")
    }
}

#Preview("Empty") {
    NavigationStack {
        AnalysisContent(
            message: nil,
            analysis: nil,
            mealCount: 2,
            eventCount: 0,
            isLoading: true,
            isRunning: true,
            runAnalysis: {}
        )
        .navigationTitle("Analysis")
    }
}

private struct AnalysisSummary: View {
    let analysis: CorrelationAnalysis

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(analysis.summary)
                .font(.subheadline.weight(.medium))
                .foregroundStyle(MealSignalDesign.brand)
            Text("\(analysis.mealCount) meals, \(analysis.eventCount) GI events")
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .padding(12)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(MealSignalDesign.brand.opacity(0.1), in: RoundedRectangle(cornerRadius: 10))
    }
}

private struct FindingRow: View {
    let finding: CorrelationFinding

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                VStack(alignment: .leading) {
                    Text(finding.irritant).font(.headline)
                    Text("\(direction) within \(finding.windowHours)h")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                Spacer()
                Text("\(Int((finding.confidence * 100).rounded()))%")
                    .font(.caption.weight(.bold))
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 7))
            }
            Text(finding.evidence).font(.footnote).foregroundStyle(.secondary)
            Text(finding.suggestedAction).font(.footnote.weight(.medium)).foregroundStyle(MealSignalDesign.brand)
        }
        .padding(12)
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 10))
    }

    private var direction: String {
        finding.direction == "possible_trigger" ? "possible sensitivity" : finding.direction.replacingOccurrences(of: "_", with: " ")
    }
}

private struct DataQualityNotes: View {
    let notes: [String]

    var body: some View {
        if !notes.isEmpty {
            VStack(alignment: .leading, spacing: 6) {
                Label("Data notes", systemImage: "exclamationmark.circle")
                    .font(.subheadline.weight(.semibold))
                ForEach(notes, id: \.self) { note in
                    Text(note).font(.footnote).foregroundStyle(.secondary)
                }
            }
            .padding(12)
            .background(.yellow.opacity(0.12), in: RoundedRectangle(cornerRadius: 10))
        }
    }
}
