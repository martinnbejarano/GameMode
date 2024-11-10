import styles from "./AboutFeatures.module.css";

const AboutFeatures = () => {
  const features = [
    {
      icon: "🏢",
      title: "Oficinas",
      description:
        "GameMode cuenta con más de 20 oficinas repartidas por todo el país, con trabajadores de primer nivel, garantizando una buena calidad de servicio y ayudando a que la empresa siga creciendo.",
    },
    {
      icon: "🛒",
      title: "Catálogo",
      description:
        "Contamos con uno de los mayores catálogos de videojuegos que existen en el mercado. En GameMode, busca el juego que tanto querías con un simple click.",
    },
    {
      icon: "💰",
      title: "Precios",
      description:
        "Los precios más accesibles se encuentran en GameMode. Todas las semanas hay nuevos descuentos y con la compra de más de un producto, tendrás un 50% de descuento en tu próxima compra.",
    },
  ];

  return (
    <div className={styles.featuresContainer}>
      {features.map((feature, index) => (
        <div key={index} className={styles.featureCard}>
          <div className={styles.featureIcon}>{feature.icon}</div>
          <h2>{feature.title}</h2>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AboutFeatures;
