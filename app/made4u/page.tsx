import { Made4uTierButton } from "@/components/Made4uTierButton";
import {
  Made4uTier,
  formatMade4uPrice,
  made4uTiers,
  trainingTiers,
} from "@/lib/made4u";

const steps = [
  {
    title: "Pick an option & pay",
    body: "Choose what best matches what you need. Payment locks in your spot.",
  },
  {
    title: "Tell us what you need",
    body: "Answer a short questionnaire and upload whatever you're currently using — paper forms, spreadsheets, screenshots, anything.",
  },
  {
    title: "We build it",
    body: "You'll have it in 1-3 business days. If it turns out bigger than expected, we'll reach out before doing extra work.",
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
          Got a problem? We&apos;ll build it for you.
        </h1>
        <p className="mt-4 text-lg text-black/60 dark:text-white/60">
          Small, focused apps and training programs, built specifically for
          how you work. 1-3 business day turnaround.
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

      <TierSection
        id="apps"
        title="Custom apps"
        blurb="Not sure which one fits? Pick your best guess — if the scope is different once we see your questionnaire, we'll tell you before doing any extra work."
        tiers={made4uTiers}
      />

      <TierSection
        id="training"
        title="Training programs"
        blurb="Built to your content and audience — workbooks, study guide, certification test, and certificate, packaged the way you need it."
        tiers={trainingTiers}
      />
    </div>
  );
}

function TierSection({
  id,
  title,
  blurb,
  tiers,
}: {
  id: string;
  title: string;
  blurb: string;
  tiers: Made4uTier[];
}) {
  return (
    <section id={id} className="mt-16 scroll-mt-20">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="mt-2 text-black/60 dark:text-white/60">{blurb}</p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {tiers.map((tier) => (
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
  );
}
