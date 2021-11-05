import React from "react";
import classNames from "classnames";
import classes from "./button.module.scss";

const Button = (props) => {
    const {children, type, className, onClick, style, color, isHollow, isLarge} = props;

    const getColorClass = () => {
        if (color === "red") {
            return classes.red;
        }
        if (color === "blue") {
            return classes.blue;
        }
        if (color === "yellow") {
            return classes.yellow;
        }
        return classes.blue;
    }

    return (
        <div
            type={type ?? "button"}
            className={
                classNames(
                    className,
                    classes.button,
                    getColorClass(),
                    isHollow ? classes.hollow : "",
                    isLarge ? classes.large : "",
                )
            }
            onClick={onClick ?? null}
            style={{...(style ? style : {})}}
        >
            {children}
        </div>
    );
};

export default Button;
