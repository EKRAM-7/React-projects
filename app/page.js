"use client"

import { signIn, signUp } from "@/lib/fireauth";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react"

import { useRouter } from 'next/navigation'


export default function Page() {
	const router = useRouter()


	let [loading, setLoading] = useState(true);
	let [email, setEmail] = useState("");
	let [pw, setPw] = useState("");
	let [user, setUser] = useState(null);
	/* useEffect(() => {
		const checkUser = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				console.log(`User is logged in with ${currentUser.email}`);
				setLoading(false)
				setUser(currentUser);
			}
			else {
				console.log("User has logged out");
				setUser(null)
			}
		})
	}, [])

	useEffect(() => {
		if (user) {
			router.push('/chat');
		}
	}, [user, router]); */

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);

			if (currentUser) {
				router.push('/chat');
			}
		})
	}, [])

	if (loading) {
		return <p>Loading...</p>
	}

	return (
		<>
			{
				!user ? (
					<>
						<h1 className="heading">iChat Login</h1>
						<div className="login-form">
							<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
							<input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Enter your password" />
							<button onClick={async () => await signUp(email, pw)}>Sign Up</button>
							<button onClick={async () => {
								await signIn(email, pw);
								console.log(auth.currentUser.email);
							}

							}>Sign In</button>
						</div>
					</>
				) : null
			}
		</>
	)
}

