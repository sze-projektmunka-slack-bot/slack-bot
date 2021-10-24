import React from "react";
import classNames from "classnames";
import classes from "./page.module.scss";

const Page = (props) => {
    const {title, children, noCard} = props;
    return (
        <div className={classNames(classes.page, !noCard ? classes.card : "")}>
            {title ? <h2 className={classNames(classes.title)}>{title}</h2> : null}
            <div>
                {children}
            </div>
        </div>
    );
};

export default Page;
