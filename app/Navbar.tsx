"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bug } from 'lucide-react';
import {clsx} from 'clsx'
import { Box } from '@radix-ui/themes'
import {useSession} from 'next-auth/react'


const Navbar = () => {
  const pathname = usePathname()
  const { status, data: session } = useSession()


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
      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout" className="hover:text-blue-500">Sign Out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin" className="hover:text-blue-500">Sign In</Link>
        )}
      </Box>

    </nav>
  )
}

export default Navbar
