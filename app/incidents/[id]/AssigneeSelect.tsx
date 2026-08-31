'use client'

import {useState, useEffect} from "react"
import {Select} from '@radix-ui/themes'
import {User} from "@prisma/client"
import axios from "axios"

const AssigneeSelect = () => {
    const [users, setUsers] = useState<User[]>([])



    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get<User[]>("/api/users");
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []);



  return (
    <>
        <Select.Root>
            <Select.Trigger placeholder="Assignee" />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        {users.map((user) => (
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
