"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bug } from 'lucide-react';
import { clsx } from 'clsx'
import { Box, Flex,  DropdownMenu, Avatar, Text } from '@radix-ui/themes'
import { useSession, signOut } from 'next-auth/react'


const Navbar = () => {

    return (
        <nav className=" border-b mb-4 px-5 py-3 ">

            <Flex justify="between" >
                <Flex align="center" gap='3'>
                    <Link href="/"><Bug size={20} /></Link>
                    {/* <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Bug size={20} />
                        <span>Incident Tracker</span>
                    </Link> */}
                    <NavLinks/>


                </Flex>
                <AuthStatus />


            </Flex>




        </nav>
    )
}

const NavLinks = () => {
    const pathname = usePathname()
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Incidents", href: "/incidents" },
    ];


    return (
        <ul className="flex space-x-6 ">
            {links.map((link) => (
                <li key={link.href}>
                    <Link 
                        href={link.href}
                        className={clsx({
                            "nav-link": true,
                            "text-blue-500": link.href === pathname,
                        })}
                        
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

const AuthStatus = () => {
    const { status, data: session } = useSession()

    if (status === "loading") return null;
    if (status === "unauthenticated") 
    return <Link href="/api/auth/signin" className="hover:text-blue-500">Sign In</Link>



    return (
        <Box>
            
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger >
                        <Avatar
                            src={session!.user!.image!}
                            fallback="?"
                            size="2"
                            radius="full"
                            className="cursor-pointer"
                        />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Label>
                            <Text size="2" weight="medium">
                                {session!.user?.name}
                            </Text>
                        </DropdownMenu.Label>
                    <DropdownMenu.Item onClick={() => signOut()}>
                            {/* <Link href="/api/auth/signout" >Sign Out</Link> */}
                        Sign Out
                        </DropdownMenu.Item>


                    </DropdownMenu.Content>

                </DropdownMenu.Root>
       
            
        </Box>
    )
}

export default Navbar
