import { Grid, Card, Flex, Text } from "@radix-ui/themes"
import { Status } from "@prisma/client"
import Link from 'next/link'
import { CircleAlert, Clock3, CircleCheck, Layers } from "lucide-react"

interface Props {
    open: number
    inProgress: number
    closed: number
}

interface SummaryContainer {
    label: string
    value: number
    status?: Status
    href: string
    icon: React.ReactNode
}

const IncidentSummary = ({ open, inProgress, closed }: Props) => {
    const containers: SummaryContainer[] = [
        {
            label: "Open Incidents",
            value: open,
            status: "OPEN",
            href: "/incidents?status=OPEN",
            icon: <CircleAlert className="w-5 h-5 text-red-500" />,
        },
        {
            label: "In Progress Incidents",
            value: inProgress,
            status: "IN_PROGRESS",
            href: "/incidents?status=IN_PROGRESS",
            icon: <Clock3 className="w-5 h-5 text-violet-500" />,
        },
        {
            label: "Closed Incidents",
            value: closed,
            status: "CLOSED",
            href: "/incidents?status=CLOSED",
            icon: <CircleCheck className="w-5 h-5 text-green-500" />,
        },
        {
            label: "Total Incidents",
            value: open + inProgress + closed,
            href: "/incidents", // Corrected link to show all incidents
            icon: <Layers className="w-5 h-5 text-blue-500" />,
        },
    ]

    return (
        // Grid ensures cards wrap cleanly on mobile (2 cols) and desktop (4 cols)
        <Grid columns={{ initial: '2', sm: '4' }} gap="3">
            {containers.map((container) => (
                <Card key={container.label}>
                    <Flex direction="column" gap="1">
                        <Flex align="center" justify="between">
                            <Link
                                className="font-medium text-xs sm:text-sm text-slate-600 hover:underline"
                                href={container.href}
                            >
                                {container.label}
                            </Link>
                            {container.icon}
                        </Flex>

                        <Text size="6" className="font-bold mt-1">
                            {container.value}
                        </Text>
                    </Flex>
                </Card>
            ))}
        </Grid>
    )
}

export default IncidentSummary