"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { loginUser, logoutUser, getCurrentUser } from "@/lib/auth";

type User = {
    id: number;
    email: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    lastLogin?: string | null;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // 🔁 Restore session on refresh
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        getCurrentUser()
            .then((user) => setUser(user))
            .catch(() => {
                localStorage.removeItem("token");
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    // 🔐 Login function
    async function login(email: string, password: string) {
        const res = await loginUser({ email, password });
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
    }

    // 🚪 Logout function
    async function logout() {
        await logoutUser();
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
