import { useState } from "react";
import useInput from "../../hooks/use-input";

import styles from "./Checkout.module.css";

const CheckOut = (props) => {
    const isNotEmpety = value => value.trim() !== "";
    const isNotfiveDigits = value => value.trim().length < 5;
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city:true
    });

    const {
        value: enterdName,
        hasError: nameHasError,
        isValid: enterdNameIsValid,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput
    } = useInput(isNotEmpety);

    const {
        value: enterdStreet,
        hasError: streetHasError,
        isValid: enterdStreetIsValid,
        valueChangeHandler: streetChangeHandler,
        inputBlurHandler: streetBlurHandler,
        reset: resetStreetInput
    } = useInput(isNotEmpety);

    const {
        value: enterdPostal,
        hasError: postalHasError,
        isValid: enterdPostalIsValid,
        valueChangeHandler: postalChangeHandler,
        inputBlurHandler: postalBlurHandler,
        reset: resetPostalInput
    } = useInput(isNotEmpety || isNotfiveDigits);

    const {
        value: enterdCity,
        hasError: cityHasError,
        isValid: enterdCityIsValid,
        valueChangeHandler: cityChangeHandler,
        inputBlurHandler: cityBlurHandler,
        reset: resetCityInput
    } = useInput(isNotEmpety);

    
    const confirmHandler = (event) => {
        event.preventDefault();

        setFormInputsValidity({
            name: enterdNameIsValid,
            street: enterdStreetIsValid,
            postalCode: enterdPostalIsValid,
            city:enterdCityIsValid
        });

        const formIsValid = enterdNameIsValid && enterdStreetIsValid && enterdPostalIsValid && enterdCityIsValid

        if (!formIsValid) {
            return;
        }

        props.onSubmit({
            name: enterdName,
            street: enterdStreet,
            postalCode: enterdPostal,
            city: enterdCity
        });

        resetNameInput();
        resetStreetInput();
        resetPostalInput();
        resetCityInput();
    }

    const errorMessage = <p> Filed cant be empety </p>;

    return (
        <form className={styles.form} onSubmit={confirmHandler}>
            <div className={`${styles.control} ${!formInputsValidity.name ? styles.invalid : ""}`}>
                <label htmlFor='name'>Your Name</label>
                <input 
                    type='text' 
                    id='name'
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    value={enterdName}
                />
                { nameHasError && errorMessage }
            </div>
            <div className={`${styles.control} ${!formInputsValidity.street ? styles.invalid : ""}`}>
                <label htmlFor='street'>Street</label>
                <input 
                    type='text' 
                    id='street'
                    onChange={streetChangeHandler}
                    onBlur={streetBlurHandler}
                    value={enterdStreet}
                />
                { streetHasError && errorMessage }
            </div>
            <div className={`${styles.control} ${!formInputsValidity.postalCode ? styles.invalid : ""}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input 
                    type='text' 
                    id='postal'
                    onChange={postalChangeHandler}
                    onBlur={postalBlurHandler}
                    value={enterdPostal}
                />
                { postalHasError && <p> Five characters needed </p> }
            </div>
            <div className={`${styles.control} ${!formInputsValidity.city ? styles.invalid : ""}`}>
                <label htmlFor='city'>City</label>
                <input 
                    type='text' 
                    id='city'
                    onChange={cityChangeHandler}
                    onBlur={cityBlurHandler}
                    value={enterdCity}
                />
                { cityHasError && errorMessage }
            </div>
            <div className={styles.actions}>
                <button type='button' onClick={props.onCancel}>
                Cancel
                </button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
    );
}

export default CheckOut;