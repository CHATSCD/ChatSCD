import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
            N2
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Needed 2 B Developed
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-black/70 dark:text-white/70">
          <Link href="/" className="hover:text-black dark:hover:text-white">
            Shop
          </Link>
        </nav>
      </div>
    </header>
  );
}
