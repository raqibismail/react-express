'use client'

import api from "@/lib/api"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Users() {
    const [users, setUsers] = useState<any[]>([])
    const router = useRouter()

    useEffect(() => {
        api.get('/users').then(res => setUsers(res.data))
    }, [])

    

    return (
        <div className="p-4 text-center flex flex-col gap-2">
            <h1 className="text-3xl">Users</h1>
            {
                users.map(user => (
                    <Button key={user.id} className="shadow-sm" onClick={() => router.push(`/users/${user.id}`)}>{user.name}</Button>
                ))
            }
        </div>
    )
}