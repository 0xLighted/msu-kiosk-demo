'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface IdentifiedUser {
    id: string | null;
    name: string;
}

interface UserContextType {
    user: IdentifiedUser | null;
    setUser: (user: IdentifiedUser | null) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IdentifiedUser | null>(null);

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
