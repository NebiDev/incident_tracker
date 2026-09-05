import { Flex, Card, Text } from "@radix-ui/themes"
import { Status } from "@prisma/client"
import Link from 'next/link'

interface Props {
    open: number
    inProgress: number
    closed: number
}

const IncidentSummary = ({ open, inProgress, closed }: Props) => {

    const containers: {
        label: string
        value: number
        status: Status
    }[] = [
            {
                label: "Open Incidents",
                value: open,
                status: "OPEN"
            },
            {
                label: "In Progress Incidents",
                value: inProgress,
                status: "IN_PROGRESS"
            },
            {
                label: "Closed Incidents",
                value: closed,
                status: "CLOSED"
            },
        ]

    return (
        <Flex gap="4">
            {containers.map((container) => (
                <Card key={container.label}>
                    <Flex direction="column" gap="2">
                        <Link
                            className="font-medium text-sm" 
                            href={`/incidents?status=${container.status}`}>
                            {container.label}
                        </Link>

                        <Text size="5" className="font-bold">
                            {container.value}
                        </Text>
                    </Flex>
                </Card>
            ))}
        </Flex>
    )
}

export default IncidentSummary