import React from "react";
import classNames from "classnames";
import classes from "./textarea.module.scss";

const Textarea = (props) => {
    const {label, className, style, reduxFormData, onChange, name, required} = props;

    return (
        <div className={classNames(classes.inputGroup)}>
            <label>{label}</label>
            <textarea
                className={
                    classNames(
                        className,
                        classes.input,
                        reduxFormData && reduxFormData.meta.touched && reduxFormData.meta.error ? classes.inputError : ""
                    )
                }
                style={{...(style ? style : {})}}
                {...(reduxFormData ? (reduxFormData.input) : {onChange:onChange, name: name,required:required})}
            ></textarea>
            {reduxFormData && reduxFormData.meta.touched && reduxFormData.meta.error &&
            <span className={classes.error}>{reduxFormData.meta.error}</span>}
        </div>
    );
};

export default Textarea;
