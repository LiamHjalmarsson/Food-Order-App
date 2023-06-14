import { useState, useEffect } from "react";

import useHttp from "../../hooks/use-http";

import styles from "./AvailabelOnMenu.module.css";
import Card from "../UI/Card/Card";
import MenuItem from "./MenuItem/MenuItem";

const AvailabelOnMenu = () => {
    const [meals, setMeals] = useState([]);

    const httpRecourse = useHttp();

    const { isLoading, error, sendRequest: fetchMeals } = httpRecourse;

    useEffect(() => {
        const transformTasks = (mealObject) => {
            const loadedMeals = [];
        
            for ( const key in mealObject ) {
                loadedMeals.push(
                    {
                        id: key,
                        key: key,
                        title: mealObject[key].title,
                        description: mealObject[key].description,
                        price: mealObject[key].price,
                    }
                );
            }
        
            setMeals(loadedMeals);
        };
    
        fetchMeals(
            { url: 'https://dummyproject-8a8c0-default-rtdb.europe-west1.firebasedatabase.app/meals.json' },
            transformTasks
        );

    }, [fetchMeals]);

    if (isLoading) {
        return <section className={styles.MealsLoading}>
            <p> Menu loading... </p>
        </section>
    }

    if (error) {
        return <section className={styles.MealsError}>
            <p> {error} </p>
        </section>
    }

    const menuList = meals.map((meal) =>  
        <MenuItem 
            id={meal.id}
            key={meal.id} 
            title={meal.title}
            description={meal.description}
            price={meal.price}
        /> 
    );

    return (
        <section className={styles.menu}>
            <Card>
                <ul>
                    {menuList}
                </ul>
            </Card>
        </section>
    );
}

export default AvailabelOnMenu;