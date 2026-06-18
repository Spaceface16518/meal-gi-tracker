import SwiftUI

struct AccountMenu: View {
    @Environment(\.firebaseService) private var service

    let session: AuthSession

    var body: some View {
        Menu {
            Section {
                Label(session.userEmail, systemImage: "person.crop.circle")
            }
            Button("Sign out", systemImage: "rectangle.portrait.and.arrow.right", role: .destructive, action: signOut)
        } label: {
            Image(systemName: "person.crop.circle")
                .font(.title3)
                .glassSurface(interactive: true)
        }
        .accessibilityLabel("Account")
    }

    private func signOut() {
        try? service.signOut()
    }
}
