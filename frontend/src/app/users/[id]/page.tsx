'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import api from "@/lib/api"
import { Post, User as UserModel } from "@/lib/model"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function User() {
    const { id } = useParams()
    const [user, setUser] = useState<UserModel>()
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return
        try {
            const fetchData = async () => {
                await api.get(`/users/${id}`).then(res => {
                    setUser(res.data)
                    setLoading(false)
                })
            }

            fetchData()
        } catch (error) {
            throw new Error("Data not fount")
        }
    }, [id])

    if (loading) return <p className="p-4">Loading user...</p>
    if (!user) return <p className="p-4">User not found.</p>

    return (
        <div className="p-4">
            <Card>
                <CardHeader>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent>
                </CardContent>
            </Card>
            <hr className="my-5" />
            <h1 className="text-5xl mb-4">Posts</h1>
            <div className="grid grid-cols-3 gap-4">
                {
                    user.posts?.length === 0 ? <p>No posts yet.</p> :
                        user.posts?.map(post => (
                            <div key={post.id}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="capitalize">{post.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="times">
                                            {`${post.content}`}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}
