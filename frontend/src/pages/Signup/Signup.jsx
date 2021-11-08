import classNames from 'classnames';
import classes from './Signup.module.scss';
import Page from "../../components/page/page";
import InputField from '../../components/input-field/inputField';
import Button from '../../components/button/button';
import { connect } from 'react-redux';
import { signup } from '../../actions';
import { Field, reduxForm } from 'redux-form';

const renderUsernameInput = formProps => <InputField reduxFormData={formProps} label="Felhasználónév"/>;
const renderEmailInput = formProps => <InputField reduxFormData={formProps} label="E-mail cím"/>;
const renderPasswordInput = formProps => <InputField reduxFormData={formProps} label="Jelszó" type="password"/>;
const renderPasswordConfirmationInput = formProps => <InputField reduxFormData={formProps} label="Jelszó újra" type="password"/>;

const Signup = (props) => {
    const onSubmit = (formValues) => {
        props.signup(formValues.username, formValues.email, formValues.password, formValues.passwordConfirmation);
    };

    return (
        <Page noCard title="Regisztráció">
            <form>
                <Field name='username' component={renderUsernameInput} />
                <Field name='email' component={renderEmailInput} />
                <Field name='password' component={renderPasswordInput} />
                <Field name='passwordConfirmation' component={renderPasswordConfirmationInput} />
                <Button onClick={props.handleSubmit(onSubmit)} className={classNames(classes.button)} color="blue">Regisztráció</Button>
            </form>
        </Page>
    );
};

export default reduxForm({
    form: 'signupForm'
})(connect(null, {signup})(Signup));