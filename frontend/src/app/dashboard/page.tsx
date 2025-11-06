"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const router = useRouter();

    // 🚪 Redirect to login if not authenticated
    useEffect(() => {
        if (!user) {
            router.replace("/login");
        }
    }, [user, router]);

    async function handleLogout() {
        await logout();
        router.push("/login"); // ✅ Redirect to login after logout
    }

    if (!user) return null; // Avoid rendering before redirect

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-semibold">Welcome, {user.name} 👋</h1>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
}
