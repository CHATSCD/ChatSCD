import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="grid grid-cols-1 items-start gap-10 sm:grid-cols-[1fr_280px]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
            About
          </span>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            12+ years on the retail floor.
          </h1>
          <div className="mt-6 space-y-4 text-lg text-black/70 dark:text-white/70">
            <p>
              I&apos;m Shaun Dubuisson. For over a decade I&apos;ve run
              retail and restaurant operations — general manager at Subway,
              department manager at Ollie&apos;s Bargain Outlet, sales
              leadership at Verizon Wireless, and partner running a seafood
              restaurant. Right now I coordinate food &amp; beverage
              operations across 43 locations for a regional convenience
              store chain in Mississippi and Alabama.
            </p>
            <p>
              When I started, it was a total mess — everything ran on
              paperwork and spreadsheets, no central place to see what was
              actually happening across the stores. So I started building
              the apps myself: inventory tracking, compliance checklists,
              count sheets, staff accountability — all in one place instead
              of scattered across a hundred sheets of paper.
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
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-indigo-500"
          >
            Need something built for you? &rarr;
          </Link>
        </div>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5">
          <Image
            src="/images/shaun-car.jpg"
            alt="Shaun Dubuisson"
            fill
            sizes="280px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
