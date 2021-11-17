import classNames from "classnames";
import Button from "../../components/button/button";
import Page from "../../components/page/page";
import { connect } from 'react-redux';
import classes from "./Workspaces.module.scss";
import {
    Link,
    useSearchParams
} from 'react-router-dom';
import {
    useEffect,
    useState
} from "react";
import backendApi from "../../apis/backend";
import * as toastr from "toastr";


const Workspaces = (props) => {
    const [workspaces, setWorkspaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    let code = searchParams.get("code");
    useEffect(() => {
        async function createWorkspace(code){
            setLoading(true);
            let error;
            const response = await backendApi.post('/workspaces', {
                code: code
            },
            {
                headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).catch((err) => {
                error = err;
                console.log(err);
            });

            if (response) {
                toastr.success(`${response.data.team_name} sikeres hozzáadva fiókjához!`, 'Sikeres hozzáadás');
                getWorkspaces();
            } else {
                toastr.error(error, 'Hiba történt');
            }
            setLoading(false);
        }

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
                setWorkspaces(response.data);
            } else {
                toastr.error(error, 'Hiba történt');
            }
            setLoading(false);
        }
        getWorkspaces();
        if(code){
            createWorkspace(code);
        }

    }, [props.isLoggedIn]);
    return ( <Page noCard > 
                <Button onClick={() => window.location.href = "https://slack.com/oauth/v2/authorize?client_id=1790573457559.2535974226898&scope=app_mentions:read,channels:history,channels:read,chat:write,chat:write.public,files:read,groups:history,groups:read,team:read,users:read,commands,pins:read&user_scope=chat:write,channels:history"} >
                    Új workspace hozzáadása 
                </Button> 
                <div className={classes.workspacesList}>
                    {loading && <h3>Töltés...</h3>}
                    {workspaces.map(element => {
                        return (
                                    <Link key={element.workspace_id} to={`/workspaces/${element.workspace_id}`}>
                                        <div className={classes.workspacesListItem}>{element.team_name} kezelése</div>
                                    </Link>
                                );
                    })}
                </div> 
            </Page>
    );
};

export default connect()(Workspaces);