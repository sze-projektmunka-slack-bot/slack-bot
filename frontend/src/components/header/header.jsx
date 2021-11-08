import classNames from "classnames";
import classes from "./header.module.scss";
import logo from '../../assets/logo.svg';
import Button from "../button/button";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions';

const Header = (props) => {
   const onLogoutButtonClick = () => {
      props.logout();
   };

   return (
      <header className={classNames(classes.header)}>
         <div className={classNames(classes.container)}>
            <Link to="/">
               <img className={classNames(classes.logo)} src={logo} />
            </Link>
            {
               props.isLoggedIn 
               && 
               <Button className={classNames(classes.logout)} isHollow
                  onClick={onLogoutButtonClick}>
                  Kijelentkezés
               </Button>
            }
         </div>
      </header>
   );
};

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.auth.isLoggedIn
   };
};

export default connect(mapStateToProps, {logout})(Header);