import prisma from '@/prisma/client'
import { Table } from "@radix-ui/themes"
import { IncidentStatusBadge, Link } from '@/app/components'
import { Status } from '@prisma/client'

import IncidentActions from './list/IncidentActions'

interface IncidentsPageProps {
    searchParams: Promise<{
        status?: Status
    }>
}

const IncidentsPage = async ({
    searchParams,
}: IncidentsPageProps) => {
    // 1. Await searchParams
    const resolvedSearchParams = await searchParams;

    // 2. Validate if the searchParam status is a valid Status enum value
    const statuses = Object.values(Status);
    const status = statuses.includes(resolvedSearchParams.status as Status)
        ? resolvedSearchParams.status
        : undefined;

    // 3. Query Prisma with validated status
    const incidents = await prisma.incident.findMany({
        where: {
            status,
        },
    });

    return (
        <div>
            <IncidentActions />

            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Incident</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {/* Note: no need for await inside incidents.map() */}
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
    );
};

export const dynamic = 'force-dynamic';

export default IncidentsPage;