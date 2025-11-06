'use client'

import api from "@/lib/api"
import { useEffect, useState } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Posts() {
    const [posts, setPosts] = useState<any[]>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/posts').then(res => {
            setPosts(res.data)
            setLoading(false)
        })
    })

    if (loading) return <p className="p-4">Loading post...</p>
    if (!posts) return <p className="p-4">Post not found.</p>

    return (
        <div className="p-4">
            <h1 className="text-7xl mb-4">Posts</h1>
            <hr className="mb-4" />
            <div className="grid grid-cols-3 gap-4">
                {
                    posts.map(post => (
                        <div key={post.id}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="capitalize">{post.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="times">
                                        {`${post.body}`}
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