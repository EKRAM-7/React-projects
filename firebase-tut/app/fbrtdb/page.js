"use client"

import { addData, deleteData, readData } from "@/lib/firebase-rtdb";


export default function Page() {

    return (
        <>
            <h1> This is Firebase Real time DB tutorial</h1>
            <button onClick={() => addData()}> Add data</button>
            <button onClick={() => readData()}> Get Data</button>
            <button onClick={() => deleteData()}> delete Data</button>
        </>
    )
}