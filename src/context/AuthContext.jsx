import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useContext, createContext, useEffect, useState } from "react";
import { auth } from "../../firebase";

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider(props) {
    const { children } = props
    const [globalUser, setGlobalUser] = useState(null)
    const [globalData, setGlobalData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }
    function logout() {
        setGlobalUser(null)
        setGlobalData(null)
        return signOut(auth)
    }
    const value = {
        globalUser, globalData, setGlobalData, isLoading, signup, login, logout
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            // if theres no user empty user state and return from this listener
            if(!user) {return}
            // if user then check if user has data in db and if yes then fetch data and update global data
            try {
                setIsLoading(true)
                
                
            } catch (error) {
                console.log(error.message);
                
            }finally{
                setIsLoading(false)
            }
        })
        return unsubscribe
    } , [])
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}