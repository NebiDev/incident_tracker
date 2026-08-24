import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Heading, Text, Flex, Card } from '@radix-ui/themes'
import IncidentStatusBadge from '../../components/incidentStatusBadge'
import ReactMarkdown from 'react-markdown'
import delay from 'delay'


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
        <div className='max-w-4xl '>
            <Heading>{incident.title}</Heading>
            <Flex gap="2" align="center" className='mb-3'>
                <IncidentStatusBadge status={incident.status} />
                <Text>{incident.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose max-w-none mt-4'>
                <ReactMarkdown>{incident.description}</ReactMarkdown>
            </Card>
            
        </div>
    )
}

export default IncidentDetailPage
