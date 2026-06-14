"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Mic, Utensils } from "lucide-react";
import { createMeal } from "@/lib/callables";
import { toDatetimeLocalValue } from "@/lib/date";
import { getErrorMessage } from "@/lib/errors";
import type { InputMode } from "@/lib/types";
import { maxMediaBytes } from "@/components/tracker/constants";
import { MediaReady, ModeButton, SubmitRow } from "@/components/tracker/ui";

type MessageTone = "info" | "error" | "success";

export function MealComposer() {
  const [mode, setMode] = useState<InputMode>("text");
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [eatenAt, setEatenAt] = useState(toDatetimeLocalValue(new Date()));
  const [mediaBase64, setMediaBase64] = useState("");
  const [mimeType, setMimeType] = useState("");
  const [recording, setRecording] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState<MessageTone>("info");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    return () => {
      mediaRecorderRef.current?.stop();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    setMessageTone("info");

    const eatenAtDate = new Date(eatenAt);
    if (Number.isNaN(eatenAtDate.getTime())) {
      setMessageTone("error");
      setMessage("Choose a valid meal time.");
      setBusy(false);
      return;
    }

    try {
      await createMeal({
        mode,
        text: mode === "text" ? text : undefined,
        mediaBase64: mode === "text" ? undefined : mediaBase64,
        mimeType: mode === "text" ? undefined : mimeType,
        eatenAt: eatenAtDate.toISOString(),
        notes: notes.trim() || undefined,
      });
      setText("");
      setNotes("");
      setMediaBase64("");
      setMimeType("");
      setEatenAt(toDatetimeLocalValue(new Date()));
      setMessageTone("success");
      setMessage("Meal saved.");
    } catch (err) {
      setMessageTone("error");
      setMessage(getErrorMessage(err, "Meal could not be saved."));
    } finally {
      setBusy(false);
    }
  }

  async function onFileChange(file?: File) {
    setMessage("");
    setMessageTone("info");
    if (!file) return;

    if (file.size > maxMediaBytes) {
      setMediaBase64("");
      setMimeType("");
      setMessageTone("error");
      setMessage("Use an image smaller than 5 MB.");
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setMediaBase64(base64);
      setMimeType(file.type);
      setMessageTone("success");
      setMessage("Image ready.");
    } catch (err) {
      setMessageTone("error");
      setMessage(getErrorMessage(err, "Image could not be read."));
    }
  }

  async function toggleRecording() {
    setMessage("");
    setMessageTone("info");

    if (recording) {
      mediaRecorderRef.current?.stop();
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setMessageTone("error");
      setMessage("Audio recording is not available in this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      chunksRef.current = [];
      mediaRecorderRef.current = recorder;
      mediaStreamRef.current = stream;
      recorder.ondataavailable = (event) => {
        if (event.data.size) chunksRef.current.push(event.data);
      };
      recorder.onerror = () => {
        setMessageTone("error");
        setMessage("Audio recording failed.");
      };
      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
        setRecording(false);

        if (blob.size > maxMediaBytes) {
          setMediaBase64("");
          setMimeType("");
          setMessageTone("error");
          setMessage("Use a shorter recording under 5 MB.");
          return;
        }

        try {
          setMediaBase64(await blobToBase64(blob));
          setMimeType(blob.type);
          setMessageTone("success");
          setMessage("Audio ready.");
        } catch (err) {
          setMessageTone("error");
          setMessage(getErrorMessage(err, "Audio could not be prepared."));
        }
      };
      recorder.start();
      setRecording(true);
    } catch (err) {
      setMessageTone("error");
      setMessage(getErrorMessage(err, "Microphone access was not granted."));
    }
  }

  const canSubmit =
    mode === "text" ? text.trim().length > 2 : mediaBase64.length > 0 && mimeType.length > 0;

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Meal</h2>
          <p className="text-sm text-stone-500">Capture what you ate and when.</p>
        </div>
        <Utensils className="mt-1 text-emerald-950" size={20} aria-hidden />
      </div>

      <form className="grid gap-4" onSubmit={submit}>
        <div className="grid grid-cols-3 gap-2">
          <ModeButton active={mode === "text"} onClick={() => setMode("text")} icon={<Utensils size={17} />}>
            Text
          </ModeButton>
          <ModeButton active={mode === "voice"} onClick={() => setMode("voice")} icon={<Mic size={17} />}>
            Voice
          </ModeButton>
          <ModeButton active={mode === "image"} onClick={() => setMode("image")} icon={<Camera size={17} />}>
            Image
          </ModeButton>
        </div>

        {mode === "text" ? (
          <label className="grid gap-1 text-sm font-medium text-stone-700">
            Meal text
            <textarea
              className="min-h-28 rounded-lg border border-stone-300 bg-white px-3 py-2 text-base outline-none transition focus:border-emerald-800 focus:ring-2 focus:ring-emerald-900/15"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Turkey sandwich, chips, iced coffee"
            />
          </label>
        ) : mode === "voice" ? (
          <div className="grid gap-3 rounded-lg border border-stone-200 bg-stone-50 p-3">
            <button
              type="button"
              onClick={toggleRecording}
              className={`flex h-12 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition ${
                recording
                  ? "bg-red-700 text-white hover:bg-red-800"
                  : "bg-emerald-950 text-white hover:bg-emerald-900"
              }`}
            >
              <Mic size={18} aria-hidden />
              {recording ? "Stop recording" : mediaBase64 ? "Record again" : "Record"}
            </button>
            <MediaReady ready={Boolean(mediaBase64)} label="Audio ready" />
          </div>
        ) : (
          <label className="grid gap-3 rounded-lg border border-dashed border-stone-300 bg-stone-50 p-4 text-sm font-medium text-stone-700">
            <span className="flex items-center gap-2">
              <Camera size={18} aria-hidden />
              Meal photo
            </span>
            <input
              className="block w-full text-sm text-stone-600 file:mr-3 file:rounded-md file:border-0 file:bg-emerald-950 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(event) => onFileChange(event.target.files?.[0])}
            />
            <MediaReady ready={Boolean(mediaBase64)} label="Image ready" />
          </label>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm font-medium text-stone-700">
            Eaten at
            <input
              className="h-11 rounded-lg border border-stone-300 bg-white px-3 text-base outline-none transition focus:border-emerald-800 focus:ring-2 focus:ring-emerald-900/15"
              type="datetime-local"
              value={eatenAt}
              onChange={(event) => setEatenAt(event.target.value)}
              required
            />
          </label>
          <label className="grid gap-1 text-sm font-medium text-stone-700">
            Notes
            <input
              className="h-11 rounded-lg border border-stone-300 bg-white px-3 text-base outline-none transition focus:border-emerald-800 focus:ring-2 focus:ring-emerald-900/15"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Portion, stress, meds"
            />
          </label>
        </div>

        <SubmitRow
          busy={busy}
          disabled={!canSubmit || busy}
          message={message}
          tone={messageTone}
          label="Save meal"
        />
      </form>
    </section>
  );
}

function fileToBase64(file: File) {
  return blobToBase64(file);
}

function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const value = String(reader.result ?? "");
      resolve(value.includes(",") ? value.split(",")[1] : value);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}
