import { useRef, useEffect, useState } from "react";
import Note from "./Note-box";
import styles from "./CSS_Modules/Notes-list.module.css"


function NotesList() {
   
    const [noteTitle, setNoteTitle] = useState("");
    const [localStorageObj, setLocalStorageObj] = useState({...localStorage});
    
   
    let [notesObj, setNotesObj] = useState(JSON.parse(localStorage.getItem("notes")) || {});
    const [trigger, setTrigger] = useState(true);
    let noteCount = useRef(Object.keys(notesObj).length);

   

    function createNote() {
        if (noteTitle.length > 0) {

            let tempNotesObj = notesObj;
            tempNotesObj[noteCount.current] = {
                title : noteTitle, content : ""
            }
            console.log(tempNotesObj);
            setNotesObj(tempNotesObj);
            
            localStorage.setItem("notes", JSON.stringify(notesObj));
            noteCount.current++;
            setNoteTitle('');
            let dialogBox = document.querySelector('.dialogBox');
            dialogBox.style.display = "none";
        }
    }

    function showDialogBox() {
        let dialogBox = document.querySelector('.dialogBox');
        dialogBox.style.display = "block";
    }


    function hideDialogBox() {
        let dialogBox = document.querySelector('.dialogBox');
        setNoteTitle('');
        dialogBox.style.display = "none";
    }

    function handleNoteTitle(event) {
        setNoteTitle(event.target.value);
    }


    function deleteNote(id) {
        let tempNotesObj = notesObj;
        delete tempNotesObj[id];
        localStorage.setItem("notes", JSON.stringify(tempNotesObj));
        setTrigger(trigger ? false : true);
        setNotesObj(tempNotesObj);
    }


    return (
        <>
            <div className={styles.listContainer}>

                <div className={styles.actionBtnsDiv}>
                    <button className={`${styles.searchNote} ${styles.actionBtn}`}>🔍</button>
                    <button className={`${styles.addNote} ${styles.actionBtn}`} onClick={showDialogBox}>➕</button>
                </div>

                <div className={styles.notesContainer}>
                {

                    Object.keys(notesObj).sort().map((key) => (
                        <Note id={key} deleteNote={deleteNote}/>
                    ))

                }
                </div>
                

            </div>

            <div className="dialogBox">

                <h2 className="dialogHeading">Your Note Title</h2>
                <input type="text" value={noteTitle} className="noteTitle" onChange={handleNoteTitle}/>

                <div className="confirmationBtnDiv">
                    <button className="confirmationBtn done" onClick={createNote}>✅</button>
                    <button className="confirmationBtn cancel" onClick={hideDialogBox}>❌</button>
                </div>
                
            </div>
            
        </>
    )
}

export default NotesList