import classNames from 'classnames';
import classes from './Signup.module.scss';
import Page from "../../components/page/page";
import InputField from '../../components/input-field/inputField';
import Button from '../../components/button/button';
import { connect } from 'react-redux';
import { signup } from '../../actions';

const Signup = (props) => {

    const onSignupButtonClicked = () => {
        props.signup('tamastomordi', 'thefurgeurge@gmail.com', 'ABC123456', 'ABC123456');
    };

    return (
        <Page noCard title="Regisztráció">
            <div>
                <InputField label="Felhasználónév"/>
                <InputField label="E-mail cím"/>
                <InputField label="Jelszó" type="password"/>
                <InputField label="Jelszó újra" type="password"/>
                <Button onClick={onSignupButtonClicked} className={classNames(classes.button)} color="blue">Regisztráció</Button>
            </div>
        </Page>
    );
};

export default connect(null, {signup})(Signup);