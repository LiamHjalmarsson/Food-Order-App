import styles from "./AvailabelOnMenu.module.css";
import Card from "../UI/Card/Card";
import MenuItem from "./MenuItem/MenuItem";

const arrayOfMenu = [
    {
        id: 1,
        title: "Pizza",
        description: "The one and only pizza",
        price: 39
    },
    {
        id: 2,
        title: "Fish",
        description: "Right from the ocean and to your home",
        price: 60
    },
    {
        id: 3,
        title: "Sushi",
        description: "The best sushi fresh from the ocean and made on the boat",
        price: 80
    }
];

const AvailabelOnMenu = () => {

    const menuList = arrayOfMenu.map((meal) =>  
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