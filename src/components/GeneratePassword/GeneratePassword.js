import {useState} from "react";
import styles from "./GeneratePassword.module.css"

export const GeneratePassword = () => {

    const [pwtext, setPwtext] = useState('')
    const [length, setLength] = useState(5)
    const [uppercase,setUppercase] = useState(false)
    const [lowercase,setLowercase] = useState(false)
    const [numbers,setNumbers] = useState(false)
    const [symbols,setSymbols] = useState(false)
    const [copied, setCopied] = useState(false)


    const handleChangeLength = (e) => {
        setLength(e.target.value)
    }

    const handleChangeUppercase = () => {
        setUppercase(!uppercase)
    }

    const handleChangeLowercase = () => {
        setLowercase(!lowercase)
    }

    const handleChangeNumbers = () => {
        setNumbers(!numbers)
    }

    const handleChangeSymbols = () => {
        setSymbols(!symbols)
    }

    const handleCopyPassword = () => {
        if(pwtext.length >0){
            navigator.clipboard.writeText(pwtext)
            setCopied(true);
            setInterval(() => {
                setCopied(false);
            }, 3000);
        }
    }

    const generatePassword = () => {
        const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        const symbolsArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];

        const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
        const lowerCaseLetters = characterCodes.map((code) =>
            String.fromCharCode(code)
        );
        const upperCaseLetters = lowerCaseLetters.map((letter) =>
            letter.toUpperCase()
        );

        const generateTheWord = (
            length,
            uppercase,
            lowercase,
            numbers,
            symbols
        ) => {
            const availableCharacters = [
                ...(lowercase ? lowerCaseLetters : []),
                ...(uppercase ? upperCaseLetters : []),
                ...(numbers ? numbersArray : []),
                ...(symbols ? symbolsArray : []),
            ];
            const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
            const characters = shuffleArray(availableCharacters).slice(0, length);
            setPwtext(characters.join(''));
            return characters;
        };

        generateTheWord(length, uppercase, lowercase, numbers, symbols);
    }

    return (
        <div className={styles.wrapper}>
            <h3>
                Password Generator
            </h3>
            <div className={"row pt-3"}>
                <div className={"col"}>
                    <input type={"text"} placeholder={"Copy generated text"} value={pwtext} onChange={(e)=> setPwtext(e.target.value)}/>
                </div>
                <div className={`col ${styles.endalign}`}>
                    <button className={styles.copybtn} onClick={handleCopyPassword}>{copied ? "Copied" : "Copy password"}</button>
                </div>
            </div>
            <div className={"row pt-4"}>
                <div className={"col"}>
                    <div>Password length</div>
                </div>
                <div className={`col ${styles.endalign}`}>
                    <input type={"number"} min={"5"} max={"30"} className={styles.numberstyle} value={length} onChange={handleChangeLength}/>
                </div>
            </div>
            <div className={"row pt-2"}>
                <div className={"col"}>
                    <div>Include uppercase letters</div>
                </div>
                <div className={`col ${styles.endalign}`}>
                    <input type={"checkbox"} className={styles.checkboxstyle} onClick={handleChangeUppercase}/>
                </div>
            </div>
            <div className={"row pt-2"}>
                <div className={"col"}>
                    <div>Include lowercase letters</div>
                </div>
                <div className={`col ${styles.endalign}`}>
                    <input type={"checkbox"} className={styles.checkboxstyle} onClick={handleChangeLowercase}/>
                </div>
            </div>
            <div className={"row pt-2"}>
                <div className={"col"}>
                    <div>Include numbers</div>
                </div>
                <div className={`col ${styles.endalign}`}>
                    <input type={"checkbox"} className={styles.checkboxstyle} onClick={handleChangeNumbers}/>
                </div>
            </div>
            <div className={"row pt-2"}>
                <div className={"col"}>
                    <div>Include symbols</div>
                </div>
                <div className={`col ${styles.endalign}`}>
                    <input type={"checkbox"} className={styles.checkboxstyle} onClick={handleChangeSymbols}/>
                </div>
            </div>
            <div className={"text-center pt-5 mb-3"}>
                <button className={styles.passwordbtn} onClick={generatePassword}>Generate password</button>
            </div>
        </div>
    )

}