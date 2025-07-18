"use client"

import { signIn, signUp } from "@/lib/fireauth";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react"

export default function Page() {

    let [email, setEmail] = useState("");
    let [pw, setPw] = useState("");
    let [user, setUser] = useState(null);
    useEffect(() => {
        const checkUser = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log(`User is logged in with ${currentUser.email}`);
                setUser(currentUser);
            }
            else {
                console.log("User has logged out");
                setUser(null)
            }
        })
    }, [])

    return (
        <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
            <button onClick={async () => await signUp(email, pw)}>Sign Up</button>
            <button onClick={async () => {
                await signIn(email, pw);
                console.log(auth.currentUser);
                // const userCredential = await signIn(email, pw);
                // console.log("Signed in user:", userCredential.user);
            }
            }>Sign In</button>
            
            {
                user ? (
                    <>
                        <h3>Welcome user {user.email}</h3>
                        <button onClick={async () => await signOut(auth)}>Sign Out</button>
                    </>
                ) : null
            }
        </div>
    )
}

