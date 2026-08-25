
import { Button } from '@radix-ui/themes'
import { SquarePen } from 'lucide-react'
import Link from 'next/link'

const EditIncidentButton = ({incidentId}: {incidentId: number}) => {
  return (
    <div>
          <Button>
              <SquarePen className='mr-2' />
              <Link href={`/incidents/${incidentId}/edit`}>Edit</Link>
          </Button>
      
    </div>
  )
}

export default EditIncidentButton
