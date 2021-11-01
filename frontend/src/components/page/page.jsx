import React from "react";
import classNames from "classnames";
import classes from "./page.module.scss";

const Page = (props) => {
    const {title, children, noCard} = props;
    return (
        <div className={classNames(classes.page, !noCard ? classes.card : "")}>
            <div className={classNames(classes.container)}>
                {title ? <h2 className={classNames(classes.title)}>{title}</h2> : null}
                {children}
            </div>
        </div>
    );
};

export default Page;
