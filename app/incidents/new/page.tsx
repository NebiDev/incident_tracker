"use client";
import { useState } from "react";
import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIncidentSchema } from "../../validationSchemas";
import { z } from "zod";
import "easymde/dist/easymde.min.css";
import ErrorMessage from "../../components/ErrorMessage";
import { Spinner } from "@radix-ui/themes";
import delay from "delay";


type IncidentForm = z.infer<typeof createIncidentSchema>;

const NewIncidentpage = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const { register, control, handleSubmit, formState: { errors } } = useForm<IncidentForm>({ resolver: zodResolver(createIncidentSchema) });

	const onSubmit = handleSubmit(async (data) => {
		try {
			setIsSubmitting(true);
			await axios.post("/api/incidents", data);

			toast.success("Incident created successfully!");

			router.push("/incidents");
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
			toast.error("Failed to create incident. Please try again.");
		}
	})
	return (
		<div className="max-w-xl">
			<form
				className="space-y-3"
				onSubmit={onSubmit}
			>
				<TextField.Root
					placeholder="Incident Title"
					{...register("title")}
				/>
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					name="description"
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder="Description" {...field} />
					)}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				<Button
					disabled={isSubmitting}
					type="submit">Submit Incident{isSubmitting && <Spinner />}

				</Button>
			</form>
		</div>
	);
};

export default NewIncidentpage;