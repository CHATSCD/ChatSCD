import { Made4uTierButton } from "@/components/Made4uTierButton";
import { formatMade4uPrice, made4uTiers } from "@/lib/made4u";

const steps = [
  {
    title: "Pick a tier & pay",
    body: "Choose the tier that best matches how big a job this is. Payment locks in your spot.",
  },
  {
    title: "Tell us what you need",
    body: "Answer a short questionnaire and upload whatever you're currently using — paper forms, spreadsheets, screenshots, anything.",
  },
  {
    title: "We build it",
    body: "You'll have a working app in 1-3 business days. If it turns out bigger than expected, we'll reach out before doing extra work.",
  },
];

export default function Made4uPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <section className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
          Made4U
        </span>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Got a problem? We&apos;ll build the app.
        </h1>
        <p className="mt-4 text-lg text-black/60 dark:text-white/60">
          Small, focused apps that replace a paper form, a messy spreadsheet,
          or a manual process — built specifically for how you work.
          1-3 business day turnaround.
        </p>
      </section>

      <section className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="rounded-xl border border-black/10 p-5 dark:border-white/10"
          >
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              Step {i + 1}
            </span>
            <h3 className="mt-1 font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-black/60 dark:text-white/60">
              {step.body}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight">
          Choose your tier
        </h2>
        <p className="mt-2 text-black/60 dark:text-white/60">
          Not sure which one fits? Pick your best guess — if the scope is
          different once we see your questionnaire, we&apos;ll tell you
          before doing any extra work.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {made4uTiers.map((tier) => (
            <div
              key={tier.id}
              className="flex flex-col rounded-xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-white/5"
            >
              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <p className="mt-1 text-sm text-black/60 dark:text-white/60">
                {tier.bestFor}
              </p>
              <div className="mt-4 text-3xl font-bold">
                {formatMade4uPrice(tier.priceCents, tier.currency)}
              </div>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-black/70 dark:text-white/70">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400">
                      &#10003;
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Made4uTierButton tierId={tier.id} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
