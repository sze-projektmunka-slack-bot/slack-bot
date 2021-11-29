import classNames from "classnames";
import classes from "./loggedOutMenu.module.scss";
import logo from '../../assets/logo.svg';
import Button from "../button/button";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions';

const LoggedOutMenu = (props) => {

   return (
       <>
            <Link to="/presentation">
               <img className={classNames(classes.logo)} src={logo} />
            </Link>
            <Link to="/login">
                Bejelentkezés
            </Link>
            <Link to="/signup">
                Regisztráció
            </Link>
        </>
   );
};
export default LoggedOutMenu;