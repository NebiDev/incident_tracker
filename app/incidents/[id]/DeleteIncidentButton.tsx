// 'use client';
import { Button, AlertDialog, Flex } from "@radix-ui/themes";
import { Trash2 } from "lucide-react";
import Link from "next/link";

const DeleteIncidentButton = ({ incidentId }: { incidentId: number }) => {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger >
                <Button
                    
                    color="red"
                    size="2"
                    className="w-full whitespace-nowrap sm:w-auto"
                >
                    Delete Incident
                    {/* <Link href={`/incidents/${incidentId}/delete`}>
                        <Trash2 size={16} />
                        Delete Incident
                    </Link> */}
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
                    <Button color="red">
                        Delete
                    </Button>
                </AlertDialog.Action>
                </Flex>
                </AlertDialog.Content> 
            </AlertDialog.Root>


    );
};

export default DeleteIncidentButton;
