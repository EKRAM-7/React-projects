import React, { useState, useEffect } from "react";


function Password() {

    const [password, setPassword] = useState("");
    let requirements = ["Lowercase", "Uppercase", "Numbers", "Symbols"];
    let listItems = document.getElementsByClassName("list-item");

    let [strengthScore, setStrengthScore] = useState(0); 

    // This function has only one purpose and that is to handle the changes occuring in the input field
    function handlePwChange(event) {
        setPassword(event.target.value);
    }

    // Everytime the password faces any kind of changes, it will fire a function (checkPass) which checks the characters presents in the password.
    useEffect(() => {
        checkPass();
        
    }, [password])

    // This function checks the type of characters that the password contains.
    function checkPass() {
        let pw = password;
        let hasNum = false ,hasSymbols = false, hasUpper = false, hasLower = false;

        
        for (let i of pw) {
            if (/[0-9]/.test(i)) hasNum = true;
            else if (/[a-z]/.test(i)) hasLower = true;
            else if (/[A-Z]/.test(i)) hasUpper = true;
            else hasSymbols = true;
        }

        // After checking the type of passwords that it contains, it calls to functions one of which is responsible for changing the text color of the requirements list, meaning that if a particular type of character is present in the password the corresponding text from the list's color will be changed to green.
        changeColor([hasLower, hasUpper, hasNum, hasSymbols]);

        pwStrength([hasLower, hasUpper, hasNum, hasSymbols]);
        
    }

     //and another function to determine the password strength based on which a score will be determined which will further be used to determine whether the password is weak, medium or strong.
    function pwStrength(reqArr) {
        let score = 0;
        for (let i of reqArr) {
            if (i) score += 2;
        }

        if (password.length > 5) {
            score += 3;
            if (password.length > 8) {
                score += 4;
            }
        }
        setStrengthScore(score);

        return score;
    }

    function changeColor(reqArr) {
        
        for (let i=0; i<4; i++) {
            if (reqArr[i]) {
                listItems[i].style.color = 'green'; 
            } else {
                listItems[i].style.color = 'grey';
            }

        }
    }


    // Based on the score of the password it determines the type strength of the password into weak, medium and strong.
    function checkStrength(score) {
        let strength = "weak";
        if (score >= 8 && score < 12) strength = "medium";
        else if (score >=12) strength = "strong"; 
        else strength = "weak";

        return strength;
    }

    return (
        <>
            <h1 className="heading">Password </h1>
            <input type="text" value={password} className="pw-input" placeholder="Enter your Password" onChange={handlePwChange} /> <br />

            <ul className="req-list">
                {
                    requirements.map((val, i) => <li className="list-item" key={i}>{val}</li>)
                }
            </ul>

            <p>Your password has <b>{password.length}</b> characters</p>

            <p>Your password is <b>{checkStrength(strengthScore)}</b></p>
        </>
    )
}

export default Password