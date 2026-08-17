

import React from 'react'
import {Button} from "@radix-ui/themes"
import Link  from 'next/link'

const IncidentsPage = () => {
  return (
    <div>
        <h1>Incidents Page</h1>
        <Button>
            <Link href="/incidents/new" className='flex items-center gap-2'>
                New Incident
            </Link>
            

        </Button>
      
    </div>
  )
}

export default IncidentsPage
