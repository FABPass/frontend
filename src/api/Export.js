import React from 'react'
import {Request} from "./Request";
import {useNotification} from "../components/Notifications/NotificationProvider";
import {getUserDataItems} from "./routes";
import CryptoJS from "crypto-js";


const HandleNewNotification = (status, message) => {
    const dispatch = useNotification()
    dispatch({
        type: status,
        message: message,
    })
}

const downloadFile = ({ data, fileName, fileType }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType })
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
}

export const exportToJson = e => {

    const decryptPassword = (encryptedPass) => {
        let bytes = CryptoJS.AES.decrypt(encryptedPass, "aesEncryptionKey");
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    const decryptdata = (data) => {
        return data.map(item => {
            item.value = decryptPassword(item.value);
            if (item.dataTypeId.name === "payment_card")
                item.description = decryptPassword(item.description);
            return item;
        })

    }

    e.preventDefault()
    Request(getUserDataItems+localStorage.getItem('userId'),"GET")
        .then(res => {
            downloadFile({
                data: JSON.stringify(decryptdata(res.data),null,'\t'),
                fileName: 'Passwords.json',
                fileType: 'text/json',
            })
            HandleNewNotification("SUCCESS","Successfully exported")
        })
        .catch(err => {
            HandleNewNotification("ERROR","Try again later")
        })

}




