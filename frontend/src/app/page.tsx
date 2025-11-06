'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  const routes = [
    {
      name: 'Users',
      url: '/users'
    },
    {
      name: 'Posts',
      url: '/posts'
    },
  ]

  return (
    <div className="p-4 text-center flex flex-col gap-2">
      <h1 className="text-3xl">Dashboard</h1>
      {routes.map(route => (
        <Button key={route.url} onClick={() => { router.push(route.url) }} className="shadow-sm">{route.name}</Button>
      ))}
    </div>
  )
}
