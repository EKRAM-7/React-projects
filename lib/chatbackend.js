import { db } from "./firebase";
import { auth } from "./firebase";
import { rtdb } from "./firebase";
import { onChildAdded, onValue, push, ref, remove } from "firebase/database";

export async function send(message, userEmail) {
	await push(ref(rtdb, 'messages'), {
		"text": message, 
		"email" : userEmail
	})
}



/* const messagesRef = ref(rtdb, 'messages');

onChildAdded(messagesRef, (snapshot) => {
  const newMessage = snapshot.val();
  console.log("New message added:", newMessage);
}); */