import {useEffect, useState} from "react";
import {GeneratePassword} from "../GeneratePassword/GeneratePassword";
import styles from "./DataItem.module.css"
import {DataItemLogin} from "./DataItemLogin";
import {DataItemCard} from "./DataItemCard";
import {useNotification} from "../Notifications/NotificationProvider";
import {Request} from "../../api/Request";
import {useNavigate} from "react-router-dom";
import {getUserDataGroups, profileInformation} from "../../api/routes";
import {DropdownButton} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";


export const DataItem = () => {

    const [number, setNumber] = useState("");
    const [security, setSecurity] = useState("");
    const [pin, setPin] = useState("");

    const [seeLogin, setSeeLogin] = useState(true)
    const [seeCard, setSeeCard] = useState(false)

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [id, setId] = useState("")
    const [dataGroups, setDataGroups] = useState(null)

    const [selectedGroup, setSelectedGroup] = useState(null)
    const [newGroup, setNewGroup] = useState(null)

    useEffect(() => {
        Request(profileInformation+localStorage.getItem('email'),"GET")
            .then((response) =>{
                const user = response.data
                setId(user.id);
                Request(getUserDataGroups+"?userId="+id,"GET")
                    .then((resp) => {
                        setDataGroups(resp.data)
                    })
            })

    }, [])

    const handleSeeLogin = () => {
        setSeeLogin(true)
        setSeeCard(false)
    }

    const handleSeeCard = () => {
        setSeeCard(true)
        setSeeLogin(false)
    }

    const handleNumber = (num) => {
        setNumber(num)
    }

    const handleSecurity = (sec) => {
        setSecurity(sec)
    }

    const handlePin = (pin) => {
        setPin(pin)
    }

    const handleName = (name) => {
        setName(name)
    }

    const handleUsername = (username) => {
        setUsername(username)
    }

    const handlePassword = (password) => {
        setPassword(password)
    }

    const dispatch = useNotification();

    const handleNewNotification = (status, message) => {
        dispatch({
            type: status,
            message: message,
        })
    }

    let navigate = useNavigate();

    const handleCreate = (e) => {
        e.preventDefault()

        if(seeLogin && name.length>0 && username.length>0 && password.length>0){
            Request()
                .then(response => {
                    if(response.status ===200){
                        handleNewNotification("SUCCESS","Successfully created")
                        navigate("/dashboard")
                    }
                })
                .catch(err => {
                    handleNewNotification("ERROR", "Problem with server, try later")
                })
        }
        else if(seeCard && number.length>0 && security.length>0 && pin.length>0){
            Request()
                .then(response => {
                    if(response.status ===200){
                        handleNewNotification("SUCCESS","Successfully created")
                        navigate("/dashboard")
                    }
                })
                .catch(err => {
                    handleNewNotification("ERROR", "Problem with server, try later")
                })
        }
        else{
            handleNewNotification("ERROR", "Complete fields")
        }

    }

    const groups = [
        {
            "id":"1",
            "name":"Login podaci"
        },
        {
            "id":"2",
            "name":"Kartice"
        },
        {
            "id":"2",
            "name":"Neka grupa"
        }
    ]

    return(
        <div className={"container-fluid mt-4 ms-2 mb-2 me-2"}>
            <div className={"row"}>
                <div className={"row"}>
                    <h2>Create new data item</h2>
                </div>
                <div className={"row mt-4"}>
                    <div className={`col-7 ${styles.wrapper}`}>
                        <div className={"row"}>
                            <div className={"col-6"}>
                                <h4>Choose group for data item or</h4>
                            </div>
                            <div className={"col text-end me-5 pe-5"}>
                                <select className={styles.dataGroup} onChange={(e)=> setSelectedGroup(e.target.value)}>
                                    {/*TODO koristi ovdje grupe iz dataGroups sto dobijes slanjem requesta*/}
                                    {groups.map((item)=>{
                                        return <option>{item.name}</option>
                                    })}
                                </select>
                            </div>

                        </div>
                        <div className={"row me-4 pe-5"}>
                            <div className={"col"}>
                                <h4>Create new group for data item</h4>
                            </div>
                            <div className={"col text-end"}>
                                <input type={"text"} value={newGroup} placeholder={"New data group"} onChange={(e)=> setNewGroup(e.target.value)}/>
                            </div>
                        </div>
                        <div className={"row"}>
                            <h4>Choose type</h4>
                        </div>
                        <div className={"row mt-2 text-center"}>
                            <div className={"col"}>
                                <button className={styles.itemdbtn} onClick={handleSeeLogin}>Login</button>
                            </div>
                            <div className={"col"}>
                                <button className={styles.itemdbtn} onClick={handleSeeCard}>Card</button>
                            </div>
                        </div>
                        <div className={"row mt-2 text-center justify-content-center"}>
                            {seeLogin ? <DataItemLogin handleName={handleName} handleUsername={handleUsername} handlePassword={handlePassword}></DataItemLogin> :
                                <DataItemCard handleNumber={handleNumber} handleSecurity={handleSecurity} handlePin={handlePin} ></DataItemCard>}
                        </div>
                        <div className={"row mt-2 justify-content-center"}>
                            <button className={styles.createdbtn} onClick={handleCreate}>{seeLogin ? "Create login" : "Create card"}</button>
                        </div>
                    </div>
                    <div className={"col-5"}>
                        <GeneratePassword></GeneratePassword>
                    </div>
                </div>
            </div>
        </div>
    )
}
