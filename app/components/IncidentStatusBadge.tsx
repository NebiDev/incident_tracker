// IncidentStatusBadge.tsx
import React from 'react'
import { Status } from '@/app/generated/prisma/client'
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
  Status,
  { label: string; color: 'red' | 'violet' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  RESOLVED: { label: 'Resolved', color: 'green' },
  CLOSED: { label: 'Closed', color: 'green' },
};

// ✅ Accept string type instead of Status
const IncidentStatusBadge = ({ status }: { status: string | Status }) => {
  // Cast to Status type for the lookup
  const statusKey = status as Status;

  return (
    <Badge color={statusMap[statusKey].color}>
      {statusMap[statusKey].label}
    </Badge>
  );
};

export default IncidentStatusBadge;