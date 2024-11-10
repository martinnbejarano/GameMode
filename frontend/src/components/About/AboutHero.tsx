import styles from "./AboutHero.module.css";

const AboutHero = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <h1>Acerca de GameMode</h1>
        <p>
          Con más de 10 años de experiencia, convenio con Playstation y
          Microsoft, GameMode es garantía asegurada.
        </p>
      </div>
      <img
        src="https://www.activision.com/content/dam/atvi/activision/company/about/ATVI-Nucleus_After_Party_Photos_30R.jpg"
        alt="GameMode Hero"
        className={styles.heroImage}
      />
    </div>
  );
};

export default AboutHero;
