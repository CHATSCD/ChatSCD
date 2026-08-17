export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-black/60 dark:text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} Needed 2 B Developed App Store.
          All rights reserved.
        </p>
        <p>Secure checkout powered by Stripe.</p>
      </div>
    </footer>
  );
}
