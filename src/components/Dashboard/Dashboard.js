import React, {useEffect, useState} from 'react';
import axios from "axios";
import {deleteDIRoute, editDIRoute, getUserDataGroups, getUserDataItems} from "../../api/routes";
import styles from './Dashboard.module.css';
import CryptoJS from "crypto-js";
import DataItemCard from "./DataItemCard/DataItemCard.js";
import 'reactjs-popup/dist/index.css';
import {confirm} from "react-confirm-box";
import {useNotification} from "../Notifications/NotificationProvider";
import {Request} from "../../api/Request";


const Dashboard = () => {

    const [rerender, setRerender] = useState(0);
    const [dataGroups, setDataGroups] = useState(null);
    const [dataItems, setDataItems] = useState(null);
    const [allDataItems, setAllDataItems] = useState(null);


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

    const editDataItemClick = async (id, name, description, value, dataGroup) => {
        try {
            await axios.patch(editDIRoute + id, {
                "name":name,
                "description":description,
                "value":CryptoJS.AES.encrypt(value, "aesEncryptionKey").toString(),
                "dataGroupId": {
                    "name":dataGroup.name
                }
            });
            handleNewNotification("SUCCESS","Data item successfully edited!");
            setRerender(rerender + 1);
        }
        catch (e) {

        }
    };

    const onDeleteClick = async (id) => {
        const result = await confirm("Are you sure you want to delete the selected data item?");
        if (result)
            await deleteDataItem(id);
    };


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
            setAllDataItems(items);
        }
        catch (e) {

        }
    }


    useEffect(() => {
        Request(getUserDataGroups+localStorage.getItem('userId'),"GET")
            .then((resp) => {
                setDataGroups(resp.data);
                getUsersDataItems();
            })
    }, [rerender]);

    const filterDataItems = (e) => {
        if (e === "All")
            setDataItems(allDataItems);
        else
            setDataItems(allDataItems.filter(s => {
                console.log(s);
                if (s.dataGroupId.name === e) return s;
            }))
    }

    return (
        <div>
            <select className={styles.groupFilter}
                    onChange={(e)=>
                        // setSelectedFilter(
                        //     dataGroups.filter((s) => {
                        //         if (s.name === e.target.value) return s;
                        //     })[0]
                        // )
                        filterDataItems(e.target.value)
                    }
            >
                <option disabled selected className={styles.disabled}>Filter by group...</option>
                <option>All</option>
                { dataGroups!=null ?
                    dataGroups.map((item)=>{
                        return <option value={item.name}>{item.name}</option>
                    }) :
                    <option>Loading</option>
                }
            </select>
            <table id={styles.tableId}>
                {
                    dataItems?.map((item, index) => {
                        return <td>
                            <DataItemCard id={item.id} name={item.name} value={item.value}
                                          description={item.description} key={`${index}-${item.name}`}
                                          dataType={item.dataTypeId.name} dataGroup={item.dataGroupId.name}
                                          onEditClick={editDataItemClick}
                                          onDeleteClick={onDeleteClick}/>
                        </td>
                    })
                }
            </table>
        </div>
    );
};

export default Dashboard;