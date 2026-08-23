"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bug } from 'lucide-react';
import {clsx} from 'clsx'


const Navbar = () => {
  const pathname = usePathname()


  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Incidents", href: "/incidents" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-4 px-5 h-14 items-center">
      <Link href="/"><Bug /></Link>
      <ul className="flex space-x-6 ">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={clsx("hover:text-blue-500", pathname === link.href && "text-blue-500")}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

    </nav>
  )
}

export default Navbar
