"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";


const Navigation = () => {


  const fetch = async () => {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + "/v1/id?character_name=" + "빵빵한은수", {
      headers: {
        "x-nxopen-api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    });
    console.log(res);
  };

  useEffect(() => {
    fetch();
  }, []);

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
