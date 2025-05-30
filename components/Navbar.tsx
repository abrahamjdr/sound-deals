import Link from "next/link";
import ToggleTheme from "@/components/ToggleTheme";

export default function Navbar() {
  return (
    <nav className="bg-light-nav dark:bg-dark-nav text-light-text dark:text-dark-text px-6 py-4 flex justify-between items-center shadow border-b border-light-border dark:border-dark-border">
      <a className="text-xl font-bold tracking-wide" href="/">
        Sound Deals
      </a>
      <ul className="flex items-center space-x-6">
        <li>
          <Link href="/products">Productos</Link>
        </li>
        <li>
          <Link href="/cotizar">Cotizar</Link>
        </li>
      </ul>
    </nav>
  );
}
