import React, { Fragment } from "react";
import Image from "../../UI/Image/Image";
import HeaderButton from "./HeaderButton"

import styles from "./Header.module.css";
import headerImage from "../../../assets/food-cort-for-you.jpg";


const Header = (props) => {
    return (
        <Fragment>
            <header className={styles.header}>
                <h1>Food Court For You</h1>
                <HeaderButton onClick={props.onShowCart}/>
            </header>
            <div className={styles["header-image"]}>
                <Image src={headerImage}/> 
            </div>
        </Fragment>
    ); 
}

export default Header;