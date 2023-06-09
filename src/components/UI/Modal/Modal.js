import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import Backdrop from "./Backdrop";
import ModalOverLay from "./ModalOverlay";

const Modal = (props) => {
    let portal = document.getElementById("overlays");

    return <Fragment>
        {ReactDOM.createPortal(<Backdrop className={styles.backdrop} onClose={props.onClose} />, portal)}
        {ReactDOM.createPortal(<ModalOverLay modalClass={styles.modal} contentClass={styles.content}>
            {props.children}
        </ModalOverLay>, portal)}
    </Fragment>
}

export default Modal;