import { useContext, useEffect, useState } from "react";
import CartContext from "../../../state/cart-context";
import styles from "./HeaderButton.module.css";

const Button = (props) => {
    const [ btnHighlighted, setBtnHighlighted ] = useState(false);

    const cartContext = useContext(CartContext);
    const { items } = cartContext;

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + Number(item.amount);
    }, 0);

    const btnStyles = `${styles.button} ${ btnHighlighted ? styles.bump : ""}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        } 
        setBtnHighlighted(true);

        const timer = setTimeout(() => {
            setBtnHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }

    }, [items]);

    return (
        <button className={btnStyles} onClick={props.onClick}> 
            <span className={styles.iconCart}>
            </span>
            <span>
                Your Cart
            </span>
            <span className={styles.itemsCart}>
                {numberOfCartItems}
            </span>
        </button> 
    )
}

export default Button; 