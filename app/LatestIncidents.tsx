import prisma from '@/prisma/client'
import { Avatar, Table, Flex, Card, Heading } from "@radix-ui/themes"
import { IncidentStatusBadge } from './components'
import Link from 'next/link'


const LatestIncidents = async () => {
    const incidents = await prisma.incident.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { assignedToUser: true },
    })

    return (
        <Card>
            <Heading size="4" mb="5">Latest Incidents</Heading>
        <Table.Root>
            <Table.Body>
                {incidents.map((incident) => (
                    <Table.Row key={incident.id}>
                        <Table.Cell>
                            <Flex justify="between">
                                <Flex direction="column" align="start" gap="2">
                                    <Link href={`/incidents/${incident.id}`}>
                                        {incident.title}
                                    </Link>

                                    <IncidentStatusBadge
                                        status={incident.status}
                                    />
                                </Flex>

                                {incident.assignedToUser && (
                                    <Avatar
                                        src={incident.assignedToUser.image ?? undefined}
                                        alt={incident.assignedToUser.name ?? "Assigned user"}
                                        size='2'
                                        radius='full'
                                        fallback={
                                            incident.assignedToUser.name?.[0] ?? "?"
                                        }
                                    />
                                )}
                            </Flex>
                        </Table.Cell>

                        {/* <Table.Cell>
                            {incident.description}
                        </Table.Cell>

                        <Table.Cell>
                            {incident.createdAt.toISOString()}
                        </Table.Cell> */}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
        </Card>
    )
}

export default LatestIncidents