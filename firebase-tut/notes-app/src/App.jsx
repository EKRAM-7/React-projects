import React from "react"
import NotesList from "./Notes-list"
import ViewNote from "./View-note"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


function App() {

    const router = createBrowserRouter(
        [
            {
                path:'/',
                element: 
                <>
                    <h1 className="heading">
                    <i>I - NOTES </i>
                    </h1>
                    <NotesList />
                </>
                
            },
            {
                path: '/:noteid',
                element: <ViewNote />
            }
        ]
    )

    return (
        <>
           
            <RouterProvider router={router}/>
        </>
    )
}

export default App