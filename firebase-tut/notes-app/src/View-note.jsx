import { useParams } from "react-router-dom"
import styles from './CSS_Modules/View-note.module.css'
import { useRef } from "react";

function ViewNote() {
    const params = useParams(); // params.noteid contains the parameter

    const notesObj = JSON.parse(localStorage.getItem('notes')); // This object contains the copy of the local storage (i.e, the main data of all the notes)

    const textareaRef = useRef(null);

    function saveNote() {
        notesObj[params.noteid].content = textareaRef.current.value;
        localStorage.setItem("notes", JSON.stringify(notesObj));
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.noteTitle}>
                    {notesObj[params.noteid].title}
                    </h1>
                    <div className={styles.menu}>
                        <button onClick={saveNote}>💾</button>
                        <button>✏️</button>
                    </div>
                </div>
                <textarea className={styles.canvas} ref={textareaRef} placeholder="What's on your mind?">
                    {
                        notesObj[params.noteid].content
                    }
                </textarea>
                <div className={styles.format}>
                    <button className={styles.boldBtn}>🅱️</button>
                </div>
            </div>
            
        </>
    )
}

export default ViewNote