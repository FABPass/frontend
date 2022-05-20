import React, {useEffect} from 'react';
import {Card} from "react-bootstrap";
import axios from "axios";
import {baseUrl} from "../../api/baseUrl";
import {connect} from "react-redux";


const Dashboard = (props) => {

    useEffect(() => {
        console.log(props.accessToken);
        const getUserId = async () => {
            try{
                const response = await axios.get(baseUrl + "/user?email=" + props.email);
                const userId = response?.data?.id;
                console.log(JSON.stringify(response?.data));
            } catch (err) {

            }
        }
        getUserId()
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

const mapStateToProps = (state) => {
    return {
        email: state.email,
        password: state.password,
        accessToken: state.accessToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeUserInfo: (email, password, accessToken) => {
            dispatch({type: 'CHANGE_USER_INFO', email: email, password: password, accessToken: accessToken})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);