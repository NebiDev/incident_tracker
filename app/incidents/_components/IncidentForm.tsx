"use client";
import { useState } from "react";
import { TextField, Button } from "@radix-ui/themes";
// import SimpleMDE from "react-simplemde-editor";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { incidentSchema } from "../../validationSchemas";
import { z } from "zod";
import "easymde/dist/easymde.min.css";
import ErrorMessage from "../../components/ErrorMessage";
import { Spinner } from "@radix-ui/themes";
import { Incident } from "@/app/generated/prisma/client";
// import delay from "delay";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });


type IncidentFormData = z.infer<typeof incidentSchema>;



const IncidentForm = ({ incident }: { incident?: Incident }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const { register, control, handleSubmit, formState: { errors } } = useForm<IncidentFormData>({
        resolver: zodResolver(incidentSchema),
        defaultValues: {
            title: incident?.title ?? "",
            description: incident?.description ?? "",
        }
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            if (incident) {
                await axios.patch(`/api/incidents/${incident.id}`, data);

                toast.success("Incident updated successfully!");

            } else {
            await axios.post("/api/incidents", data);

            toast.success("Incident created successfully!");

            }
            router.push("/incidents");
            // router.refresh();
        } catch (error) {
            setIsSubmitting(false);
            if (axios.isAxiosError(error)) {
                const issues = error.response?.data?.errors;

                if (issues?.length) {
                    issues.forEach((issue: { message: string }) => {
                        toast.error(issue.message);
                    });
                    return;
                }
            }
            toast.error(
                incident
                    ? "Failed to update incident. Please try again."
                    : "Failed to create incident. Please try again."
            );
        }
        });
    return (
        <div className="max-w-4xl">
            <form
                className="space-y-3"
                onSubmit={onSubmit}
            >
                <TextField.Root
                    // defaultValue={incident?.title || ""}
                    placeholder="Incident Title"
                    {...register("title")}
                />
                <ErrorMessage >{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    // defaultValue={incident?.description || ""}
                    render={({ field }) => (
                        <SimpleMDE placeholder="Description" {...field} />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button
                    disabled={isSubmitting}
                    type="submit">
                        {incident ? "Update Incident" : "Create Incident"}{isSubmitting && <Spinner />}

                </Button>
            </form>
        </div>
    );
};

export default IncidentForm;