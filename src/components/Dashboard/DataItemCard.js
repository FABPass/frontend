import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import styles from "./Dashboard.module.css";
import { confirm } from "react-confirm-box";

const DataItemCard = (props) => {

    const [passwordShown, setPasswordShown] = useState(false);

    const onEyeClick = () => {
        setPasswordShown(!passwordShown);
    }


    const deleteDataItem = () => {
        console.log("Sad bi se izbrisao data item");
    }

    const onDeleteClick = async () => {
        const result = await confirm("Are you sure you want to delete the selected data item?");
        if (result)
            deleteDataItem();
    };

    return (
        <Card
            style={{ width: '18rem' }}
            className="mb-2"
            id={styles.card}
        >
            <Card.Header id={styles.cardHeader}>
                {
                    props.dataType === "password" ?
                        <div>
                            <i className={`bi bi-key ${styles.typeIcon}`}/>
                            {props.name}
                        </div> :
                        <div>
                            <i className="bi bi-cash-coin"/>
                            Credit Card
                        </div>
                }
                <button id={styles.editBtn} className={styles.optionsBtn}/>
                <button id={styles.deleteBtn} className={styles.optionsBtn} onClick={onDeleteClick}/>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {
                        props.dataType === "payment_card" ?
                            <div>
                                <label>Card number: </label>
                                {props.name}
                            </div> :
                            null
                    }
                    {
                        props.dataType === "payment_card" ?
                            <label>Pin:</label> :
                            null
                    }
                    {
                        passwordShown ?
                            <div>
                                <input type={"text"} readOnly={"readonly"} value={props.value}/>
                                <i className="bi bi-eye-slash" onClick={onEyeClick}/>
                            </div>:
                            <div>
                                <input type={"password"} readOnly={"readonly"} value={props.value}/>
                                <i className="bi bi-eye" onClick={onEyeClick}/>
                            </div>
                    }
                    {
                        props.dataType === "payment_card" ?
                            <label>Security code:</label> :
                            null
                    }
                    {props.description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default DataItemCard;