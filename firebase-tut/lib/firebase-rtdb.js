import { rtdb } from "./firebase";
import { ref, set, onValue, push, remove } from "firebase/database";

export async function addData() {
    await set(ref(rtdb, 'players/player2'), {
        name: "Bob",
        score: 10
    });
}

export function readData() {
    let texts = [];
    onValue(ref(rtdb, 'messages'), (snapshot) => {
        texts.push(snapshot.val().text)
        // console.log(snapshot.val())
        // const data = snapshot.val();
        // console.log(data);
    })
    return texts;
}

export async function newData() {
    await push(ref(rtdb, 'messages'), {
        text: "Hello!",
        sender: "Ikram"
    });
    console.log("Data Added!!")
}

export async function deleteData() {
    await remove(ref(rtdb, "messages"))
}