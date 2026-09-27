import { SiteNav } from "./SiteNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#f7f4ef]/90 backdrop-blur-md">
      <SiteNav />
    </header>
  );
}
