import styles from "./DataItem.module.css"
import {useState} from "react";

export const DataItemLogin = (props) => {

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleName = (e) => {
        setName(e.target.value)
        props.handleName(e.target.value)
    }

    const handleUsername = (e) => {
        setUsername(e.target.value)
        props.handleUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
        props.handlePassword(e.target.value)
    }


    return(
        <div className={styles.itemwrapper}>
            <div className={"row"}>
                <h4>Create login</h4>
            </div>
            <div className={"row"}>
                <div className={"col"}>
                    <div>Item name</div>
                </div>
                <div className={"col"}>
                    <input type={"text"} value={name}
                           placeholder={"Input item name"} onChange={handleName}/>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col"}>
                    <div>Email/Username</div>
                </div>
                <div className={"col"}>
                    <input value={username} type={"text"}
                           placeholder={"Input username/email"} onChange={handleUsername}/>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col"}>
                    <div>Password</div>
                </div>
                <div className={"col"}>
                    <input type={"password"} value={password}
                           placeholder={"Input password"} onChange={handlePassword}/>
                </div>
            </div>
        </div>
    )
}
