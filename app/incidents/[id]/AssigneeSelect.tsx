'use client'

// import {useState, useEffect} from "react"
import {Select} from '@radix-ui/themes'
import {User} from "@prisma/client"
import axios from "axios"
import {useQuery} from "@tanstack/react-query"
import Skeleton from "react-loading-skeleton"

const AssigneeSelect = () => {

    const {data: users = [], isLoading, error} = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await axios.get<User[]>("/api/users");
            return data;
            
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 3, // Retry failed requests up to 3 times
    });

    if (isLoading) return <Skeleton count={1} height={40} width={200} />
    if (error) return <div>Error loading users</div>




  return (
    <>
        <Select.Root>
            <Select.Trigger placeholder="Assignee" />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        {users?.map((user) => (
                            <Select.Item key={user.id} value={user.id.toString()}>
                                {user.name}
                            </Select.Item>
                        ))}
                    </Select.Group>

                </Select.Content>
            
        </Select.Root>
      
    </>
  )
}

export default AssigneeSelect
