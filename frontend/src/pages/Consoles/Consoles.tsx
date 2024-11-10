import React from "react";
import "./Consoles.css";
import { ConsoleHeader, ConsoleCard } from "../../components/index";
const consolesData = [
  {
    id: 1,
    title: "Play Station",
    description:
      "Consolas de videojuegos creadas y desarrolladas por Sony Interactive Entertainment. Han estado presentes en la quinta, sexta, séptima, octava y novena generación de videoconsolas, la compañía promotora está actualmente en el mercado con su PlayStation 5.",
    image: "/images/sony.jpeg",
    reverse: true,
  },
  {
    id: 2,
    title: "Xbox",
    description:
      "Creada por Microsoft, es una plataforma que incluye una serie de videoconsolas desarrolladas por la misma compañía, de sexta a novena generación, así como aplicaciones (juegos), servicios de streaming y el servicio en línea Xbox Live. La marca fue introducida por primera vez el 15 de noviembre de 2001 en los Estados Unidos, con el lanzamiento de la consola Xbox.",
    image: "/images/xbox.jpeg",
    reverse: false,
  },
  {
    id: 3,
    title: "PC",
    description:
      "Windows es el sistema operativo predilecto para Gamers. Por su gran compatibilidad con casi todos los videojuegos del mercado y por su posibilidad de actualización de sus componentes, Windows es el software de PC más rentable para jugar a tus juegos favoritos.",
    image: "/images/windows.png",
    reverse: true,
  },
  {
    id: 4,
    title: "Nintendo",
    description:
      "Es una empresa de entretenimiento dedicada a la investigación y desarrollo, producción y distribución de software y hardware de videojuegos, y juegos de cartas, con sede en Kioto, Japón. Su origen se remonta a 1889, cuando comenzó a operar como Nintendo Koppai tras ser fundada por el artesano Fusajirō Yamauchi con el objetivo de producir y comercializar naipes Hanafuda. En 1977 distribuyó su primera videoconsola en Japón, la Color TV Game 15.",
    image: "/images/Nintendo-Switch.png",
    reverse: false,
  },
];

const Consoles: React.FC = () => {
  return (
    <section id="consola">
      <ConsoleHeader />
      {consolesData.map((console) => (
        <ConsoleCard
          key={console.id}
          title={console.title}
          description={console.description}
          image={console.image}
          reverse={console.reverse}
        />
      ))}
    </section>
  );
};

export default Consoles;
