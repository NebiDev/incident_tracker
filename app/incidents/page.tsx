

import prisma from '@/prisma/client'
import { Button, Table } from "@radix-ui/themes"
import { IncidentStatusBadge, Link } from '@/app/components'
import NextLink from 'next/link'
// import IncidentStatusBadge from '../components/incidentStatusBadge'
// import Link from '../components/Link'




const IncidentsPage = async () => {
    const incidents = await prisma.incident.findMany()



    return (
        <div>
            <div className='mb-5'>
            <Button >
                <NextLink href="/incidents/new" className='flex items-center gap-2'>
                    New Incident
                </NextLink>
            </Button>
            </div>

            <Table.Root variant='surface'>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Incident</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>

                </Table.Row>
            </Table.Header>
                <Table.Body>
                    {(await incidents).map(incident => (
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
                            <Table.Cell className='hidden md:table-cell'> {incident.createdAt.toDateString()} </Table.Cell>
                        </Table.Row>
                    ))}

                </Table.Body>


            </Table.Root>

        </div>
    )
}

export default IncidentsPage
