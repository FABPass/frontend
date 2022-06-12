import React, {useEffect, useState} from 'react';
import {Card} from "react-bootstrap";
import axios from "axios";
import {getUserDataItems} from "../../api/routes";
import button from "bootstrap/js/src/button";
import './Dashboard.css';


const Dashboard = () => {

    const [dataItems, setDataItems] = useState(null);

    async function getUsersDataItems() {
        try {
            const response = await axios.get(getUserDataItems + localStorage.getItem('userId'));
            setDataItems(response?.data);
        }
        catch (e) {

        }
    }

    useEffect(() => {
        getUsersDataItems();
    }, []);

    return (
        <div>
            {
                dataItems?.map((item, index) =>{
                    return (
                        <Card
                            style={{ width: '18rem' }}
                            className="mb-2"
                            key={`${index}-${item.name}`}
                        >
                            <Card.Header>
                                {item.name}
                                <button id={"editBtn"} className={"optionsBtn"}/>
                                <button id={"deleteBtn"} className={"optionsBtn"}/>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{item.value}</Card.Title>
                                <Card.Text>
                                    {item.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    );
                })
            }
        </div>
    );
};

export default Dashboard;