import { createSignal, onCleanup } from "solid-js";
import { Camera, Mic, Utensils } from "lucide-solid";
import { createMeal } from "@/lib/callables";
import { toDatetimeLocalValue } from "@/lib/date";
import { getErrorMessage } from "@/lib/errors";
import type { InputMode } from "@/lib/types";
import { maxMediaBytes } from "@/components/tracker/constants";
import { MediaReady, ModeButton, SubmitRow } from "@/components/tracker/ui";
import { demoReadOnlyMessage } from "@/lib/demo";

type MessageTone = "info" | "error" | "success";

export function MealComposer(props: { readOnly?: boolean }) {
  const [mode, setMode] = createSignal<InputMode>("text");
  const [text, setText] = createSignal("");
  const [notes, setNotes] = createSignal("");
  const [eatenAt, setEatenAt] = createSignal(toDatetimeLocalValue(new Date()));
  const [mediaBase64, setMediaBase64] = createSignal("");
  const [mimeType, setMimeType] = createSignal("");
  const [recording, setRecording] = createSignal(false);
  const [busy, setBusy] = createSignal(false);
  const [message, setMessage] = createSignal("");
  const [messageTone, setMessageTone] = createSignal<MessageTone>("info");

  let mediaRecorderRef: MediaRecorder | null = null;
  let mediaStreamRef: MediaStream | null = null;
  let chunksRef: Blob[] = [];

  onCleanup(() => {
    mediaRecorderRef?.stop();
    mediaStreamRef?.getTracks().forEach((track) => track.stop());
  });

  async function submit(event: Event) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    setMessageTone("info");

    if (props.readOnly) {
      setMessage(demoReadOnlyMessage);
      setBusy(false);
      return;
    }

    const eatenAtDate = new Date(eatenAt());
    if (Number.isNaN(eatenAtDate.getTime())) {
      setMessageTone("error");
      setMessage("Choose a valid meal time.");
      setBusy(false);
      return;
    }

    try {
      await createMeal({
        mode: mode(),
        text: mode() === "text" ? text() : undefined,
        mediaBase64: mode() === "text" ? undefined : mediaBase64(),
        mimeType: mode() === "text" ? undefined : mimeType(),
        eatenAt: eatenAtDate.toISOString(),
        notes: notes().trim() || undefined,
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

    if (recording()) {
      mediaRecorderRef?.stop();
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

      chunksRef = [];
      mediaRecorderRef = recorder;
      mediaStreamRef = stream;
      recorder.ondataavailable = (event) => {
        if (event.data.size) chunksRef.push(event.data);
      };
      recorder.onerror = () => {
        setMessageTone("error");
        setMessage("Audio recording failed.");
      };
      recorder.onstop = async () => {
        const blob = new Blob(chunksRef, { type: recorder.mimeType || "audio/webm" });
        mediaStreamRef?.getTracks().forEach((track) => track.stop());
        mediaStreamRef = null;
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

  const canSubmit = () =>
    mode() === "text"
      ? text().trim().length > 2
      : mediaBase64().length > 0 && mimeType().length > 0;

  return (
    <section class="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5">
      <div class="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold">Meal</h2>
          <p class="text-sm text-muted">Capture what you ate and when.</p>
        </div>
        <Utensils class="mt-1 text-brand" size={20} aria-hidden />
      </div>

      <form class="grid gap-4" onSubmit={submit}>
        <div class="grid grid-cols-3 gap-2">
          <ModeButton
            active={mode() === "text"}
            onClick={() => setMode("text")}
            icon={<Utensils size={17} />}
          >
            Text
          </ModeButton>
          <ModeButton
            active={mode() === "voice"}
            onClick={() => setMode("voice")}
            icon={<Mic size={17} />}
          >
            Voice
          </ModeButton>
          <ModeButton
            active={mode() === "image"}
            onClick={() => setMode("image")}
            icon={<Camera size={17} />}
          >
            Image
          </ModeButton>
        </div>

        {mode() === "text" ? (
          <label class="grid gap-1 text-sm font-medium text-muted-strong">
            Meal text
            <textarea
              class="min-h-28 rounded-lg border border-border-strong bg-surface px-3 py-2 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              value={text()}
              onInput={(event) => setText((event.target as HTMLTextAreaElement).value)}
              placeholder="Turkey sandwich, chips, iced coffee"
            />
          </label>
        ) : mode() === "voice" ? (
          <div class="grid gap-3 rounded-lg border border-border bg-surface-muted p-3">
            <button
              type="button"
              onClick={toggleRecording}
              classList={{
                "flex h-12 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition": true,
                "bg-danger text-background hover:bg-danger-strong": recording(),
                "bg-brand text-background hover:bg-brand-hover": !recording(),
              }}
            >
              <Mic size={18} aria-hidden />
              {recording() ? "Stop recording" : mediaBase64() ? "Record again" : "Record"}
            </button>
            <MediaReady ready={Boolean(mediaBase64())} label="Audio ready" />
          </div>
        ) : (
          <label class="grid gap-3 rounded-lg border border-dashed border-border-strong bg-surface-muted p-4 text-sm font-medium text-muted-strong">
            <span class="flex items-center gap-2">
              <Camera size={18} aria-hidden />
              Meal photo
            </span>
            <input
              class="block w-full text-sm text-muted-strong file:mr-3 file:rounded-md file:border-0 file:bg-brand file:px-3 file:py-2 file:text-sm file:font-semibold file:text-background"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(event) => onFileChange((event.target as HTMLInputElement).files?.[0])}
            />
            <MediaReady ready={Boolean(mediaBase64())} label="Image ready" />
          </label>
        )}

        <div class="grid gap-4 sm:grid-cols-2">
          <label class="grid gap-1 text-sm font-medium text-muted-strong">
            Eaten at
            <input
              class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              type="datetime-local"
              value={eatenAt()}
              onInput={(event) => setEatenAt((event.target as HTMLInputElement).value)}
              required
            />
          </label>
          <label class="grid gap-1 text-sm font-medium text-muted-strong">
            Notes
            <input
              class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              value={notes()}
              onInput={(event) => setNotes((event.target as HTMLInputElement).value)}
              placeholder="Portion, stress, meds"
            />
          </label>
        </div>

        <SubmitRow
          busy={busy()}
          disabled={!canSubmit() || busy()}
          message={message()}
          tone={messageTone()}
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
