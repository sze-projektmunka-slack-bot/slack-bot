import React from "react";
import classNames from "classnames";
import classes from "./checkerField.module.scss";

const CheckerField = (props) => {
    //type csak checkbox vagy radio
    //options felépítés minta:
    // {
    //  {
    //      value: 'test',
    //      label: 'test'
    //  },
    // }
    const {label, type, className, style, options, reduxFormData, color} = props;
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
        <div className={classNames(classes.inputGroup, reduxFormData && reduxFormData.meta.touched && reduxFormData.meta.error ? classes.inputError : "")}>
            <label>{label}</label>
            {reduxFormData && reduxFormData.meta.touched && reduxFormData.meta.error &&
            <span className={classes.error}>{reduxFormData.meta.error}</span>}
            {options.map((option, key) => {
                return <label key={key} className={classes.optionLabel}><input
                    type={type ?? "checkbox"}
                    className={
                        classNames(
                            className,
                            classes.input,
                            getColorClass()
                        )
                    }
                    style={{...(style ? style : {})}}
                    {...(reduxFormData ? (reduxFormData.input) : {})}
                    value={option.value}
                />{option.label}</label>
            })}
        </div>
    );
};

export default CheckerField;
