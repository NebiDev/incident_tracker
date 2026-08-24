import React from "react"
import { Link as RadixLink } from "@radix-ui/themes"
import NextLink from "next/link"

interface LinkProps {
    href: string
    children: React.ReactNode
    className?: string
}

const Link = ({ href, children, className }: LinkProps) => {
    return (
        <RadixLink asChild>
            <NextLink href={href} className={className}>
                {children}
            </NextLink>
        </RadixLink>
    )
}

export default Link
