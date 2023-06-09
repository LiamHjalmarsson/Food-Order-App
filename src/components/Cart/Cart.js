import { useContext } from "react";
import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import CartContext from "../../state/cart-context";

const Cart = (props) => {
    const cartContext = useContext(CartContext);

    const { items, totalAmount } = cartContext;

    const theTotalAmount = `${totalAmount.toFixed(2)}`;
    const hasItems = items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartContext.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartContext.addItem({ ...item, amount: 1 });
    };

    const cartItems = (
        <ul className={styles['cart-items']}>
            {items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.title}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{theTotalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onClose}>
                    Close
                </button>
                {hasItems && <button className={styles.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;