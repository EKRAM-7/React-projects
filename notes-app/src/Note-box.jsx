import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import styles from './CSS_Modules/Note-box.module.css'

function Note({id, deleteNote}) {

    // const title = localStorage.getItem(id);

    const notesObj = JSON.parse(localStorage.getItem('notes'));
    
    const noteTitle = notesObj[id].title;


    return (

        <div className={styles.note}>
            <h2 className={styles.noteTitle}>{noteTitle}</h2>
            <div className={styles.editBtnsDiv}>
                
                <NavLink to={`/${id}`}>
                    <button className={styles.editBtn}>✏️</button>
                </NavLink>
                    
                <button className={styles.editBtn} onClick={() => deleteNote(id)}>🗑️</button>

            </div>
        </div>

    );
}

export default Note