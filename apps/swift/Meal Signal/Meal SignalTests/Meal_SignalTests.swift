//
//  Meal_SignalTests.swift
//  Meal SignalTests
//
//  Created by Amrit Rathie on 6/17/26.
//

import Testing
@testable import Meal_Signal

struct Meal_SignalTests {

    @Test func localVoicePayloadSendsTextWithoutMedia() {
        var draft = MealDraft(mode: .voice)
        draft.text = "Egg sandwich and coffee"
        draft.mediaBase64 = "audio-bytes"
        draft.mimeType = "audio/mp4"
        draft.processingSource = .local

        #expect(draft.textPayload == "Egg sandwich and coffee")
        #expect(draft.mediaBase64Payload == nil)
        #expect(draft.mimeTypePayload == nil)
        #expect(draft.processingSourcePayload == "local")
        #expect(draft.canSave)
    }

    @Test func localImagePayloadSendsEditedTextWithoutMedia() {
        var draft = MealDraft(mode: .image)
        draft.text = "Edited: tofu rice bowl"
        draft.mediaBase64 = "image-bytes"
        draft.mimeType = "image/jpeg"
        draft.processingSource = .local

        #expect(draft.textPayload == "Edited: tofu rice bowl")
        #expect(draft.mediaBase64Payload == nil)
        #expect(draft.mimeTypePayload == nil)
        #expect(draft.processingSourcePayload == "local")
        #expect(draft.canSave)
    }

    @Test func mediaFallbackPayloadKeepsMediaWithoutText() {
        var draft = MealDraft(mode: .image)
        draft.mediaBase64 = "image-bytes"
        draft.mimeType = "image/jpeg"
        draft.processingSource = .cloud

        #expect(draft.textPayload == nil)
        #expect(draft.mediaBase64Payload == "image-bytes")
        #expect(draft.mimeTypePayload == "image/jpeg")
        #expect(draft.processingSourcePayload == "cloud")
        #expect(draft.canSave)
    }

}
