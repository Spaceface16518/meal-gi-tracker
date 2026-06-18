import SwiftUI

struct AccountToolbar: ToolbarContent {
    let session: AuthSession

    var body: some ToolbarContent {
        ToolbarItem(placement: .topBarTrailing) {
            AccountMenu(session: session)
        }
    }
}
