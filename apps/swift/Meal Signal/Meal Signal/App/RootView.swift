import SwiftUI

struct RootView: View {
    @State private var viewModel = AppModel()

    var body: some View {
        Group {
            if !viewModel.session.isConfigured {
                ConfigMissingView()
            } else if !viewModel.session.authReady {
                ProgressView("Loading")
            } else if viewModel.session.user == nil {
                AuthView(session: viewModel.session)
            } else if let uid = viewModel.session.userID {
                AppTabs(uid: uid, session: viewModel.session)
            }
        }
        .tint(MealSignalDesign.brand)
        .environment(\.firebaseService, viewModel.service)
    }
}

private struct ConfigMissingView: View {
    var body: some View {
        ContentUnavailableView(
            "Firebase configuration missing",
            systemImage: "exclamationmark.triangle",
            description: Text("Add GoogleService-Info.plist to the Meal Signal target to connect the shared backend.")
        )
        .padding()
    }
}

private struct AuthView: View {
    @Environment(\.firebaseService) private var service

    let session: AuthSession

    @State private var email = ""
    @State private var password = ""
    @State private var isSignUp = false
    @State private var busy = false
    @State private var message: AppMessage?

    var body: some View {
        NavigationStack {
            Form {
                Section {
                    TextField("Email", text: $email)
                        .textContentType(.emailAddress)
                    SecureField("Password", text: $password)
                        .textContentType(isSignUp ? .newPassword : .password)
                }

                Section {
                    Button(isSignUp ? "Create account" : "Sign in", action: submit)
                        .disabled(email.isEmpty || password.count < 6 || busy)
                    Button(isSignUp ? "Use existing account" : "Create an account") {
                        isSignUp.toggle()
                    }
                }

                if let message = message ?? session.message {
                    Section { StatusBanner(message: message) }
                }
            }
            .navigationTitle("Meal Signal")
        }
    }

    private func submit() {
        Task {
            busy = true
            message = nil
            do {
                if isSignUp {
                    try await service.signUp(email: email, password: password)
                } else {
                    try await service.signIn(email: email, password: password)
                }
            } catch {
                message = .error(error.localizedDescription)
            }
            busy = false
        }
    }
}

private enum AppTab: String, CaseIterable, Identifiable {
    case history = "Home"
    case analysis = "Analysis"

    var id: String { rawValue }

    var icon: String {
        switch self {
        case .history: "clock"
        case .analysis: "chart.bar"
        }
    }
}

private struct AppTabs: View {
    @State private var viewModel: TabsModel

    init(uid: String, session: AuthSession) {
        _viewModel = State(initialValue: TabsModel(uid: uid, session: session))
    }

    var body: some View {
        TabView {
            HomeView(
                history: viewModel.history,
                session: viewModel.session
            )
                .tabItem { Label(AppTab.history.rawValue, systemImage: AppTab.history.icon) }

            AnalysisView(viewModel: viewModel.analysis, session: viewModel.session)
                .tabItem { Label(AppTab.analysis.rawValue, systemImage: AppTab.analysis.icon) }
        }
    }
}

#Preview {
    RootView()
}
