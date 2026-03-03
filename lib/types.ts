import { ObjectId } from "mongodb";

export type EntryType = "meal" | "gi_event" | "bm";

export interface EntryTimeMeta {
  timezone?: string;
  utcOffsetMinutes?: number;
}

export interface EntryDoc {
  _id?: ObjectId;
  ts: Date;
  time?: EntryTimeMeta;
  type: EntryType;
  userId: ObjectId;
  input: {
    notes?: string;
    fields?: Record<string, unknown>;
  };
  image?: {
    gridFsId: ObjectId;
    contentType: string;
    sha256?: string;
    sizeBytes?: number;
  };
  ai?: {
    model: string;
    promptVersion: string;
    rawTextSummary: string;
    extracted: Record<string, unknown>;
    searchText: string;
    confidence?: Record<string, unknown>;
    uncertaintyNotes?: string[];
  };
  aiJob?: {
    status: "queued" | "completed" | "failed";
    responseId?: string;
    model?: string;
    promptVersion: string;
    requestedAt: Date;
    completedAt?: Date;
    error?: string;
  };
  search: {
    text: string;
    tags?: string[];
  };
}

export interface MealExtraction {
  rawTextSummary: string;
  searchText: string;
  extracted: Record<string, unknown>;
  uncertaintyNotes: string[];
  confidence?: Record<string, unknown>;
}
