"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bug } from 'lucide-react';
import { clsx } from 'clsx'
import { Box, Flex, Container, DropdownMenu, Avatar, Text } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'


const Navbar = () => {
    const pathname = usePathname()
    const { status, data: session } = useSession()


    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Incidents", href: "/incidents" },
    ];
    return (
        <nav className=" border-b mb-4 px-5 py-3 ">
           
            <Flex justify="between" >
                <Flex align="center" gap='3'><Link href="/"><Bug /></Link>
                    <ul className="flex space-x-6 ">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className={clsx("hover:text-blue-500", pathname === link.href && "text-blue-500")}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Flex>
                <Box>
                    {status === "authenticated" && (
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger >
                                <Avatar 
                                src={session.user?.image!} 
                                fallback={session.user?.name?.[0] ?? "U"}
                                size="2"
                                radius="full" 
                                className="cursor-pointer"
                                />
                                {/* <button className="hover:text-blue-500">{session.user?.name}</button> */}
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                <DropdownMenu.Label>
                                    <Text size="2" weight="medium">
                                        {session.user?.name}
                                    </Text>
                                </DropdownMenu.Label>
                                <DropdownMenu.Item>
                                    <Link href="/api/auth/signout" >Sign Out</Link>
                                </DropdownMenu.Item>

                            </DropdownMenu.Content> 

                        </DropdownMenu.Root>
                        // <Link href="/api/auth/signout" className="hover:text-blue-500">Sign Out</Link>
                    )}
                    {status === "unauthenticated" && (
                        <Link href="/api/auth/signin" className="hover:text-blue-500">Sign In</Link>
                    )}
                </Box>
            </Flex>
            



        </nav>
    )
}

export default Navbar
