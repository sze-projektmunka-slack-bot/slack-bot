import classNames from 'classnames';
import classes from './Login.module.scss';
import Page from "../../components/page/page";
import InputField from '../../components/input-field/inputField';
import Button from '../../components/button/button';
import { connect } from 'react-redux';
import { login } from '../../actions';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as toastr from "toastr";

const renderUsernameInput = formProps => <InputField reduxFormData={formProps} label="Felhasználónév" />;
const renderPasswordInput = formProps => <InputField reduxFormData={formProps} label="Jelszó" type="password"/>;

const Login = (props) => {    
    const onSubmit = formValues => { 
        return props.login(formValues.username, formValues.password).then(res => { 
            if(res.type !== 'auth/login/ERROR') {
                toastr.success('Üdvözöl a Slack Bot Configurator!', 'Sikeres bejelentkezés');
                props.reset();
                return;
            }            
            const errors = res.payload.response.data.errors;     
            toastr.error('Kérjük ellenőrizd az adataidat!', 'Sikertelen bejelentkezés');
            throw new SubmissionError({ ...errors, _error: 'Login failed!'});
        });
    };

    return (
        <Page noCard title="Bejelentkezés">
            <form>
                <Field name="username" component={renderUsernameInput} />
                <Field name="password" component={renderPasswordInput} />
                <Button onClick={props.handleSubmit(onSubmit)} className={classNames(classes.button)} color="blue">Bejelentkezés</Button>
            </form>
        </Page>
    );
};

export default reduxForm({
    form: 'loginForm'
})(connect(null, { login })(Login));