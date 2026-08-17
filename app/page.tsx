import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

const stats = [
  { value: "12+ years", label: "running retail & restaurant operations" },
  { value: "43 locations", label: "currently rely on tools I built" },
  { value: "1–3 days", label: "turnaround on custom builds" },
];

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

const offers = [
  {
    name: "Custom Apps",
    startingAt: "Starting at $149",
    body: "A small, focused app built to replace exactly the paper form or spreadsheet that's slowing your team down.",
    bullets: [
      "Replaces a paper process or spreadsheet",
      "Built around how you actually work",
      "1-3 business day turnaround",
    ],
    cta: "See app options",
    href: "/made4u#apps",
  },
  {
    name: "Training Programs",
    startingAt: "Starting at $249",
    body: "A complete training package — or a self-paced course — built around your content and your audience.",
    bullets: [
      "Workbooks, study guide, certification test",
      "Certificate of Completion template",
      "1-3 business day turnaround",
    ],
    cta: "See training options",
    href: "/made4u#training",
  },
];

const faqs = [
  {
    q: "How fast will I actually get something?",
    a: "1-3 business days after you pay and fill out the short questionnaire.",
  },
  {
    q: "What if my project is bigger than I thought?",
    a: "I'll tell you before doing any extra work — no surprise charges.",
  },
  {
    q: "Do I need to know exactly what I want built?",
    a: "No. Just describe the problem you're running into — I'll figure out the right solution.",
  },
  {
    q: "What's the difference between apps and training programs?",
    a: "Apps solve an operational problem — tracking, compliance, reporting. Training programs teach and certify people, with workbooks, tests, and certificates.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
            Apps &amp; training built for retail &amp; restaurant ops
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Stop running your stores on paperwork.
          </h1>
          <p className="mt-5 text-lg text-black/70 dark:text-white/70">
            Small, focused apps and training programs for retail and
            restaurant operations — built by someone who&apos;s actually run
            the floor. Tell me what&apos;s broken, get a working tool in 1-3
            business days.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/made4u#apps"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-indigo-500"
            >
              Get Your App Built &rarr;
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Read my story &rarr;
            </Link>
          </div>
        </div>
        <div className="border-t border-black/10 dark:border-white/10">
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="mt-1 text-sm text-black/60 dark:text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <section>
          <h2 className="text-center text-2xl font-bold tracking-tight">
            How it works
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            What I offer
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {offers.map((offer) => (
              <div
                key={offer.name}
                className="flex flex-col rounded-xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="text-xl font-semibold">{offer.name}</h3>
                <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {offer.startingAt}
                </p>
                <p className="mt-3 text-black/70 dark:text-white/70">
                  {offer.body}
                </p>
                <ul className="mt-4 flex-1 space-y-2 text-sm text-black/70 dark:text-white/70">
                  {offer.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="text-indigo-600 dark:text-indigo-400">
                        &#10003;
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={offer.href}
                  className="mt-6 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-indigo-500"
                >
                  {offer.cta} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>

        {products.length > 0 && (
          <section className="mt-20">
            <h2 className="text-center text-2xl font-bold tracking-tight">
              Ready-made tools
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-black/60 dark:text-white/60">
              Buy now, download instantly — no questionnaire, no wait.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Questions
          </h2>
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-semibold">{faq.q}</h3>
                <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-2xl bg-indigo-600 px-6 py-14 text-center text-white">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Got a problem? Let&apos;s fix it.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-indigo-100">
            Pick an option, pay, and tell me what you need. You&apos;ll have
            a working tool in 1-3 business days.
          </p>
          <Link
            href="/made4u#apps"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-indigo-600 transition hover:bg-indigo-50"
          >
            Get Your App Built &rarr;
          </Link>
        </section>
      </div>
    </div>
  );
}
