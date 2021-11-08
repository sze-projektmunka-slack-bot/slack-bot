import classNames from 'classnames';
import classes from './Login.module.scss';
import Page from "../../components/page/page";
import InputField from '../../components/input-field/inputField';
import Button from '../../components/button/button';
import { connect } from 'react-redux';
import { login } from '../../actions';

const Login = (props) => {

    const onLoginButtonClick = () => {
        props.login('penzespeter', 'Aa12345678');
    };

    return (
        <Page noCard title="Bejelentkezés">
            <div>
                <InputField label="E-mail cím"/>
                <InputField label="Jelszó" type="password"/>
                <Button onClick={onLoginButtonClick} className={classNames(classes.button)} color="blue">Bejelentkezés</Button>
            </div>
        </Page>
    );
};

export default connect(null, { login })(Login);