import classNames from "classnames";
import Button from "../../components/button/button";
import Page from "../../components/page/page";
import { connect } from 'react-redux';
import classes from "./Workspace.module.scss";
import {
    Link, useParams
} from 'react-router-dom';
import {
    useEffect,
    useState
} from "react";
import backendApi from "../../apis/backend";
import * as toastr from "toastr";


const Workspace = (props) => {
    let { id } = useParams();
    return ( <Page noCard > 
                <h1>{id}</h1>
            </Page>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.token
    };
};
export default connect(mapStateToProps)(Workspace);