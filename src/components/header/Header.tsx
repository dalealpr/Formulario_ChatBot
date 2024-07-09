import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.cont_Header}>
      <h2 className={styles.title_Header}>Bienvenid@</h2>
      <p className={styles.text_Header}>
        Automatiza tu negocio con Chatbots personalizados de WhatsApp
      </p>
      <p className={styles.textPlan_Header}>Planes desde 9 Dolares Mensuales</p>
    </div>
  );
};

export default Header;
