import { useRef, useState } from "react";
import Input from "../../UI/Input/Input";
import styles from "./MenuItemForm.module.css";

const MenuItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler  = (e) => {
        e.preventDefault();

        const enterdAmount = amountInputRef.current.value;
        const enterdAmountNumber = +enterdAmount; 

        if (enterdAmount.trim().length === 0 || enterdAmountNumber < 1 || enterdAmount > 5 ) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(Number(enterdAmount));
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input 
                label="Amount" 
                ref={amountInputRef} 
                input={{
                    id: `amount${props.id}`,
                    type: "number",
                    min: "1",
                    max: "10",
                    step: "1",
                    defaultValue: "1"
                }} 
            />
            <button> +Add </button>
            {
                !amountIsValid && <p> Please enter a vaild amount </p>
            }
        </form>
    );
}

export default MenuItemForm;