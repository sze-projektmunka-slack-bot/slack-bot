import classNames from "classnames";
import classes from "./header.module.scss";
import logo from '../../assets/logo.svg';
import Button from "../button/button";
import { Link } from 'react-router-dom';

const Header = (props) => {
   return (
      <header className={classNames(classes.header)}>
         <div className={classNames(classes.container)}>
            <Link to="/">
               <img className={classNames(classes.logo)} src={logo} />
            </Link>
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