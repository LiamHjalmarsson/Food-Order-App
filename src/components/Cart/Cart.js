import { Fragment, useContext, useState } from "react";
import useHttp from "../../hooks/use-http";

import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import CartContext from "../../state/cart-context";
import CheckOut from "./CheckOut";

const Cart = (props) => {
    const [isCheckOut, setIsCheckOut] = useState(false);
    const cartContext = useContext(CartContext);
    const [didSubmit, setDidSubmit] = useState(false);

    const httpRecourse = useHttp();
    const { isLoading, error, sendRequest: sendCustomerOrder } = httpRecourse;
    
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

    const orderHandler = () => {
        setIsCheckOut(true);
    }

    const submitOrderHandler = async (userData) => {
        sendCustomerOrder(
            {
                url: "https://dummyproject-8a8c0-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: { 
                    user: userData,
                    orderItems: cartContext.items
                }
            }
        );

        setDidSubmit(true);
        
        cartContext.clearCart();

    }

    const modalActions = <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onClose}>
            Close
        </button>
        {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
    </div>;

    const cartModalContent = (
        <Fragment> 
            {cartItems}
                <div className={styles.total}>
                    <span>Total Amount</span>
                    <span>{theTotalAmount}</span>
                </div>
                {isCheckOut && <CheckOut 
                    onCancel={props.onClose} 
                    onSubmit={submitOrderHandler}
                />}
            {!isCheckOut && modalActions}
        </Fragment>
    );

    const isSubmittingModal = <p> Sending order data... </p>

    const didSubmitModalContent = (
        <Fragment>
            <p> Order was successful, we are handeling your order </p>
            <div className={styles.actions}>
                <button className={styles.button} onClick={props.onClose}>
                    Close
                </button>
            </div>;
        </Fragment>
    )

    return (
        <Modal onClose={props.onClose}>
            { !isLoading && !didSubmit && cartModalContent }
            { isLoading && isSubmittingModal }
            { !isLoading && didSubmit && didSubmitModalContent }
        </Modal>
    );
};

export default Cart;