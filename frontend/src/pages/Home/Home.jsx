import React from "react";
import Page from "../../components/page/page";
import Button from "../../components/button/button";
import InputField from "../../components/input-field/inputField";
import CheckerField from "../../components/checker-field/checkerField";
import {options} from "jest-runtime/build/cli/args";
import ImageSelectField from "../../components/image-select-field/imageSelectField";
import SelectField from "../../components/select-field/selectField";
import * as toastr from "toastr";


const Home = (props) => {
    function testNotifications() {
        toastr.warning('Lorem ipsum dolor sit amet, consectetur', 'Lorem ipsum');
        toastr.success('Lorem ipsum dolor sit amet, consectetur', 'Lorem ipsum');
        toastr.error('Lorem ipsum dolor sit amet, consectetur', 'Lorem ipsum');
    }
    return (
        <Page title="Bemutató oldal">
            <h3>Gombok</h3>
            <div>
                <Button>Default</Button>
                <hr/>
                <Button color="blue">blue</Button>
                <Button color="blue" isHollow={true}>blue isHollow</Button>
                <Button color="blue" isLarge={true}>blue isLarge</Button>
                <Button color="blue" isHollow={true} isLarge={true}>blue isHollow isLarge</Button>
                <hr/>
                <Button color="red">red</Button>
                <Button color="red" isHollow={true}>red isHollow</Button>
                <Button color="red" isLarge={true}>red isLarge</Button>
                <Button color="red" isHollow={true} isLarge={true}>red isHollow isLarge</Button>
                <hr/>
                <Button color="yellow">yellow</Button>
                <Button color="yellow" isHollow={true}>yellow isHollow</Button>
                <Button color="yellow" isLarge={true}>yellow isLarge</Button>
                <Button color="yellow" isHollow={true} isLarge={true}>yellow isHollow isLarge</Button>
                <hr/>
                <Button onClick={() => alert("Test alert")}>onClick alert</Button>
            </div>
            <h3>Sima inputok</h3>
            <div>
                <InputField label="Teszt label"/>
                <InputField label="Teszt label number" type="number"/>
                <InputField label="Teszt label password" type="password"/>
                <InputField label="Teszt label password" type="password"/>
                <InputField label="Teszt label with error" type="password" reduxFormData={{
                    input: {},
                    meta: {
                        touched: true,
                        error: "Ez egy error, ajjaj!"
                    },
                }}/>
                <h4>Checkboxes</h4>
                <CheckerField label="Teszt label normal" options={[
                    {
                        label: "Option 1",
                        value: "option_1"
                    },
                    {
                        label: "Option 2",
                        value: "option_2"
                    },
                    {
                        label: "Option 3",
                        value: "option_3"
                    }
                ]}/>
                <CheckerField label="Teszt label red" color="red" options={[
                    {
                        label: "Option 1",
                        value: "option_1"
                    },
                    {
                        label: "Option 2",
                        value: "option_2"
                    },
                    {
                        label: "Option 3",
                        value: "option_3"
                    }
                ]}/>
                <CheckerField label="Teszt label red" color="yellow" options={[
                    {
                        label: "Option 1",
                        value: "option_1"
                    },
                    {
                        label: "Option 2",
                        value: "option_2"
                    },
                    {
                        label: "Option 3",
                        value: "option_3"
                    }
                ]}/>
                <CheckerField label="Teszt label red" reduxFormData={{
                    input: {},
                    meta: {
                        touched: true,
                        error: "Ez egy error, ajjaj!"
                    },
                }} options={[
                    {
                        label: "Option 1",
                        value: "option_1"
                    },
                    {
                        label: "Option 2",
                        value: "option_2"
                    },
                    {
                        label: "Option 3",
                        value: "option_3"
                    }
                ]}/>
                <h4>Radio</h4>
                <CheckerField type="radio" label="Teszt label normal" options={[
                    {
                        label: "Option 1",
                        value: "option_1"
                    },
                    {
                        label: "Option 2",
                        value: "option_2"
                    },
                    {
                        label: "Option 3",
                        value: "option_3"
                    }
                ]}/>
                <CheckerField type="radio" label="Teszt label red" color="red" options={[
                    {
                        label: "Option 1",
                        value: "option_1"
                    },
                    {
                        label: "Option 2",
                        value: "option_2"
                    },
                    {
                        label: "Option 3",
                        value: "option_3"
                    }
                ]}/>
                <CheckerField type="radio" label="Teszt label yellow" color="yellow" options={[
                    {
                        label: "Option 1",
                        value: "option_1"
                    },
                    {
                        label: "Option 2",
                        value: "option_2"
                    },
                    {
                        label: "Option 3",
                        value: "option_3"
                    }
                ]}/>
                <CheckerField type="radio" label="Teszt label error" reduxFormData={{
                    input: {},
                    meta: {
                        touched: true,
                        error: "Ez egy error, ajjaj!"
                    },
                }} options={[
                    {
                        label: "Option 1",
                        value: "option_1"
                    },
                    {
                        label: "Option 2",
                        value: "option_2"
                    },
                    {
                        label: "Option 3",
                        value: "option_3"
                    }
                ]}/>
                <h2>Image select fields</h2>
                <ImageSelectField label="Teszt label" reduxFormData={{
                    input: {},
                    meta: {
                        touched: false,
                        error: "Ez egy error, ajjaj!"
                    },
                }} options={[
                    {
                        image: "https://placekitten.com/300/300",
                        value: "option_1"
                    },
                    {
                        image: "https://placekitten.com/400/400",
                        value: "option_2"
                    },
                    {
                        image: "https://placekitten.com/300/300",
                        value: "option_1"
                    },
                    {
                        image: "https://placekitten.com/400/400",
                        value: "option_2"
                    },
                    {
                        image: "https://placekitten.com/300/300",
                        value: "option_1"
                    },
                    {
                        image: "https://placekitten.com/400/400",
                        value: "option_2"
                    },
                    {
                        image: "https://placekitten.com/500/400",
                        value: "option_3"
                    }
                ]}/>
                <ImageSelectField label="Teszt label error" reduxFormData={{
                    input: {},
                    meta: {
                        touched: true,
                        error: "Ez egy error, ajjaj!"
                    },
                }} options={[
                    {
                        image: "https://placekitten.com/300/300",
                        value: "option_1"
                    },
                    {
                        image: "https://placekitten.com/400/400",
                        value: "option_2"
                    },
                    {
                        image: "https://placekitten.com/300/300",
                        value: "option_1"
                    },
                    {
                        image: "https://placekitten.com/400/400",
                        value: "option_2"
                    },
                    {
                        image: "https://placekitten.com/300/300",
                        value: "option_1"
                    },
                    {
                        image: "https://placekitten.com/400/400",
                        value: "option_2"
                    },
                    {
                        image: "https://placekitten.com/500/400",
                        value: "option_3"
                    }
                ]}/>
                <h2>Select fields</h2>
                <SelectField label="Teszt label" reduxFormData={{
                    input: {},
                    meta: {
                        touched: false,
                        error: "Ez egy error, ajjaj!"
                    },
                }} options={[
                    {
                        label: "Please select...",
                        value: "option_1"
                    },
                    {
                        label: "Lorem ipsum dolor sit amet",
                        value: "option_2"
                    },
                    {
                        label: "Lorem ipsum dolor sit amet",
                        value: "option_1"
                    },
                    {
                        label: "Lorem ipsum dolor sit amet",
                        value: "option_2"
                    },
                    {
                        label: "Lorem ipsum dolor sit amet",
                        value: "option_1"
                    },
                    {
                        label: "Lorem ipsum dolor sit amet",
                        value: "option_2"
                    },
                    {
                        label: "Lorem ipsum dolor sit amet",
                        value: "option_3"
                    }
                ]}/>
                <SelectField label="Teszt label error" reduxFormData={{
                    input: {},
                    meta: {
                        touched: true,
                        error: "Ez egy error, ajjaj!"
                    },
                }} options={[
                    {
                        label: "Please select...",
                        value: "option_1"
                    },
                    {
                        label: "Lorem ipsum dolor sit amet",
                        value: "option_2"
                    },
                    {
                        label: "Lorem ipsum dolor sit amet",
                        value: "option_1"
                    },
                    {
                        label: "Lorem ipsum dolor sit amet",
                        value: "option_2"
                    },
                    {
                        label: "Lorem ipsum dolor sit amet",
                        value: "option_1"
                    },
                    {
                        label: "Lorem ipsum dolor sit amet",
                        value: "option_2"
                    },
                    {
                        label: "Lorem ipsum dolor sit amet",
                        value: "option_3"
                    }
                ]}/>

            </div>
            <h2>toastr.js</h2>
            <div>
                <Button onClick={testNotifications}>click to display test notification</Button>
            </div>
        </Page>
    );
};

export default Home;
