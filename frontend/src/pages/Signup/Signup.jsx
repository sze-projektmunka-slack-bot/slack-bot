import classNames from 'classnames';
import classes from './Signup.module.scss';
import Page from "../../components/page/page";
import InputField from '../../components/input-field/inputField';
import Button from '../../components/button/button';

const Signup = (props) => {
    return (
        <Page noCard title="Regisztráció">
            <div>
                <InputField label="Felhasználónév"/>
                <InputField label="E-mail cím"/>
                <InputField label="Jelszó" type="password"/>
                <InputField label="Jelszó újra" type="password"/>
                <Button className={classNames(classes.button)} color="blue">Regisztráció</Button>
            </div>
        </Page>
    );
};

export default Signup;