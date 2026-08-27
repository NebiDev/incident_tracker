import { Button } from "@radix-ui/themes";
import { SquarePen } from "lucide-react";
import Link from "next/link";

const EditIncidentButton = ({ incidentId }: { incidentId: number }) => {
  return (
    <Button
      asChild
      size="2"
      className="w-full whitespace-nowrap sm:w-auto"
    >
      <Link href={`/incidents/${incidentId}/edit`}>
        <SquarePen size={16} />
        Edit Incident
      </Link>
    </Button>
  );
};

export default EditIncidentButton;