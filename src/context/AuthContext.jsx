import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useContext, createContext, useEffect, useState } from "react";
import { auth , db } from "../../firebase";
import { doc , getDoc } from "firebase/firestore";

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
            console.log('current user' , user);
            setGlobalUser(user)
            
            if(!user) {
                console.log('no user');
                return}
            // if user then check if user has data in db and if yes then fetch data and update global data
            try {
                setIsLoading(true)
                // create reference for document (labelled json object) and then we get the doc and then we snapshot it to see if theres anything there
                const docRef = doc(db , 'users' , user.uid)
                const docSnap = await getDoc(docRef)
                
                let firebaseData = {}
                if(docSnap.exists()){
                    firebaseData = docSnap.data()
                    console.log('found user data',firebaseData);
                }
                setGlobalData(firebaseData)
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