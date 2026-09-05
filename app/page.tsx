import IncidentChart from "./IncidentChart";
import IncidentSummary from "./IncidentSummary"
import prisma from '@/prisma/client'
import { Grid, Flex } from "@radix-ui/themes"
import LatestIncidents from "./LatestIncidents";
import type { Metadata } from 'next'

export default async function Home() {
    const [open, inProgress, closed] = await Promise.all([
        prisma.incident.count({ where: { status: "OPEN" } }),
        prisma.incident.count({ where: { status: "IN_PROGRESS" } }),
        prisma.incident.count({ where: { status: "CLOSED" } }),
    ])

    return (
        <Grid columns={{ initial: '1', md: '2' }} gap="5">
            <Flex direction="column" gap="5">
                <IncidentSummary open={open} inProgress={inProgress} closed={closed} />
                <IncidentChart open={open} inProgress={inProgress} closed={closed} />
            </Flex>
            <LatestIncidents />
        </Grid>
    );
}

export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
    title: "Incident Tracker Dashboard",
    description: "Overview of the latest incidents and their statuses.",
}