
import { notFound } from 'next/navigation'
import IncidentForm from '../../_components/IncidentForm'
import prisma from '@/prisma/client'

interface EditIncidentPageProps {
    params: Promise<{
        id: string
    }>
}

const EditIncidentPage = async ({ params }: EditIncidentPageProps) => {
    const { id } = await params

    const incidentId = Number(id)

    if (!Number.isInteger(incidentId)) {
        notFound()
    }
    const incident = await prisma.incident.findUnique({
        where: {
            id: incidentId
        }
    })
    if (!incident)  notFound()





  return (
    <div>
        <IncidentForm incident={incident}/>
      
    </div>
  )
}

export default EditIncidentPage
