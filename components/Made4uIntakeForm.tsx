"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";

type UploadedFile = { name: string; url: string; size: number };

export function Made4uIntakeForm({ sessionId }: { sessionId: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "uploading" | "submitting" | "done" | "error">(
    "idle"
  );
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      setStatus("uploading");
      const uploaded: UploadedFile[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProgress(`Uploading file ${i + 1} of ${files.length}: ${file.name}`);
        const blob = await upload(`made4u/${sessionId}/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/made4u/blob-upload",
        });
        uploaded.push({ name: file.name, url: blob.url, size: file.size });
      }

      setStatus("submitting");
      setProgress("Submitting your request...");
      const res = await fetch("/api/made4u/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          name: formData.get("name"),
          email: formData.get("email"),
          business: formData.get("business"),
          phone: formData.get("phone"),
          problem: formData.get("problem"),
          currentProcess: formData.get("currentProcess"),
          desiredOutcome: formData.get("desiredOutcome"),
          deploymentPreference: formData.get("deploymentPreference"),
          notes: formData.get("notes"),
          files: uploaded,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unable to submit your request.");
      }
      setDueDate(data.dueDate ?? null);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
        <h2 className="text-xl font-semibold">Request received!</h2>
        <p className="mt-2 text-black/60 dark:text-white/60">
          We&apos;ll be in touch within 1-3 business days
          {dueDate
            ? ` (by ${new Date(dueDate).toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })})`
            : ""}
          .
        </p>
      </div>
    );
  }

  const busy = status === "uploading" || status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Your name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Business / team (optional)" name="business" />
        <Field label="Phone (optional)" name="phone" type="tel" />
      </div>

      <TextArea
        label="What problem are you trying to solve?"
        name="problem"
        required
        placeholder="e.g. We track deliveries on a paper clipboard and it gets lost."
      />
      <TextArea
        label="How do you currently handle this?"
        name="currentProcess"
        required
        placeholder="Describe the current process, and upload any forms/sheets you use below."
      />
      <TextArea
        label="What would the ideal solution do?"
        name="desiredOutcome"
        placeholder="What should the finished app actually do for you?"
      />

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 text-sm font-medium">
          Should it run in the cloud, or is it just for local/one-device use?
        </legend>
        {[
          { value: "cloud", label: "Cloud — accessible online, from any device" },
          { value: "local", label: "Local — just needs to work on one computer" },
          { value: "not-sure", label: "Not sure — you decide what makes sense" },
        ].map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="deploymentPreference"
              value={opt.value}
              defaultChecked={opt.value === "not-sure"}
              className="h-4 w-4"
            />
            {opt.label}
          </label>
        ))}
      </fieldset>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Upload current paperwork (any format — PDF, Word, Excel, photos, etc.)
        </label>
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          className="block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-500"
        />
        {files.length > 0 && (
          <ul className="mt-2 text-xs text-black/60 dark:text-white/60">
            {files.map((f) => (
              <li key={f.name}>{f.name}</li>
            ))}
          </ul>
        )}
      </div>

      <TextArea label="Anything else we should know? (optional)" name="notes" />

      <div className="flex flex-col gap-2">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? progress || "Submitting..." : "Submit request"}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium">
      {label}
      <input
        type={type}
        name={name}
        required={required}
        className="rounded-lg border border-black/10 bg-transparent px-3 py-2 text-sm font-normal outline-none focus:border-indigo-500 dark:border-white/15"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium">
      {label}
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        rows={3}
        className="rounded-lg border border-black/10 bg-transparent px-3 py-2 text-sm font-normal outline-none focus:border-indigo-500 dark:border-white/15"
      />
    </label>
  );
}
