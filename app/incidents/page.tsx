import prisma from '@/prisma/client'
import { Table } from "@radix-ui/themes"
import { IncidentStatusBadge, Link } from '@/app/components'
import { Status, Incident } from '@prisma/client'
import NextLink from 'next/link'
import { ArrowUp } from 'lucide-react'

import IncidentActions from './list/IncidentActions'

interface IncidentsPageProps {
    searchParams: Promise<{
        status?: Status
        orderBy?: keyof Incident
    }>
}

const IncidentsPage = async ({ searchParams }: IncidentsPageProps) => {
    const columns: { label: string; value: keyof Incident; className?: string }[] = [
        { label: "Incident", value: "title" },
        { label: "Status", value: "status", className: 'hidden md:table-cell' },
        { label: "Created", value: "createdAt", className: 'hidden md:table-cell' },
    ]

    // 1. Await searchParams
    const resolvedSearchParams = await searchParams

    // 2. Validate status
    const statuses = Object.values(Status)
    const status = statuses.includes(resolvedSearchParams.status as Status)
        ? resolvedSearchParams.status
        : undefined

    // 3. Validate orderBy to prevent SQL injection / invalid column sorting
    const validColumns = columns.map((col) => col.value)
    const orderBy = validColumns.includes(resolvedSearchParams.orderBy as keyof Incident)
        ? { [resolvedSearchParams.orderBy!]: 'asc' }
        : undefined

    // 4. Pass both where AND orderBy to Prisma
    const incidents = await prisma.incident.findMany({
        where: { status },
        orderBy,
    })

    return (
        <div>
            <IncidentActions />

            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        {columns.map((column) => (
                            <Table.ColumnHeaderCell className={column.className} key={column.value}>
                                <NextLink
                                    href={{
                                        // Use resolvedSearchParams so active filter parameters are preserved
                                        query: { ...resolvedSearchParams, orderBy: column.value },
                                    }}
                                    className='font-medium'
                                >
                                    {column.label}
                                </NextLink>
                                {column.value === resolvedSearchParams.orderBy && (
                                    <ArrowUp className="inline ml-1 w-4 h-4" />
                                )}
                            </Table.ColumnHeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {incidents.map((incident) => (
                        <Table.Row key={incident.id}>
                            <Table.Cell>
                                <Link href={`/incidents/${incident.id}`} className='font-medium'>
                                    {incident.title}
                                </Link>
                                <div className='block md:hidden'>
                                    <IncidentStatusBadge status={incident.status} />
                                </div>
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>
                                <IncidentStatusBadge status={incident.status} />
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>
                                {incident.createdAt.toDateString()}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export const dynamic = 'force-dynamic'

export default IncidentsPage