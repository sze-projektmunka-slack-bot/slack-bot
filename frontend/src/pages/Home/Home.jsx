import classNames from "classnames";
import Button from "../../components/button/button";
import Page from "../../components/page/page";
import classes from "./Home.module.scss";
import bannerImage from "../../assets/banner-image.svg"

const Home = (props) => {
   return (
      <Page noCard>
         <div className={classNames(classes.banner)}>
            <div className={classNames(classes.row)}>
               <div className={classNames(classes.texts)}>
                  <h1>Tervezd meg a saját Slack Botod</h1>
                  <p>
                     Donec ipsum tortor, bibendum fringilla mauris at, mattis mattis metus. 
                     Mauris bibendum, mauris id scelerisque laoreet, dui tortor lacinia felis, vitae porta.
                  </p>
               </div>
               <img className={classNames(classes.bannerImage)} src={bannerImage} />
            </div>            
            <div>
               <Button isLarge>Regisztráció</Button>
               <Button isLarge isHollow>Bejelentkezés</Button>
            </div>            
         </div>
         <h2>Hogyan működik?</h2>
         <div className={classNames(classes.twoColumn)}>
            <p>Mauris bibendum, mauris id scelerisque laoreet, dui tortor lacinia felis, vitae porta justo dolor sit amet ipsum. Suspendisse ullamcorper blandit imperdiet. Curabitur maximus convallis ex sed ornare. Mauris vel dui id eros lobortis tempus at sit amet arcu. Nulla quis rhoncus augue. Aliquam consectetur erat eget leo ullamcorper, ac blandit ex vehicula. Praesent varius, justo vitae rhoncus pulvinar, nibh augue iaculis metus.</p>
            <p>Mauris id scelerisque laoreet, dui tortor lacinia felis, vitae porta justo dolor sit amet ipsum. Suspendisse ullamcorper blandit imperdiet. Curabitur maximus convallis ex sed ornare. Mauris vel dui id eros lobortis tempus at sit amet arcu. Nulla quis rhoncus augue. Aliquam consectetur erat eget leo ullamcorper, ac blandit ex vehicula. Praesent varius, justo vitae rhoncus pulvinar, nibh augue iaculis metus, in tempor dui eros id diam.</p>
         </div>
      </Page>
   );
};

export default Home;