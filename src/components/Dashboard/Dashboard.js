import React, {useEffect, useState} from 'react';
import axios from "axios";
import {getUserDataItems} from "../../api/routes";
import './Dashboard.css';
import CryptoJS from "crypto-js";
import DataItemCard from "./DataItemCard";


const Dashboard = () => {

    const [dataItems, setDataItems] = useState(null);

    const decryptPassword = (encryptedPass) => {
        let bytes = CryptoJS.AES.decrypt(encryptedPass, localStorage.getItem('encPass'));
        let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedPass;
    }

    async function getUsersDataItems() {
        try {
            const response = await axios.get(getUserDataItems + localStorage.getItem('userId'));
            let items = response?.data.map((item, index) => {
                // item.value = decryptPassword(item.value);
                return item;
            });
            setDataItems(items);
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
                dataItems?.map((item, index) => {
                    return <DataItemCard name={item.name} value={item.value}
                                         description={item.description} key={`${index}-${item.name}`}
                                         dataType={item.dataTypeId.name}/>
                })
            }
        </div>
    );
};

export default Dashboard;