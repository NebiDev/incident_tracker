import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Grid, Box, Flex } from '@radix-ui/themes'
// import delay from 'delay'
import EditIncidentButton from './EditIncidentButton'
import IncidentDetails from './IncidentDetails'
import DeleteIncidentButton from './DeleteIncidentButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'
import type { Metadata } from 'next'
import { cache } from 'react'


interface Props {
    params: Promise<{
        id: string
    }>
}
const fetchIncident = cache((incidentId: number) => prisma.incident.findUnique({
    where: {
        id: incidentId
    }
})  )


const IncidentDetailPage = async ({ params }: Props) => {
    // Ensure the user is authenticated before proceeding
    const session = await getServerSession(authOptions)
    const { id } = await params
    const incidentId = parseInt(id)
    if (!Number.isInteger(incidentId)) {
        notFound()
    }
    const incident = await fetchIncident(incidentId)
    if (!incident) {
        notFound()
    }

    return (
        <Grid
            columns={{ initial: "1", sm: "minmax(0, 1fr) auto" }}
            gap="5"
            align="start"
        >
            <Box>
                <IncidentDetails incident={incident} />
            </Box>
            {session && (
                <Box>
                    <Flex direction="column" gap="4">
                        <AssigneeSelect incident={incident} />
                        <EditIncidentButton incidentId={incident.id} />
                        <DeleteIncidentButton incidentId={incident.id} />
                    </Flex>
                </Box>
            )}
           
        </Grid>
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const incidentId = parseInt(id)
    if (!Number.isInteger(incidentId)) {
        return {
            title: "Incident Not Found",
            description: "The requested incident does not exist."
        }
    }
    const incident = await fetchIncident(incidentId)
    if (!incident) {
        return {
            title: "Incident Not Found",
            description: "The requested incident does not exist."
        }
    }
    return {
        title: incident.title,
        description: `Details for incident #${incident.id}.`
    }
}
export default IncidentDetailPage
