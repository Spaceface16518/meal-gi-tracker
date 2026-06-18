//
//  Meal_SignalApp.swift
//  Meal Signal
//
//  Created by Amrit Rathie on 6/17/26.
//

import SwiftUI
import FirebaseCore

@main
struct Meal_SignalApp: App {
    init() {
        if FirebaseApp.app() == nil, Bundle.main.path(forResource: "GoogleService-Info", ofType: "plist") != nil {
            FirebaseApp.configure()
        }
    }

    var body: some Scene {
        WindowGroup {
            RootView()
        }
    }
}
