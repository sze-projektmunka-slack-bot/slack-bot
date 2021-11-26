import React from "react";
import classNames from "classnames";
import classes from "./selectField.module.scss";

const SelectField = (props) => {
    //options felépítés minta:
    // {
    //  {
    //      value: 'test',
    //      label: 'test'
    //  },
    // }
    const {label, className, style, options, reduxFormData, onChange, name,required} = props;

    return (
        <div className={classNames(classes.inputGroup)}>
            <label>{label}</label>
            {reduxFormData && reduxFormData.meta.touched && reduxFormData.meta.error &&
            <span className={classes.error}>{reduxFormData.meta.error}</span>}
            <div className={classes.selectWrapper}>
                <select {...(reduxFormData ? (reduxFormData.input) : {onChange:onChange, name:name,required:required})} style={{...(style ? style : {})}}
                        className={classNames(className,
                            classes.input,
                            reduxFormData && reduxFormData.meta.touched && reduxFormData.meta.error ? classes.inputError : "")}
                        
                >
                    {options.map((option, key) => {
                        return <option key={key} value={option.value}>{option.label}</option>
                    })}
                </select>
            </div>

        </div>
    );
};

export default SelectField;
