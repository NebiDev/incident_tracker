

import React from 'react'
import {Status } from '@prisma/client'
import { Badge } from "@radix-ui/themes";


const statusMap: Record<
    Status, 
    { label: string; color: 'red' | 'violet' | 'green'} 
    > = {
    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'In Progress', color: 'violet' },
    RESOLVED: { label: 'Resolved', color: 'green' },
    CLOSED: { label: 'Closed', color: 'green' },

};

const incidentStatusBadge = ({status}: {status: Status}) => {
   
  return (
    <Badge color={statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  )
}

export default incidentStatusBadge
