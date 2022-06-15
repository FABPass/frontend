import React, {useEffect, useState} from 'react';
import axios from "axios";
import {deleteDIRoute, getUserDataItems} from "../../api/routes";
import styles from './Dashboard.module.css';
import CryptoJS from "crypto-js";
import DataItemCard from "./DataItemCard/DataItemCard.js";
import 'reactjs-popup/dist/index.css';
import {confirm} from "react-confirm-box";
import {useNotification} from "../Notifications/NotificationProvider";


const Dashboard = () => {

    const[rerender, setRerender] = useState(0);

    const dispatch = useNotification();

    const handleNewNotification = (status, message) => {
        dispatch({
            type: status,
            message: message,
        })
    }

    const deleteDataItem = async (id) => {
        try {
            await axios.delete('' + deleteDIRoute + id);
            handleNewNotification("SUCCESS","Data item successfully deleted!");
            setRerender(rerender + 1);
        }
        catch (e) {

        }
    }

    const onDeleteClick = async (id) => {
        const result = await confirm("Are you sure you want to delete the selected data item?");
        if (result)
            await deleteDataItem(id);
    };

    const [dataItems, setDataItems] = useState(null);

    const decryptPassword = (encryptedPass) => {
        let bytes = CryptoJS.AES.decrypt(encryptedPass, "aesEncryptionKey");
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    async function getUsersDataItems() {
        try {
            const response = await axios.get(getUserDataItems + localStorage.getItem('userId'));
            let items = response?.data.map((item, index) => {
                item.value = decryptPassword(item.value);
                if (item.dataTypeId.name === "payment_card")
                    item.description = decryptPassword(item.description);
                return item;
            });
            setDataItems(items);
        }
        catch (e) {

        }
    }


    useEffect(() => {
        getUsersDataItems();
    }, [rerender]);

    return (
        <table id={styles.tableId}>
            {
                dataItems?.map((item, index) => {
                    return <td>
                        <DataItemCard id={item.id} name={item.name} value={item.value}
                                      description={item.description} key={`${index}-${item.name}`}
                                      dataType={item.dataTypeId.name} dataGroup={item.dataGroupId.name}
                                      onDeleteClick={onDeleteClick}/>
                    </td>
                })
            }
        </table>
    );
};

export default Dashboard;