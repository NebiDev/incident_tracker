
"use client";


import {TextField, Button} from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor";
import {useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import "easymde/dist/easymde.min.css";


interface IncidentForm {
  title: string;
  description: string;
}

const NewIncidentpage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IncidentForm>();
  
  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async(data) => {
    await axios.post('/api/incidents', data)
    router.push('/incidents')
    })}>
        <TextField.Root placeholder="Incident Title" {...register('title')} />
      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
      />
        <Button type="submit">Submit </Button>

      
    </form>
  )
}

export default NewIncidentpage
