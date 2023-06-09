import React, { Fragment } from "react";
import AvailabelOnMenu from "./AvailabelOnMenu";
import MenuSummary from "./MenuSummary";

const Menu = () => {
    return (
        <Fragment>
            <MenuSummary />
            <AvailabelOnMenu />
        </Fragment>
    );
}

export default Menu;