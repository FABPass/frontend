import {useState} from "react";
import styles from "./DataItem.module.css"

export const DataItemCard = (props) => {

    const [number, setNumber] = useState("");
    const [security, setSecurity] = useState("");
    const [pin, setPin] = useState("");

    const handleNumber = (e) => {
        let str = e.target.value
        let onlynumbers = str.replace(/[^0-9]/g,'');
        if(onlynumbers.length>0){
            setNumber(e.target.value)
            props.handleNumber(e.target.value)
        }

    }

    const handleSecurity = (e) => {
        let str = e.target.value
        let onlynumbers = str.replace(/[^0-9]/g,'');
        if(onlynumbers.length>0){
            setSecurity(onlynumbers)
            props.handleSecurity(onlynumbers)
        }


    }

    const handlePin = (e) => {
        let str = e.target.value
        let onlynumbers = str.replace(/[^0-9]/g,'');
        if(onlynumbers.length>0){
            setPin(onlynumbers)
            props.handlePin(onlynumbers)
        }

    }

    return(
        <div className={styles.itemwrapper}>
            <div className={"row"}>
                <h4>Create card</h4>
            </div>
            <div className={"row"}>
                <div className={"col"}>
                    <div>Card number</div>
                </div>
                <div className={"col"}>
                    <input type={"number"} value={number} pattern="[0-9]*" inputmode="numeric" placeholder={"Input card number"} onChange={handleNumber}/>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col"}>
                    <div>Card security</div>
                </div>
                <div className={"col"}>
                    <input value={security} type={"password"} pattern="[0-9]*" inputmode="numeric" placeholder={"Input card security code"} onChange={handleSecurity}/>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col"}>
                    <div>Card pin</div>
                </div>
                <div className={"col"}>
                    <input type={"password"} value={pin} pattern="[0-9]*" inputmode="numeric"  placeholder={"Input card pin"} onChange={handlePin}/>
                </div>
            </div>
        </div>

    )
}