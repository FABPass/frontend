import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import button from "bootstrap/js/src/button";

const DataItemCard = (props) => {

    const [passwordShown, setPasswordShown] = useState(false);

    const onEyeClick = () => {
        setPasswordShown(!passwordShown);
    }

    return (
        <Card
            style={{ width: '18rem' }}
            className="mb-2"
        >
            <Card.Header>
                {
                    props.dataType === "password" ?
                        <div>
                            <i className="bi bi-key"/>
                            {props.name}
                        </div> :
                        <div>
                            <i className="bi bi-cash-coin"/>
                            Credit Card
                        </div>
                }
                <button id={"editBtn"} className={"optionsBtn"}/>
                <button id={"deleteBtn"} className={"optionsBtn"}/>
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