import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'


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

    return (
        <div>
            <p>{incident.title}</p>
            <p>{incident.description}</p>
            <p>{incident.status}</p>
            <p>{incident.createdAt.toDateString()}</p>
        </div>
    )
}

export default IncidentDetailPage
