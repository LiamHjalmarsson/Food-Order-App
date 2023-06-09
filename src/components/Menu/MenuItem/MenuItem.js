import { useContext } from "react";
import MenuItemForm from "./MenuItemForm";
import styles from "./MenuItem.module.css";
import CartContext from "../../../state/cart-context";

const MenuItem = (props) => {
    const cardContext = useContext(CartContext);

    const addToCartHandler = (amount) => {
        cardContext.addItem({
            id: props.id,
            title: props.title,
            amount: amount,
            price: props.price
        });
    }

    return (
        <li className={styles.menu}>
            <div>
                <h3 className={styles.title}> {props.title} </h3>
                <div className={styles.description}>
                    {props.description}
                </div>
                <div className={styles.price}>
                    {props.price}
                </div>
            </div>
            <div>
                <MenuItemForm id={props.id} onAddToCart={addToCartHandler} />
            </div>
        </li>
    );
}

export default MenuItem;