import classNames from "classnames";
import Button from "../../components/button/button";
import Page from "../../components/page/page";
import { connect } from 'react-redux';
import SelectField from "../../components/select-field/selectField";
import classes from "./NewRule.module.scss";
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {
    Link, useParams
} from 'react-router-dom';
import {
    useEffect,
    useState
} from "react";
import backendApi from "../../apis/backend";
import * as toastr from "toastr";
import InputField from "../../components/input-field/inputField";
import Textarea from "../../components/textarea/textarea";


const Workspace = (props) => {
    let { id } = useParams();
    const [workspaceName, setWorkspaceName] = useState([]);
    const [triggers, setTriggers] = useState([]);
    const [formValues, setFormValues] = useState({});
    const [responses, setResponses] = useState({});
    const [formattedResponses, setFormattedResponses] = useState([]);
    const [formattedTriggers, setFormattedTriggers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedTrigger, setSelectedTrigger] = useState({});
    const [selectedResponse, setSelectedResponse] = useState({});

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
                setTriggers(response.data);
                setResponses(response.data[0].responses);
                setSelectedTrigger(response.data[0]);
                
            } else {
                toastr.error(error, 'Hiba történt');
            }
            setLoading(false);
        }
        await getWorkspaces();
        await getTriggers();

    }, [props.isLoggedIn, id]);

    useEffect(() => {
        setFormattedTriggers(triggers.map(trigger => { return {label: trigger.name, value: trigger.identifier}}));
    },[triggers]);

    const getSelectedResponse = async (responseIdentifier) => {
        setLoading(true);
        let error;
        const response = await backendApi.get(`/responses/${responseIdentifier}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).catch((err) => {
            error = err;
            console.log(err);
        });

        if (response) {
            setSelectedResponse(response.data);
        } else {
            toastr.error(error, 'Hiba történt');
        }
        setLoading(false);
    };   

    useEffect(async () => {
        if(responses !== undefined && responses !== null){
            setFormattedResponses(Object.keys(responses).map((key) => { return {label: responses[key], value: key}}));
        }
    },[responses]);

    useEffect(async () => {
        setResponses(selectedTrigger.responses);
        if(selectedTrigger.responses !== undefined && selectedTrigger.responses !== null){
            getSelectedResponse(Object.keys(selectedTrigger.responses)[0]);
        }
    },[selectedTrigger]);

    const onChangeTrigger = (event) => {
        let selectedTriggers = triggers.filter(trigger => trigger.identifier == event.target.value);
        setSelectedTrigger(selectedTriggers[0]);
        document.querySelector("[name='response_selector']").selectedIndex = 0;
    };

    const onChangeResponse = (event) => {
        getSelectedResponse(event.target.value);
    };

    const processField = (fieldData, category) => {
        if(fieldData.type == "text"){
            return (<InputField key={fieldData.name} label={fieldData.label} name={`${category}[${fieldData.name}]`} required={fieldData.required} type="text" />);
        }
        else if(fieldData.type == "number"){
            return (<InputField key={fieldData.name} label={fieldData.label} name={`${category}[${fieldData.name}]`} required={fieldData.required} type="number" />);
        }
        else if(fieldData.type == "password"){
            return (<InputField key={fieldData.name} label={fieldData.label} name={`${category}[${fieldData.name}]`} required={fieldData.required} type="password" />);
        }
        else if(fieldData.type == "textarea"){
            return (<Textarea key={fieldData.name} label={fieldData.label} name={`${category}[${fieldData.name}]`} required={fieldData.required} />);
        }
        else if(fieldData.type == "select"){

        }
        else{
            return (<InputField key={fieldData.name} label={fieldData.label} name={`${category}[${fieldData.name}]`} required={fieldData.required} type="text" />);
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        let formdata = new FormData(event.target);
            formdata.append("workspace_id", id);
            formdata.append("trigger[identifier]", selectedTrigger.identifier);
            formdata.append("response[identifier]", selectedResponse.identifier);
        setLoading(true);
        let error;
        const response = await backendApi.post(`/workspaces/rules`, formdata,
        {
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).catch((err) => {
            error = err;
            console.log(err);
        });

        if (response) {
            toastr.success("Sikeresen létrehozta az új szabályt!", "Sikeres létrehozás");
        } else {
            toastr.error(error, 'Hiba történt');
        }
        setSelectedTrigger(triggers[0]);
        event.target.reset();
        setLoading(false);
    };

    return ( <Page noCard > 
                <h1>Új szabály hozzáadása {workspaceName} workspace-hez</h1>
                {loading && <h3>Töltés...</h3>}
                <form onSubmit={handleSubmit}>
                    <div className={classNames(classes.firstStep)}>
                        <div>
                            <SelectField name="trigger_selector" label="Eseményindító" options={formattedTriggers} onChange={onChangeTrigger}/>
                        </div>
                        <div>
                            <SelectField name="response_selector" label="Esemény" options={formattedResponses} onChange={onChangeResponse}/>
                        </div>
                    </div>
                    <div className={classNames(classes.firstStep)}>
                        <div>
                            <h3>Eseményindító mezők</h3>
                            {selectedTrigger.hasOwnProperty("inputs") 
                            && selectedTrigger.inputs.map((field) => 
                            { return processField(field, "trigger");})}
                            {selectedTrigger.hasOwnProperty("inputs") && selectedTrigger.inputs.length == 0 && <p>Nincs megadható mező</p>}
                        </div>
                        <div>
                            <h3>Esemény mezők</h3>
                            {selectedResponse.hasOwnProperty("inputs") 
                            && selectedResponse.inputs.map((field) => 
                            { return processField(field, "response");})}
                            {selectedResponse.hasOwnProperty("inputs") && selectedResponse.inputs.length == 0 && <p>Nincs megadható mező</p>}

                        </div>
                    </div>
                    
                    <Button type="submit" color="blue">Mentés</Button>
                </form>
            </Page>
    );
};


export default reduxForm({
    form: 'newRuleForm'
})(connect(null)(Workspace));