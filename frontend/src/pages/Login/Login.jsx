import classNames from 'classnames';
import classes from './Login.module.scss';
import Page from "../../components/page/page";
import InputField from '../../components/input-field/inputField';
import Button from '../../components/button/button';
import { connect } from 'react-redux';
import { login } from '../../actions';
import { Field, reduxForm } from 'redux-form';

const renderUsernameInput = formProps => <InputField reduxFormData={formProps} label="Felhasználónév" />;
const renderPasswordInput = formProps => <InputField reduxFormData={formProps} label="Jelszó" type="password"/>;

const Login = (props) => {    
    const onSubmit = formValues => { 
        props.login(formValues.username, formValues.password);
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