import React, {useState} from "react";
import classNames from "classnames";
import Slider from 'react-input-slider';
import classes from "./rangeField.module.scss";
import colors from "../../configs/colors";

const RangeField = (props) => {
    const [value, setValue] = useState(0);
    const {label, reduxFormData, min, max, color, step} = props;
    const getTrackColorHex = () => {
        if (color === "red") {
            return colors.darkRed;
        }
        if (color === "blue") {
            return colors.darkBlue;
        }
        if (color === "yellow") {
            return colors.darkYellow;
        }
        return colors.darkBlue;
    }
    const getThumbColorHex = () => {
        if (color === "red") {
            return colors.mainRed;
        }
        if (color === "blue") {
            return colors.mainBlue;
        }
        if (color === "yellow") {
            return colors.mainYellow;
        }
        return colors.mainBlue;
    }
    return (
        <div>
            <div className={classNames(classes.inputGroup)}>
                <label>{label}</label>
                <div>
                    <input
                        type="hidden"
                        value={value}
                        {...(reduxFormData ? (reduxFormData.input) : {})}
                    />
                    <Slider
                        axis="x"
                        x={value}
                        xmin={min ?? 0}
                        xmax={max ?? 100}
                        xstep={step ?? 1}
                        onChange={({x}) => setValue(x)}
                        styles={{
                            track: {
                                backgroundColor: colors.grey,
                            },
                            active: {
                                backgroundColor: getTrackColorHex()
                            },
                            thumb: {
                                backgroundColor: getThumbColorHex(),
                            },
                        }}
                    />
                    <p>{value}</p>

                </div>
            </div>
            {reduxFormData && reduxFormData.meta.touched && reduxFormData.meta.error &&
            <span className={classes.error}>{reduxFormData.meta.error}</span>}


        </div>
    );
};

export default RangeField;
