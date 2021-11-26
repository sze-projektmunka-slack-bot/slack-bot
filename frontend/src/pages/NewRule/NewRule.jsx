import classNames from "classnames";
import Button from "../../components/button/button";
import Page from "../../components/page/page";
import { connect } from 'react-redux';
import SelectField from "../../components/select-field/selectField";
import classes from "./NewRule.module.scss";
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
    const [workspaceName, setWorkspaceName] = useState([]);
    const [triggers, setTriggers] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(async () => {
        async function getWorkspaces() {
            setLoading(true);
            let error;
            const response = await backendApi.get('/workspaces', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).catch((err) => {
                error = err;
                console.log(err);
            });

            if (response) {
                for (let index = 0; index < response.data.length; index++) {
                    if(response.data[index].workspace_id == id){
                        setWorkspaceName(response.data[index].team_name);
                    }
                }
            } else {
                toastr.error(error, 'Hiba történt');
            }
            setLoading(false);
        }
        async function getTriggers() {
            setLoading(true);
            let error;
            const response = await backendApi.get('/triggers', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).catch((err) => {
                error = err;
                console.log(err);
            });

            if (response) {
                console.log(response.data);
                setTriggers(response.data);
            } else {
                toastr.error(error, 'Hiba történt');
            }
            setLoading(false);
        }
        await getWorkspaces();
        await getTriggers();

    }, [props.isLoggedIn, id]);

    const getFormattedTriggers =() => {
        
    };

    return ( <Page noCard > 
                <h1>Új szabály hozzáadása {workspaceName} workspace-hez</h1>
                {loading && <h3>Töltés...</h3>}
                <SelectField label="Eseményindító" reduxFormData={{
                    input: {},
                    meta: {
                        touched: false,
                        error: ""
                    },
                }} options={[
                    {
                        label: "Lorem ipsum dolor sit amet",
                        value: "option_3"
                    }
                ]}/>
            </Page>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.token
    };
};
export default connect(mapStateToProps)(Workspace);