import { collection, addDoc, getDocs, doc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from "./firebase"

/* export const addUser = async (username, userAge) => {
  try {
	const docRef = await addDoc(collection(db, "users"), {
	  name: "Ikram",
	  age: 21,
	})
	console.log("User added with ID: ", docRef.id)
  } catch (error) {
	console.error("Error adding user: ", error)
  }
} */

export async function addUser(username, userAge) {
	const docRef = await addDoc(collection(db, "users"), {
		name: username,
		age: userAge
	})
	onSnapshot(collection(db, "users"), () => {
		/* snapshot.forEach((doc) => {
			console.log("Live data:", doc.id, doc.data())
		}) */
		console.log("Data Updated")
	})
}

export async function fetchUser() {
	const data = await getDocs(collection(db, "users"))
	const userList = [];
	data.forEach((doc) => {
		console.log("User ID:", doc.id)
		console.log("User Data:", doc.data().name)
		userList.push(
			{
				id: doc.id,
				name: doc.data().name
			}
		)
	})
	return userList
}

export async function updateUser(currName, newName) {
	const data = await getDocs(collection(db, "users"))

	data.forEach(async (user) => {
		if (user.data().name === currName) {
			const userRef = doc(db, "users", user.id)
			await updateDoc(userRef, { name: newName })
		}
	})

}
