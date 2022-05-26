import styles from "./Profile.module.css"

export const Profile = () => {

    return(
        <div className={styles.wrapper}>
            <div className={`row ${styles.title}`}>
                <h1>Profile</h1>
                <h5>Update your personal details or password</h5>
            </div>
            <form className={"row mt-3"}>
                <div className={"row justify-content-center"}>
                    <div className={`col-6 ${styles.personal} ${styles.labelLeft}`}>
                        <h4>Personal information</h4>
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
                                <input type={"text"} className={"form-control"}/>
                            </div>
                            <div className={"col input-group"}>
                                <span className={"input-group-text"}>
                                    <i className="bi bi-person-fill text-secondary"></i>
                                </span>
                                <input type={"text"} className={"form-control"}/>
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
                                <input type={"text"} className={"form-control"}/>
                            </div>
                            <div className={"col input-group"}>
                                <span className={"input-group-text"}>
                                    <i className="bi bi-telephone-fill text-secondary"></i>
                                </span>
                                <input type={"text"} className={"form-control"}/>
                            </div>
                        </div>

                    </div>
                    <div className={`col-5 ${styles.password} ${styles.labelLeft}`}>
                        <h4>Change password</h4>
                        <div className={"row mt-3"}>
                            <div className={"col"}>
                                <label htmlFor="oldpw" className="form-label">Old password:</label>
                            </div>
                            <div className={"col me-4 input-group"}>
                                <span className={"input-group-text"}>
                                    <i className="bi bi-unlock-fill text-secondary"></i>
                                </span>
                                <input type={"password"} className={"form-control"}/>
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
                                <input type={"password"} className={"form-control"}/>
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
                                <input type={"password"} className={"form-control"}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`row ${styles.center} mt-3`}>
                    <div className={"col"}>
                        <button className={styles.passwordbtn}>Save</button>
                    </div>
                    <div className={"col"}>
                        <button className={styles.passwordbtn}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}


