import { list } from "@vercel/blob";
import { formatMade4uPrice } from "@/lib/made4u";

export const dynamic = "force-dynamic";

type Submission = {
  sessionId: string;
  tier: string | null;
  tierName: string | null;
  pricePaidCents: number | null;
  currency: string;
  submittedAt: string;
  dueDate: string;
  contact: {
    name: string;
    email: string;
    business: string | null;
    phone: string | null;
  };
  problem: string;
  currentProcess: string;
  desiredOutcome: string | null;
  deploymentPreference: string;
  notes: string | null;
  files: { name: string; url: string; size: number }[];
};

async function loadSubmissions(): Promise<Submission[] | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return null;
  }

  const { blobs } = await list({ prefix: "made4u/" });
  const metadataBlobs = blobs.filter((blob) => {
    const filename = blob.pathname.split("/").pop() ?? "";
    return filename.startsWith("metadata");
  });

  const submissions = await Promise.all(
    metadataBlobs.map(async (blob) => {
      const res = await fetch(blob.url, { cache: "no-store" });
      return (await res.json()) as Submission;
    })
  );

  return submissions.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
}

export default async function Made4uAdminPage() {
  const submissions = await loadSubmissions();

  if (submissions === null) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-2xl font-bold">Blob storage not configured</h1>
        <p className="mt-3 text-black/60 dark:text-white/60">
          Add a Blob store to this Vercel project (Storage tab &rarr; Create
          Database &rarr; Blob) so BLOB_READ_WRITE_TOKEN is set, then
          redeploy to see Made4U submissions here.
        </p>
      </div>
    );
  }

  // Page is force-dynamic (rendered fresh per request), so reading the
  // current time here is intentional, not a stale-render hazard.
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Made4U requests</h1>
      <p className="mt-2 text-black/60 dark:text-white/60">
        {submissions.length} submission{submissions.length === 1 ? "" : "s"}
      </p>

      {submissions.length === 0 && (
        <p className="mt-8 text-black/60 dark:text-white/60">
          No requests yet.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-6">
        {submissions.map((sub) => {
          const overdue = new Date(sub.dueDate).getTime() < now;
          return (
            <div
              key={sub.sessionId}
              className="rounded-xl border border-black/10 p-6 dark:border-white/10"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold">
                    {sub.contact.name}{" "}
                    <span className="font-normal text-black/50 dark:text-white/50">
                      &lt;{sub.contact.email}&gt;
                    </span>
                  </h2>
                  {sub.contact.business && (
                    <p className="text-sm text-black/60 dark:text-white/60">
                      {sub.contact.business}
                      {sub.contact.phone ? ` · ${sub.contact.phone}` : ""}
                    </p>
                  )}
                </div>
                <div className="text-right text-sm">
                  <div className="font-semibold">
                    {sub.tierName ?? sub.tier ?? "Unknown tier"}
                    {sub.pricePaidCents != null &&
                      ` · ${formatMade4uPrice(sub.pricePaidCents, sub.currency)}`}
                  </div>
                  <div
                    className={
                      overdue
                        ? "font-medium text-red-600 dark:text-red-400"
                        : "text-black/60 dark:text-white/60"
                    }
                  >
                    Due {new Date(sub.dueDate).toLocaleDateString()}
                    {overdue ? " (overdue)" : ""}
                  </div>
                </div>
              </div>

              <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <Detail label="Problem" value={sub.problem} />
                <Detail label="Current process" value={sub.currentProcess} />
                {sub.desiredOutcome && (
                  <Detail label="Desired outcome" value={sub.desiredOutcome} />
                )}
                <Detail
                  label="Deployment"
                  value={
                    sub.deploymentPreference === "cloud"
                      ? "Cloud / online"
                      : sub.deploymentPreference === "local"
                      ? "Local / one device"
                      : "Not sure"
                  }
                />
                {sub.notes && <Detail label="Notes" value={sub.notes} />}
              </dl>

              {sub.files.length > 0 && (
                <div className="mt-4">
                  <span className="text-sm font-medium">
                    Uploaded paperwork
                  </span>
                  <ul className="mt-1 flex flex-wrap gap-3 text-sm">
                    {sub.files.map((file) => (
                      <li key={file.url}>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline dark:text-indigo-400"
                        >
                          {file.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="mt-4 text-xs text-black/40 dark:text-white/40">
                Submitted {new Date(sub.submittedAt).toLocaleString()} ·
                Session {sub.sessionId}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-black/40 dark:text-white/40">
        {label}
      </dt>
      <dd className="mt-0.5 whitespace-pre-wrap text-black/80 dark:text-white/80">
        {value}
      </dd>
    </div>
  );
}
