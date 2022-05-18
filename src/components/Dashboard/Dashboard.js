import React, {useEffect} from 'react';
import {Card} from "react-bootstrap";


const Dashboard = () => {

    useEffect(() => {
        console.log("Ucitana stranica: ")
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