import React from "react";
import classNames from "classnames";
import classes from "./inputField.module.scss";

const InputField = (props) => {
    const {label, type, className, style, reduxFormData} = props;

    return (
        <div className={classNames(classes.inputGroup)}>
            <label>{label}</label>
            <input
                type={type ?? "text"}
                className={
                    classNames(
                        className,
                        classes.input,
                        reduxFormData && reduxFormData.meta.touched && reduxFormData.meta.error ? classes.inputError : ""
                    )
                }
                style={{...(style ? style : {})}}
                {...(reduxFormData ? (reduxFormData.input) : {})}
            />
            {reduxFormData && reduxFormData.meta.touched && reduxFormData.meta.error &&
            <span className={classes.error}>{reduxFormData.meta.error}</span>}
        </div>
    );
};

export default InputField;
