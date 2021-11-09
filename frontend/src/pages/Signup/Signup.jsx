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
            if(res.type === 'auth/signup/ERROR') {                
                let error = {};
                console.log(res);
                if(res.payload.response.data.errors.username && res.payload.response.data.errors.username.includes('The username has already been taken.')) {
                    error.username = 'Már foglalt vagy helytelen felhasználónév!';
                }
                if(res.payload.response.data.errors.email && res.payload.response.data.errors.email.includes('The email must be a valid email address.')) {
                    error.email = 'Helytelen e-mail formátum!';
                }
                if(res.payload.response.data.errors.email && res.payload.response.data.errors.email.includes('The email has already been taken.')) {
                    error.email = 'Ez az e-mail cím már foglalt!';
                }
                if(res.payload.response.data.errors.password && res.payload.response.data.errors.password.includes('The password format is invalid.')) {
                    error.password = 'A jelszó tartalmazzon kis- és nagybetűt, számot, és legyen legalább 8 karakter hosszú!';                   
                }
                if(res.payload.response.data.errors.password && res.payload.response.data.errors.password.includes('The password confirmation does not match.')) {
                    error.passwordConfirmation = 'A két jelszó nem egyezik!';                   
                }
                if(error) {
                    toastr.error('Kérjük javítsd az adatokat és próbálkozz újra!', 'Sikertelen regisztráció');
                    throw new SubmissionError({...error, _error: 'Signup failed!'});
                }
            } else {
                toastr.success('Most már bejelentkezhetsz az adataiddal!', 'Sikeres regisztráció');
                props.reset();
            }
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