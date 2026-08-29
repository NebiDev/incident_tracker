'use client';
import Spinner from '@/app/components/Spinner';
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from "sonner";

const DeleteIncidentButton = ({ incidentId }: { incidentId: number }) => {
    const [error, setError] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter();

    const deleteIncident = async () => {
        try {
            setIsDeleting(true);
            await axios.delete(`/api/incidents/${incidentId}`);
            toast.success("Incident deleted successfully");
            router.push('/incidents');
            // router.refresh();
        } catch (error) {
            setError(true);
            setIsDeleting(false);
            console.error(error);
            toast.error("Failed to delete incident. Please try again.");
        }
    }


    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger >
                    <Button
                        disabled={isDeleting}
                        color="red"
                        size="2"
                        className="w-full whitespace-nowrap sm:w-auto"
                    >
                        Delete Incident
                        {isDeleting && <Spinner />}
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Are you sure?</AlertDialog.Title>
                    <AlertDialog.Description>
                        This action cannot be undone. This will permanently delete the incident.
                    </AlertDialog.Description>
                    <Flex gap="3" justify="end" className="mt-6">
                        <AlertDialog.Cancel className="mt-2">
                            <Button variant="soft">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>


                        <AlertDialog.Action>
                            <Button color="red" onClick={ deleteIncident }
                            >
                                Delete
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>
                        This incident could not be deleted. Please try again later.
                        </AlertDialog.Description>
                        <Flex gap="3" justify="end" className="mt-6">
                            <AlertDialog.Cancel className="mt-2">
                                <Button variant="soft" onClick={() => setError(false)}>
                                    Close
                                </Button>
                            </AlertDialog.Cancel>
                        </Flex>
                </AlertDialog.Content>

            </AlertDialog.Root>
        </>


    );
};

export default DeleteIncidentButton;
