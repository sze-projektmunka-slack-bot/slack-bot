import classNames from "classnames";
import classes from "./loggedInMenu.module.scss";
import logo from '../../assets/logo.svg';
import Button from "../button/button";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions';

const LoggedInMenu = (props) => {
   const onLogoutButtonClick = () => {
      props.logout();
   };

   return (
       <>
            <Link to="/presentation">
               <img className={classNames(classes.logo)} src={logo} />
            </Link>
            <Link to="/workspaces">
                Workspaces
            </Link>
            <Button className={classNames(classes.logout)} isHollow
                onClick={onLogoutButtonClick}>
                Kijelentkezés
            </Button>
        </>
   );
};

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.auth.token
   };
};

export default connect(mapStateToProps, {logout})(LoggedInMenu);