import React, {useContext, useEffect} from 'react';
import {Card} from "react-bootstrap";
import axios from "axios";
import * as qs from "qs";
import {baseUrl} from "../../api/baseUrl";
import AuthContext from "../../context/AuthProvider";


const Dashboard = () => {

    const {auth, setAuth} = useContext(AuthContext);

    useEffect(() => {
        const getUserId = async () => {
            try{
                const response = await axios.post(baseUrl + "/user", qs.stringify(auth.accessToken), {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                });
                const userId = response?.data?.id;

            } catch (err) {

            }
            console.log("ucitan je dashboard")
        }
    })

    return (
        <div>
            <Card
                bg={"variant".toLowerCase()}
                key={"variant"}
                text={'black'}
                style={{ width: '18rem' }}
                className="mb-2"
            >
                <Card.Header>Header</Card.Header>
                <Card.Body>
                    <Card.Title>{"variant"} Card Title </Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Dashboard;