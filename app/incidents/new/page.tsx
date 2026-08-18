"use client";

import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {zodResolver} from "@hookform/resolvers/zod";
import { createIncidentSchema } from "../../validationSchemas";
import {z} from "zod";
import "easymde/dist/easymde.min.css";

type IncidentForm = z.infer<typeof createIncidentSchema>;

const NewIncidentpage = () => {
  const router = useRouter();

  const { register, control, handleSubmit, formState: { errors } } = useForm<IncidentForm>({ resolver: zodResolver(createIncidentSchema) });

  return (
    <div className="max-w-xl">
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/incidents", data);

            toast.success("Incident created successfully!");

            router.push("/incidents");
          } catch (error) {
            if (axios.isAxiosError(error)) {
              const issues = error.response?.data?.errors;

              if (issues?.length) {
                issues.forEach((issue: { message: string }) => {
                  toast.error(issue.message);
                });
                return;
              }
            }

            toast.error("Failed to create incident. Please try again.");
          }
        })}
      >
        <TextField.Root
          placeholder="Incident Title"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default NewIncidentpage;