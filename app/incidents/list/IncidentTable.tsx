import React from 'react'
import { Table } from "@radix-ui/themes"
import { IncidentStatusBadge, Link } from '@/app/components'
import NextLink from 'next/link'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { Status, Incident } from '@prisma/client'

// 1. explicitly define sortable columns
export type SortableColumn = 'title' | 'status' | 'createdAt'

export interface SearchParamsProps {
    status?: Status
    orderBy?: keyof Incident
    sortOrder?: 'asc' | 'desc'
    page?: string
}

interface IncidentTableProps {
    incidents: Incident[]
    resolvedSearchParams: SearchParamsProps
}

const IncidentTable = ({ incidents, resolvedSearchParams }: IncidentTableProps) => {
    return (
        <Table.Root variant='surface'>
            <Table.Header>
                <Table.Row>
                    {columns.map((column) => {
                        const isSorted = column.value === resolvedSearchParams.orderBy;
                        const currentOrder = resolvedSearchParams.sortOrder || 'asc';

                        // Toggle logic: if already active column & 'asc', next click is 'desc'
                        const nextSortOrder = 
                               isSorted && currentOrder === 'asc' ? 'desc' : 'asc';

                        // Omit 'page' from query so sorting resets to Page 1
                        const { page, ...otherParams } = resolvedSearchParams;

                        return (
                            <Table.ColumnHeaderCell className={column.className} key={column.value}>
                                <NextLink
                                    href={{
                                        query: {
                                            ...otherParams,
                                            orderBy: column.value,
                                            sortOrder: nextSortOrder,
                                        },
                                    }}
                                    className='font-medium'
                                >
                                    {column.label}
                                </NextLink>

                                {isSorted && (
                                    currentOrder === 'asc' ? (
                                        <ArrowUp className="inline ml-1 w-4 h-4" />
                                    ) : (
                                        <ArrowDown className="inline ml-1 w-4 h-4" />
                                    )
                                )}
                            </Table.ColumnHeaderCell>
                        );
                    })}
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
    )
}
// 2. Type value with SortableColumn

const columns: { label: string; value: SortableColumn; className?: string }[] = [
    { label: "Incident", value: "title" },
    { label: "Status", value: "status", className: 'hidden md:table-cell' },
    { label: "Created", value: "createdAt", className: 'hidden md:table-cell' },
]

export const columnNames = columns.map((col) => col.value)

export default IncidentTable