import React from "react";
import Page from "../../components/page/page";
import Button from "../../components/button/button";

const Home = (props) => {
    return (
        <Page title="Bemutató oldal">
            <div>
                <Button>Default</Button>
                <hr/>
                <Button color="blue">Color: blue</Button>
                <Button color="blue" isHollow={true}>Color: blue, isHollow: true</Button>
                <hr/>
                <Button color="red">Color: red</Button>
                <Button color="red" isHollow={true}>Color: red, isHollow: true</Button>
                <hr/>
                <Button color="yellow">Color: yellow</Button>
                <Button color="yellow" isHollow={true}>Color: yellow, isHollow: true</Button>
                <hr/>
                <Button onClick={() => alert("Test alert")}>onClick alert</Button>

            </div>
        </Page>
    );
};

export default Home;
