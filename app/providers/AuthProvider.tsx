import {createContext, FC, ReactNode, useEffect, useMemo, useState} from "react";
import {User, onAuthStateChanged} from "firebase/auth";
import {auth, db, login, logout, register} from "../firebase";
import {addDoc, collection, updateDoc, doc, setDoc, query, where, getDocs, getDoc} from "@firebase/firestore";
import {Alert} from "react-native";

interface IData {
    _id: string,
    email: string,
    displayName: string,
    password: string,
    balance: {
        amount: number,
        cards: [
            {
                id: string,
                cardIcon: string,
                title: string,
                currency: string
            }
        ]
    }
}

interface IContext {
    user: User | null,
    isLoading: boolean,
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, displayName: string) => Promise<void>;
    logout: () => Promise<void>;
    save: (username: string) => Promise<void>;
    data: IData | null
}

interface IAuthProvider {
    children: ReactNode
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: FC<IAuthProvider> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [data, setData] = useState<IData | null>(null);

    const [isLoadingInitial, setIsLoadingInitial] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const registerHandler = async (email: string, password: string, displayName: string) => {
        setIsLoading(true);

        try {
            const {user} = await register(email, password);

            addDoc(collection(db, "users"), {
                _id: user.uid,
                displayName: displayName,
                email: email
            })

        } catch (error: any) {
            console.log('Error reg:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const loginHandler = async (email: string, password: string) => {
        setIsLoading(true);

        try {
            await login(email, password);

            await getUserInfo()
        } catch (error: any) {
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    const logoutHandler = async () => {
        setIsLoading(true);

        try {
            await logout();

            setData(null);
        } catch (error: any) {
            Alert.alert('Error logout:', error)
        } finally {
            setIsLoading(false)
        }
    }


    const save = async (username: string) => {
        const uid = auth.currentUser?.uid;

        try {
            const usersCollectionRef = collection(db, "users");

            const q = query(usersCollectionRef, where("_id", "==", uid));

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDocRef = doc(usersCollectionRef, querySnapshot.docs[0].id);

                await updateDoc(userDocRef, {
                    displayName: username,
                });

                await getUserInfo();

                console.log("User data updated successfully!");

                return;
            } else {
                console.log("User not found with _id:", user?.uid);
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const getUserInfo = async () => {
        try {
            const uid = auth.currentUser?.uid;

            if (uid) {
                const usersCollectionRef = collection(db, "users");

                const q = query(usersCollectionRef, where("_id", "==", uid));

                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userDocRef = doc(usersCollectionRef, querySnapshot.docs[0].id);

                    const data = (await getDoc(userDocRef)).data();

                    console.log("getUserInfo", data)

                    setData((prevState: any) => ({...prevState, ...data}))
                } else {
                    console.log("User not found with UID:", uid);
                }
            } else {
                console.log("No user is currently authenticated.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => onAuthStateChanged(auth, user => {
        setIsLoadingInitial(false);
    }), [])

    console.log(data)

    const value = useMemo(() => ({
        user,
        data,
        isLoading,
        login: loginHandler,
        logout: logoutHandler,
        register: registerHandler,
        save
    }), [user, isLoading, data])

    return (
        <AuthContext.Provider value={value}>
            {!isLoadingInitial && children}
        </AuthContext.Provider>
    )
}