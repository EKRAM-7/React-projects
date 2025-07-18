"use client"

import { addUser, fetchUser, updateUser } from "@/lib/firestore"
import { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    onSnapshot
} from "firebase/firestore"
import { db } from "@/lib/firebase";

export default function AddUserPage() {

    let [userName, setUserName] = useState("");
    let [age, setAge] = useState("");

    let [currName, setCurrName] = useState("");
    let [newName, setNewName] = useState("");

    let [usersList, setUsersList] = useState([])

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = async () => {
        let arr = []
        const userData = await getDocs(collection(db, "users"))

        userData.forEach((data) => {
            arr.push({
                id: data.id,
                name: data.data().name,
                age: data.data().age
            })
        })
        console.log(arr);
        setUsersList(arr)
    }

    async function deleteUser(userId) {
        const userRef = doc(db, "users", userId)
        await deleteDoc(userRef)
        fetchUsers();
    }

    return (
        <main>
            <h1>Add User to Firestore</h1>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            <button onClick={() => addUser(userName, age)}>Add User</button>
            <button onClick={() => fetchUser()}>Fetch User</button> <br />
            <input type="text" value={currName} onChange={(e) => { setCurrName(e.target.value) }} placeholder="Enter the current name" />
            <input type="text" value={newName} onChange={(e) => { setNewName(e.target.value) }} placeholder="Enter the new name" />
            <button onClick={() => updateUser(currName, newName)}>Update User</button>

            <h1>Users List</h1>
            <ul>
                {
                    usersList.map((user) => (
                        <li key={user.id}>
                            USER: {user.name}, AGE: {user.age}
                            <button onClick={() => deleteUser(user.id)}>Delete user</button>
                        </li>
                    ))
                }
            </ul>

        </main>
    )
}