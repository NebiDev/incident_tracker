
"use client";


import {TextField, Button} from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIncidentpage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root placeholder="Incident Title" className='w-full' />
      <SimpleMDE placeholder="Description" />
        <Button>Submit </Button>

      
    </div>
  )
}

export default NewIncidentpage
