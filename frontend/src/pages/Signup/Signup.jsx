import classNames from 'classnames';
import classes from './Signup.module.scss';
import Page from "../../components/page/page";
import InputField from '../../components/input-field/inputField';
import Button from '../../components/button/button';
import { connect } from 'react-redux';
import { signup } from '../../actions';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as toastr from "toastr";

const renderUsernameInput = formProps => <InputField reduxFormData={formProps} label="Felhasználónév"/>;
const renderEmailInput = formProps => <InputField reduxFormData={formProps} label="E-mail cím"/>;
const renderPasswordInput = formProps => <InputField reduxFormData={formProps} label="Jelszó" type="password"/>;
const renderPasswordConfirmationInput = formProps => <InputField reduxFormData={formProps} label="Jelszó újra" type="password"/>;

const Signup = (props) => {
    const onSubmit = (formValues) => {
        return props.signup(formValues.username, formValues.email, formValues.password, formValues.passwordConfirmation).then(res => {
            if(res.type !== 'auth/signup/ERROR') {
                toastr.success('Most már bejelentkezhetsz az adataiddal!', 'Sikeres regisztráció');
                props.reset();
                return;
            }     
            const errors = res.payload.response.data.errors;
            toastr.error('Kérjük javítsd az adatokat és próbálkozz újra!', 'Sikertelen regisztráció');
            throw new SubmissionError({...errors, _error: 'Signup failed!'});   
        });
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