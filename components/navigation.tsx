"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const path = usePathname();
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            home {path === "/" ? "🍄" : ""}
          </Link>
        </li>
        <li>
          <Link href="/rank">
            ranking {path === "/rank" ? "🍄" : ""}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
