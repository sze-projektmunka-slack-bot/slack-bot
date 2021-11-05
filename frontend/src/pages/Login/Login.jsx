import classNames from 'classnames';
import classes from './Login.module.scss';
import Page from "../../components/page/page";
import InputField from '../../components/input-field/inputField';
import Button from '../../components/button/button';
import { connect } from 'react-redux';
import { login } from '../../actions';

const Login = (props) => {

    const onLoginButtonClick = () => {
        const data = new FormData();
        data.append('username', 'peterpenzes');
        data.append('password', 'Aa12345678');

        fetch('https://slack-api.oritamas.hu/api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: data
        })
        .then(response => console.log(response))
        .then(result => console.log(result))
        .then(err => console.log(err));
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