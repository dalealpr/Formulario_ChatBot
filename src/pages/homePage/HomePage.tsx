import { useMediaQuery } from "react-responsive";
// Components
import CardForm from "../../components/cardForm/CardForm";
import Header from "../../components/header/Header";
// Styles
import styles from "./HomePage.module.css";

const HomePage = () => {
  const isTablet = useMediaQuery({ query: "(min-width: 900px)" });
  return (
    <div className={styles.contCard}>
      {isTablet && <Header />}
      <CardForm />
    </div>
  );
};

export default HomePage;
