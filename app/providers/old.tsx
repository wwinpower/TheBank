import React, {createContext, useContext, useState, useEffect, ReactNode, FC} from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User
} from "firebase/auth";
import {auth} from "@app/firebase";
import {View} from "react-native";

interface IContext {
    user: User | null,
    isLoading: boolean,
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider:FC<{children:ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email:string, password:string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };
    const register = async (email:string, password:string) => {
        await createUserWithEmailAndPassword(auth, email, password)
    };

    const logout = async () => {
        await signOut(auth);
    };


    const value = {
        user,
        isLoading,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
};

