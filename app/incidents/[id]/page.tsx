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



interface Props {
    params: Promise<{
        id: string
    }>
}
const IncidentDetailPage = async ({ params }: Props) => {
    // Ensure the user is authenticated before proceeding
    const session = await getServerSession(authOptions)

    const { id } = await params

    const incidentId = parseInt(id)
    if (!Number.isInteger(incidentId)) {
        notFound()
    }

    const incident = await prisma.incident.findUnique({
        where: {
            id: incidentId
        }
    })

    if (!incident) {
        notFound()
    }

    // await delay(200) // Simulate a delay for loading state


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
                        <EditIncidentButton incidentId={incident.id} />
                        <DeleteIncidentButton incidentId={incident.id} />
                    </Flex>
                </Box>
            )}


            
        </Grid>
    );
}

export default IncidentDetailPage
