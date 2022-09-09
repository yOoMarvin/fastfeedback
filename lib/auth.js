import React, { useState, useEffect, useContext, createContext } from 'react'
import { auth } from './firebase'
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    signInWithPopup,
} from 'firebase/auth'
import { createUser } from './db'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName,
                    provider: user.providerData[0].providerId,
                    photoUrl: user.photoURL,
                })

                createUser(user.uid, {
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName,
                    provider: user.providerData[0].providerId,
                    photoUrl: user.photoURL,
                })
            } else {
                setUser(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const signinWithGitHub = () => {
        const provider = new GithubAuthProvider()
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const signinWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const signout = async () => {
        setUser(null)
        await signOut(auth)
    }

    return (
        <AuthContext.Provider
            value={{ user, signinWithGitHub, signinWithGoogle, signout }}
        >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
