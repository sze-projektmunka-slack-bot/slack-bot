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
    const [workspaceName, setWorkspaceName] = useState([]);
    const [rules, setRules] = useState([]);
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
        async function getRules() {
            setLoading(true);
            let error;
            const response = await backendApi.get(`/workspaces/rules/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).catch((err) => {
                error = err;
                console.log(err);
            });

            if (response) {
                setRules(response.data);
            } else {
                toastr.error(error, 'Hiba történt');
            }
            setLoading(false);
        }
        await getWorkspaces();
        await getRules();


    }, [props.isLoggedIn, id]);

    async function deleteRule(ruleId) {
        setLoading(true);
        let error;
        const response = await backendApi.delete(`/workspaces/rules/${ruleId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).catch((err) => {
            error = err;
            console.log(err);
        });

        if (response) {
            setRules(rules.filter(rule => rule.rule_id !== ruleId));
            toastr.success("A szabály sikeresen törölve lett!", 'Sikeres törlés');
        } else {
            toastr.error(error, 'Hiba történt');
        }
        setLoading(false);
    }

    return ( <Page noCard > 
                <h1>{workspaceName} workspace kezelése</h1>
                <Button onClick={() => window.location.href = `/workspaces/${id}/rules/add`} >
                    Új szabály hozzáadása 
                </Button> 
                {loading && <h3>Töltés...</h3>}
                {(loading === false && rules.length === 0) && <h3>Önnek nincs egy szabálya sem.</h3>}
                <div className={classes.rulesList}>
                    {rules.map(element => {
                        return (
                                    <div key={element.rule_id}>
                                        <div className={classes.rulesListItem}>
                                        <span>{element.trigger.name} -&gt; {element.response.name}</span>

                                            <pre>
                                                {JSON.stringify(element.trigger,null,2)}
                                            </pre>
                                            <pre>
                                                {JSON.stringify(element.response,null,2)}
                                            </pre>
                                            <Button onClick={() => deleteRule(element.rule_id)} color="red" >
                                                Törlés
                                            </Button> 
                                        </div>
                                    </div>
                                );
                    })}
                </div> 
            </Page>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.token
    };
};
export default connect(mapStateToProps)(Workspace);