const ModalOverLay = (props) => {
    return <div className={props.modalClass}>
        <div className={props.contentClass}>{props.children}</div>
    </div>
}

export default ModalOverLay;