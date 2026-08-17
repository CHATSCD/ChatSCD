import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 sm:grid-cols-[1fr_320px] sm:py-20">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
            12+ years on the retail floor
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            I build the tools I always wished I had.
          </h1>
          <div className="mt-5 space-y-4 text-lg text-black/70 dark:text-white/70">
            <p>
              I&apos;m Shaun Dubuisson. For over a decade I&apos;ve run retail
              and restaurant operations — general manager at Subway,
              department manager at Ollie&apos;s Bargain Outlet, sales
              leadership at Verizon Wireless, and partner running a seafood
              restaurant. Right now I coordinate food &amp; beverage
              operations across 43 store locations in Mississippi and
              Alabama for Keith&apos;s Superstore: inventory, compliance
              audits, count sheets, staff accountability — all at once,
              across dozens of locations.
            </p>
            <p>
              Every app in this store started the same way: a real problem I
              ran into on the floor, with no good tool to fix it — so I
              built one myself. Now I build them for other people running
              the same kind of operation.
            </p>
          </div>
          <Link
            href="/made4u"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-indigo-500"
          >
            Need something built for you? &rarr;
          </Link>
        </div>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5">
          <Image
            src="/images/shaun-suit.jpg"
            alt="Shaun Dubuisson"
            fill
            sizes="320px"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
