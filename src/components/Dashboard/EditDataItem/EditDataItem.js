import React, {useEffect, useState} from 'react';
import styles from './EditDataItem.module.css';
import {Request} from "../../../api/Request";
import {getUserDataGroups} from "../../../api/routes";

const EditDataItem = (props) => {


    const[name, setName] = useState(props.name);
    const[description, setDescription] = useState(props.description);
    const[value, setValue] = useState(props.value);
    const[dataGroup, setDataGroup] = useState(props.dataGroup);
    const[dataGroups, setDataGroups] = useState(null);
    const[rerender, setRerender] = useState(1);

    useEffect(() => {
        Request(getUserDataGroups+localStorage.getItem('userId'),"GET")
            .then((resp) => {
                setDataGroups(resp.data)
            })
    }, [rerender]);


    const onNameChange = (e) => {
        setName(e.target.value);
    };

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const onValueChange = (e) => {
        setValue(e.target.value);
    };

    const manageEdit = () => {
        props.onEditClick(props.id, name, description, value, dataGroup);
        props.setTrigger(false);
        setRerender(rerender + 1);
    };

    return (
        props.trigger ?
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <div className={styles.itemwrapper}>
                    <h3 id={styles.headline}>Edit data item</h3>
                    <div className={`row ${styles.rowSpan}` }>
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
                    <div className={`row ${styles.rowSpan}` }>
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
                    <div className={`row ${styles.rowSpan}` }>
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
                    <div className={`row ${styles.rowSpan}` }>
                        <div className={"col"}>
                            <div>Data group</div>
                        </div>
                        <div className={"col"}>
                            <select className={styles.dataGroup}
                                    onChange={(e)=>
                                        setDataGroup(
                                            dataGroups.filter((s) => {
                                                if (s.name === e.target.value) return s;
                                            })[0]
                                        )
                                    }
                                    defaultValue={dataGroup}
                            >
                                { dataGroups!=null ?
                                    dataGroups.map((item)=>{
                                        let ret = item.name === dataGroup.name ? <option value={item.name}>{item.name}</option> :
                                            <option value={item.name}>{item.name}</option>
                                        return ret
                                    }) :
                                    <option>Loading</option>
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <button className={styles.editFormBtn} id={styles.saveBtn} onClick={manageEdit}>Save</button>
                <button className={styles.editFormBtn} id={styles.closeBtn} onClick={() => props.setTrigger(false)}>Close</button>
                {props.children}
            </div>
        </div> :
            null
    );
};

export default EditDataItem;