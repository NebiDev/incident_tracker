

import React from 'react'
import { Button, Table } from "@radix-ui/themes"
import Link from 'next/link'
import prisma from '@/prisma/client'


const IncidentsPage = async () => {
    const incidents = prisma.incident.findMany()



    return (
        <div>
            <div className='mb-5'>
            <Button >
                <Link href="/incidents/new" className='flex items-center gap-2'>
                    New Incident
                </Link>
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
                                {incident.title}
                                <div className='block md:hidden'>
                                    {incident.status}

                                </div>

                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>{incident.status}  </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'> {incident.createdAt.toDateString()} </Table.Cell>
                        </Table.Row>
                    ))}

                </Table.Body>


            </Table.Root>

        </div>
    )
}

export default IncidentsPage
