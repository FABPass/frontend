import React from 'react';
import styles from './EditDataItem.module.css';

const EditDataItem = (props) => {
    return (
        props.trigger ?
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <h3 id={styles.headline}>Edit data item</h3>
                <button className={styles.editFormBtn} id={styles.saveBtn}>Save</button>
                <button className={styles.editFormBtn} id={styles.closeBtn} onClick={() => props.setTrigger(false)}>Close</button>
                {props.children}
            </div>
        </div> :
            null
    );
};

export default EditDataItem;