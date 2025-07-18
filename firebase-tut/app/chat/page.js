"use client"

import { send } from "@/lib/chatbackend"
import { useEffect, useState } from "react"
import { ref, onValue } from "firebase/database";
import { auth, rtdb } from "@/lib/firebase";
import { signOut } from "firebase/auth";

import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    let [message, setMessage] = useState("");
    const [texts, setTexts] = useState([]);
    const [userEmail, setUserEmail] = useState();
    // console.log(auth.currentUser);
    useEffect(() => {
        const messagesRef = ref(rtdb, "messages");
        onValue(messagesRef, (snapshot) => {
            const newTexts = [];
            snapshot.forEach((snap) => {
                newTexts.push([
                    snap.val().text,
                    snap.val().email
                ]);
            });
            console.log(newTexts);
            setUserEmail(auth.currentUser.email);
            setTexts(newTexts);
        });
    }, [])


    return (
        <>
            <h1 className="heading">iCHAT</h1>

            <div className="chatbox">
                {
                    texts.map((text, i) => (
                        <p className="text" key={i}>
                            <b>{text[1]}</b> : {text[0]}
                        </p>
                    ))
                }
            </div>
            <div className="msg-box">
                <input placeholder="Type your message :)" value={message} onChange={(e) => setMessage(e.target.value)} required />
                <button onClick={() => {
                    send(message, userEmail)
                    setMessage("")
                }
                }>➡️</button>
            </div>


            <button className="logout" onClick={async () => {
                await signOut(auth);
                router.push('/')
            }}>Log out </button>
        </>
    )
}