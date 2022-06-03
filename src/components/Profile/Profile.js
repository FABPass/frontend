import styles from "./Profile.module.css"
import {useEffect, useState} from "react";
import {Request} from "../../api/Request";
import {profileInformation, saveProfileInformation} from "../../api/routes";
import {useNotification} from "../Notifications/NotificationProvider";


export const Profile = () => {

    const [userData, setUserData] = useState();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [oldPw, setOldPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [newPwRepeat, setNewPwRepeat] = useState('');

    useEffect(()=>{
        Request(profileInformation+localStorage.getItem('email'),"GET")
            .then((response) =>{
                const user = response.data
                setUserData(user);
                setFirstName(user.name);
                setLastName(user.surname);
                setEmail(user.email);
                setPhone(user.phone)
            })
    },[])

    const dispatch = useNotification()

    const handleNewNotification = (status, message) => {
        dispatch({
            type: status,
            message: message,
        })
    }


    const cancelButton = (e) => {
        e.preventDefault();

        setFirstName(userData.name);
        setLastName(userData.surname);
        setEmail(userData.email);
        setPhone(userData.phone);
        setOldPw("");
        setNewPw("");
        setNewPwRepeat("");
    }

    const submitButton = (e) => {
        e.preventDefault();


        if(firstName === '') {
            console.log("First name: ", firstName)
            handleNewNotification("ERROR", "First name shouldn't be empty")
        }
        else if (lastName === '') handleNewNotification("ERROR", "Last name shouldn't be empty")
        else if (email === '') handleNewNotification("ERROR", "Email shouldn't be empty")
        else if (phone === '') handleNewNotification("ERROR", "phone shouldn't be empty")

        else if(newPw !== '' && oldPw === '') handleNewNotification("ERROR", "Enter old password!")

        else if(oldPw === '' && newPw === '' && newPwRepeat === ''){
            let newData = userData
            newData.name = firstName
            newData.surname = lastName
            newData.email = email
            newData.phone = phone


            Request(saveProfileInformation,"PUT", newData)
                .then((resp) => {
                    if(resp && resp.status=== 200 ) handleNewNotification("SUCCESS", "Profile information updated")
                } )
                .catch(err => {
                    handleNewNotification("ERROR", "Phone or email is already in use!")
                })


        }
        else{
            if(oldPw !== '' && newPw === newPwRepeat){
                let newData = userData
                newData.name = firstName
                newData.surname = lastName
                newData.email = email
                newData.phone = phone
                newData.password.password = newPw

                Request(saveProfileInformation,"PUT", newData)
                    .then((resp) => {
                        if(resp && resp.status=== 200 ) handleNewNotification("SUCCESS", "Profile information updated")
                    } )
                    .catch(err => {
                        handleNewNotification("ERROR", "Phone or email is already in use!")
                    })
            }
            else handleNewNotification("ERROR", "Enter the same new password and repeat password")
        }



    }

    return(
        <div className={styles.wrapper}>
            <div className={`row ${styles.title}`}>
                <h1>Profile</h1>
                <h5>Update your personal details or password</h5>
            </div>
            <form className={"row mt-3"}>
                <div className={"row justify-content-center"}>
                    <div className={`col-6 ${styles.personal} ${styles.labelLeft}`}>
                        <h4 className={"pb-3"}>Personal information</h4>
                        <div className={"row "}>
                            <div className={"col"}>
                                <label htmlFor="fname">First name:</label>
                            </div>
                            <div className={"col"}>
                                <label htmlFor="lname" className="form-label">Last name:</label>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className={"col input-group"}>
                                <span className={"input-group-text"}>
                                    <i className="bi bi-person-fill text-secondary"></i>
                                </span>
                                <input type={"text"} data-testid={"p-fname-input"} className={"form-control"} value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                            </div>
                            <div className={"col input-group"}>
                                <span className={"input-group-text"}>
                                    <i className="bi bi-person-fill text-secondary"></i>
                                </span>
                                <input type={"text"} data-testid={"p-lname-input"} className={"form-control"} value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                            </div>
                        </div>
                        <div className={"row mt-3"}>
                            <div className={"col"}>
                                <label htmlFor="email" className="form-label">Email:</label>
                            </div>
                            <div className={"col"}>
                                <label htmlFor="phone" className="form-label">Phone:</label>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className={"col input-group"}>
                                <span className={"input-group-text"}>
                                    <i className="bi bi-envelope-fill text-secondary"></i>
                                </span>
                                <input type={"text"} data-testid={"p-email-input"} className={"form-control"} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className={"col input-group"}>
                                <span className={"input-group-text"}>
                                    <i className="bi bi-telephone-fill text-secondary"></i>
                                </span>
                                <input type={"text"} data-testid={"p-phone-input"} className={"form-control"} value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                            </div>
                        </div>

                    </div>
                    <div className={`col-5 ${styles.password} ${styles.labelLeft}`}>
                        <h4 className={"pb-3"}>Change password</h4>
                        <div className={"row mt-3"}>
                            <div className={"col"}>
                                <label htmlFor="oldpw" className="form-label">Old password:</label>
                            </div>
                            <div className={"col me-4 input-group"}>
                                <span className={"input-group-text"}>
                                    <i className="bi bi-unlock-fill text-secondary"></i>
                                </span>
                                <input type={"password"} data-testid={"p-oldpw-input"} className={"form-control"} value={oldPw} onChange={(e)=>{setOldPw(e.target.value)}}/>
                            </div>
                        </div>
                        <div className={"row mt-2"}>
                            <div className={"col"}>
                                <label htmlFor="newpw" className="form-label">New password:</label>
                            </div>
                            <div className={"col me-4 input-group"}>
                                <span className={"input-group-text"}>
                                    <i className="bi bi-lock-fill text-secondary"></i>
                                </span>
                                <input type={"password"} data-testid={"p-newpw-input"} className={"form-control"} value={newPw} onChange={(e)=>{setNewPw(e.target.value)}}/>
                            </div>
                        </div>
                        <div className={"row mt-2"}>
                            <div className={"col"}>
                                <label htmlFor="repnewpw" className="form-label">Repeat new password:</label>
                            </div>
                            <div className={"col me-4 input-group"}>
                                <span className={"input-group-text"}>
                                    <i className="bi bi-lock-fill text-secondary"></i>
                                </span>
                                <input type={"password"} data-testid={"p-repeatnewpw-input"} className={"form-control"} value={newPwRepeat} onChange={(e)=>{setNewPwRepeat(e.target.value)}}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`row ${styles.center} mt-3`}>
                    <div className={"col"}>
                        <button data-testid={"p-savebtn"} className={styles.passwordbtn} onClick={submitButton}>Save</button>
                    </div>
                    <div className={"col"}>
                        <button data-testid={"p-cancelbtn"} className={styles.passwordbtn} onClick={cancelButton}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}


