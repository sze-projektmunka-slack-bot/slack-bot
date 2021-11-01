import classNames from "classnames";
import classes from "./header.module.scss";
import logo from '../../assets/logo.svg';
import Button from "../button/button";

const Header = (props) => {
   return (
      <header className={classNames(classes.header)}>
         <div className={classNames(classes.container)}>
            <img className={classNames(classes.logo)} src={logo} />
            <Button 
               className={classNames(classes.logout)}
               isHollow
            >
               Kijelentkezés
            </Button>
         </div>
      </header>
   );
};

export default Header;