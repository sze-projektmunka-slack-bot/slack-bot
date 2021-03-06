import classNames from "classnames";
import classes from "./header.module.scss";
import { connect } from 'react-redux';
import { logout } from '../../actions';
import LoggedInMenu from "../logged-in-menu/loggedInMenu";
import LoggedOutMenu from "../logged-out-menu/loggedOutMenu";

const Header = (props) => {
   return (
      <header className={classNames(classes.header)}>
         <div className={classNames(classes.container)}>
            {
               props.isLoggedIn 
               && 
               <LoggedInMenu />
            }
            {
               !props.isLoggedIn 
               && 
               <LoggedOutMenu />
            }
         </div>
      </header>
   );
};

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.auth.token
   };
};

export default connect(mapStateToProps, {logout})(Header);