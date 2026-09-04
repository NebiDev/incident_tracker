'use client'
import { Status } from "@prisma/client"
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

const statuses: { label: string; value?: Status | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
]

const IncidentStatusFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <Select.Root
      defaultValue={searchParams.get('status') || 'ALL'}
      onValueChange={(status) => {
        const params = new URLSearchParams(searchParams.toString())

        if (status && status !== 'ALL') {
          params.set('status', status)
        } else {
          params.delete('status')
        }

        const query = params.toString() ? `?${params.toString()}` : ''
        router.push(`/incidents${query}`)
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || "ALL"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IncidentStatusFilter































// 'use client'
// import { Status } from "@prisma/client"
// import { Select } from '@radix-ui/themes'
// import { useRouter } from 'next/navigation'

// const statuses: {label: string, value?: Status |"All"}[] = [
//     { label: "All", value: "All" },
//     { label: "Open", value: "OPEN" },
//     { label: "In Progress", value: "IN_PROGRESS" },
//     { label: "Closed", value: "CLOSED" },
// ]

// const IncidentStatusFilter = () => {
//   const router = useRouter()
//   return (
//     <>
//     <Select.Root onValueChange={(status) => {
//       const query = status ? `?status=${status}` : ""
//       router.push(`/incidents${query}`)
//     }}>
//         <Select.Trigger placeholder="Filter by status..." />
//           <Select.Content>
//             {statuses.map((status) => (
//                 <Select.Item key={status.label} value={status.value ?? ""}>
//                     {status.label}
//                 </Select.Item>
//             ))}

//         </Select.Content>


//     </Select.Root>
      
//     </>
//   )
// }

// export default IncidentStatusFilter
