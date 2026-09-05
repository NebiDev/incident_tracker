import prisma from '@/prisma/client'
import { Flex } from "@radix-ui/themes"
import IncidentTable, { SearchParamsProps, SortableColumn,  columnNames } from './list/IncidentTable'
import { Status, Incident } from '@prisma/client'
import IncidentActions from './list/IncidentActions'
import Pagination from './_components/Pagination'

interface IncidentsPageProps {
    searchParams: Promise<{
        status?: Status
        orderBy?: SortableColumn
        sortOrder?: 'asc' | 'desc'
        page?: string
    }>
}

const IncidentsPage = async ({ searchParams }: IncidentsPageProps) => {
    // 1. Await searchParams
    const resolvedSearchParams = await searchParams

    // 2. Validate status
    const statuses = Object.values(Status)
    const status = statuses.includes(resolvedSearchParams.status as Status)
        ? resolvedSearchParams.status
        : undefined

    // 3. Validate orderBy column and sort direction
    const validColumns = columnNames
    const validOrders = ['asc', 'desc']

    const orderByColumn = validColumns.includes(resolvedSearchParams.orderBy as SortableColumn)
        ? resolvedSearchParams.orderBy
        : undefined

    const sortOrder = validOrders.includes(resolvedSearchParams.sortOrder || '')
        ? (resolvedSearchParams.sortOrder as 'asc' | 'desc')
        : 'asc'

    const orderBy = orderByColumn ? { [orderByColumn]: sortOrder } : undefined

    // 4. Parse & calculate pagination params
    const page = parseInt(resolvedSearchParams.page || '1') || 1
    const pageSize = 10

    const where = status ? { status } : {}

    // 5. Concurrent DB fetch
    const [incidents, itemCount] = await Promise.all([
        prisma.incident.findMany({
            where,
            orderBy,
            skip: (page - 1) * pageSize,
            take: pageSize,
        }),
        prisma.incident.count({ where }),
    ])

    return (
        <Flex direction="column" gap="3">
            <IncidentActions />
            <IncidentTable incidents={incidents} resolvedSearchParams={resolvedSearchParams} />

            <Pagination
                itemCount={itemCount}
                pageSize={pageSize}
                currentPage={page}
            />
        </Flex>
    )
}

export const dynamic = 'force-dynamic'

export default IncidentsPage