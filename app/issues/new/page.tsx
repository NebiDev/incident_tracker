
"use client";

import React from 'react'
import {TextField, TextArea, Button} from "@radix-ui/themes"

const NewIncidentpage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root placeholder="Incident Title" className='w-full' />
          <TextArea placeholder="Description" />
        <Button>Submit </Button>

      
    </div>
  )
}

export default NewIncidentpage
