import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import dashboardStyles from "../Dashboard.module.css";
import { confirm } from "react-confirm-box";
import EditDataItem from "../EditDataItem/EditDataItem";
import cardStyles from "./DataItemCard.module.css";

const DataItemCard = (props) => {

    const [passwordShown, setPasswordShown] = useState(false);
    const [editPopup, setEditPopup] = useState(false);

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

    const onEditClick = () => {
        setEditPopup(true);
    };
    return (
        <Card
            style={{ width: '18rem' }}
            className="mb-2"
            id={dashboardStyles.card}
        >
            <Card.Header id={dashboardStyles.cardHeader} className={cardStyles.cardHeader}>
                {
                    props.dataType === "password" ?
                        <div className={cardStyles.cardLabels}>
                            <i className={'bi bi-key'}/>
                            {props.name}
                        </div> :
                        <div className={cardStyles.cardLabels}>
                            <i className="bi bi-cash-coin"/>
                            {props.name}
                        </div>
                }
                <button id={dashboardStyles.editBtn} className={dashboardStyles.optionsBtn} onClick={onEditClick}/>
                <button id={dashboardStyles.deleteBtn} className={dashboardStyles.optionsBtn} onClick={onDeleteClick}/>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {
                        passwordShown ?
                            <div className={cardStyles.margins}>
                                {
                                    props.dataType === "payment_card" ?
                                        <i className={cardStyles.cardLabels}>Pin:</i> :
                                        <i className={cardStyles.cardLabels}>Pass:</i>
                                }
                                <input className={cardStyles.pswdField} type={"text"} readOnly={"readonly"} value={props.value}/>
                                <i className="bi bi-eye-slash" onClick={onEyeClick}/>
                            </div>:
                            <div className={cardStyles.margins}>
                                {
                                    props.dataType === "payment_card" ?
                                        <i className={cardStyles.cardLabels}>Pin:</i> :
                                        <i className={cardStyles.cardLabels}>Pass:</i>
                                }
                                <input className={cardStyles.pswdField} type={"password"} readOnly={"readonly"} value={props.value}/>
                                <i className="bi bi-eye" onClick={onEyeClick}/>
                            </div>
                    }
                    <div className={cardStyles.margins}>
                        {
                            props.dataType === "payment_card" ?
                                <i className={cardStyles.cardLabels}>Security code:</i> :
                                <i className={cardStyles.cardLabels}>Email:</i>
                        }
                        {props.description}
                    </div>
                </Card.Text>
            </Card.Body>
            <EditDataItem trigger={editPopup} setTrigger={setEditPopup}/>
        </Card>
    );
};

export default DataItemCard;