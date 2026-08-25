import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Grid, Box } from '@radix-ui/themes'
import delay from 'delay'
import EditIncidentButton from './EditIncidentButton'
import IncidentDetails from './IncidentDetails'



interface Props {
    params: Promise<{
        id: string
    }>
}
const IncidentDetailPage = async ({ params }: Props) => {
    
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

    await delay(200) // Simulate a delay for loading state


    return (
        <Grid columns={{initial: '1', md:'2'} } className='max-w-4xl gap-4'>
            <Box>
                <IncidentDetails incident={incident} />
            
            </Box>
            <Box>
                <EditIncidentButton incidentId={incident.id} />
                
            </Box>            
        </Grid>
    )
}

export default IncidentDetailPage
