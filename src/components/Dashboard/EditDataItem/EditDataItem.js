import React, {useEffect, useState} from 'react';
import styles from './EditDataItem.module.css';
import {Request} from "../../../api/Request";
import {editDIRoute, getUserDataGroups} from "../../../api/routes";
import axios from "axios";

const EditDataItem = (props) => {

    const[name, setName] = useState(props.name);
    const[description, setDescription] = useState(props.description);
    const[value, setValue] = useState(props.value);
    const[dataType, setDataType] = useState(props.dataType);
    const[dataGroup, setDataGroup] = useState(props.dataGroup);
    const [dataGroups, setDataGroups] = useState(null)

    useEffect(() => {
        Request(getUserDataGroups+localStorage.getItem('userId'),"GET")
            .then((resp) => {
                setDataGroups(resp.data)
            })
    }, []);


    const onNameChange = (e) => {
        setName(e.target.value);
    };

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const onValueChange = (e) => {
        setValue(e.target.value);
    };

    const editDataItemClick = async () => {
        try {
            await axios.patch(editDIRoute + props.id, {
                "name":name,
                "description":description,
                "value":value,
                "dataGroupId": {
                    "name":dataGroup
                }
            });
        }
        catch (e) {

        }
    };

    return (
        props.trigger ?
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <div className={styles.itemwrapper}>
                    <h3 id={styles.headline}>Edit data item</h3>
                    <div className={"row"}>
                        <div className={"col"}>
                            {
                                props.dataType === "password" ?
                                    <div>Name</div> :
                                    <div>Card number</div>
                            }
                        </div>
                        <div className={"col"}>
                            <input type={"text"} value={name}
                                   placeholder={"Input name/card number"} onChange={onNameChange}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col"}>
                            {
                                props.dataType === "password" ?
                                <div>Email</div> :
                                    <div>Security code</div>
                            }
                        </div>
                        <div className={"col"}>
                            <input value={description} type={"text"}
                                   placeholder={"Input email/security code"} onChange={onDescriptionChange}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col"}>
                            {
                                props.dataType === "password" ?
                                    <div>Password</div> :
                                    <div>Pin</div>
                            }
                        </div>
                        <div className={"col"}>
                            <input type={"password"} value={value}
                                   placeholder={"Input password/pin"} onChange={onValueChange}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col"}>
                            <div>Data group</div>
                            <div className={"col text-end me-5 pe-5"}>
                                <select className={styles.dataGroup}
                                        onChange={(e)=>
                                            setDataGroup(
                                                dataGroups.filter((s) => {
                                                    if (s.name === e.target.value) return s;
                                                })[0]
                                            )
                                        }
                                >
                                    {/*TODO koristi ovdje grupe iz dataGroups sto dobijes slanjem requesta*/}
                                    { dataGroups!=null ?
                                        dataGroups.map((item)=>{
                                            return <option value={item.name}>{item.name}</option>
                                        }) :
                                        <option>Loading</option>
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <button className={styles.editFormBtn} id={styles.saveBtn} onClick={editDataItemClick}>Save</button>
                <button className={styles.editFormBtn} id={styles.closeBtn} onClick={() => props.setTrigger(false)}>Close</button>
                {props.children}
            </div>
        </div> :
            null
    );
};

export default EditDataItem;