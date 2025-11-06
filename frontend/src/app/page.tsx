'use client'

import { Button } from "@/components/ui/button"
import { redirect, useRouter } from "next/navigation"


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
    redirect("/dashboard")
  )
}
