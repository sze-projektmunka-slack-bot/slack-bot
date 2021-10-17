import React from "react";
import classNames from "classnames";
import classes from "./imageSelectField.module.scss";
import * as url from "url";

const ImageSelectField = (props) => {
    //type csak checkbox vagy radio
    //options felépítés minta:
    // {
    //  {
    //      value: 'test',
    //      image: 'https://placekitten.com/300/300'
    //  },
    // }ss
    const {label, className, style, options, reduxFormData, color} = props;
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
            <div className={classes.choicesWrapper}>
            {options.map((option) => {
                return <label className={classes.optionLabel} style={{backgroundImage: `url(${option.image})`}}><input
                    type="checkbox"
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
                /></label>
            })}
            </div>
        </div>
    );
};

export default ImageSelectField;
