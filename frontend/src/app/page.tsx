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
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-2">Routes</h1>
      {routes.map(route => (
        <Button key={route.url} onClick={() => {
          router.push(route.url)
        }} variant="outline" className="w-full mb-1">
          {route.name}
        </Button>
      ))}
    </div>
  )
}
