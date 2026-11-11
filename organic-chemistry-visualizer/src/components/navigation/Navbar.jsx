import ThemeToggle from "../theme/ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/50 bg-white/45 backdrop-blur-xl dark:border-white/10 dark:bg-[#06111f]/42">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-start px-4 pr-36 sm:px-6 sm:pr-48 lg:px-8">
        <ThemeToggle />
      </nav>
    </header>
  );
}
