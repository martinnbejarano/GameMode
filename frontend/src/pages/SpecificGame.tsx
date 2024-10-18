import "swiper/css";
import "swiper/css/pagination";
import {
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
} from "@nextui-org/react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const systemRequirements = [
  {
    component: "Sistema Operativo",
    min: "Windows 10 (64-bit)",
    rec: "Windows 10 (64-bit)",
  },
  {
    component: "Procesador",
    min: "Intel Core i3-6100 / AMD Ryzen 3 1200",
    rec: "Intel Core i5-6600K / AMD Ryzen 5 1400",
  },
  { component: "Memoria RAM", min: "8 GB", rec: "16 GB" },
  {
    component: "Tarjeta gráfica",
    min: "NVIDIA GTX 950 / AMD RX 460",
    rec: "NVIDIA GTX 1060 / AMD RX 580",
  },
  { component: "DirectX", min: "Versión 11", rec: "Versión 12" },
  {
    component: "Almacenamiento",
    min: "50 GB",
    rec: "50 GB (SSD recomendado)",
  },
];

export const SpecificGame = () => {
  return (
    <div className="flex flex-col gap-4 text-primaryFont">
      <div>
        <h2 className="text-2xl font-semibold ">FIFA 22: Ultimate Edition</h2>
        <span>⭐️⭐️⭐️⭐️ 4.7</span>
      </div>
      <section className="flex flex-col gap-4 items-center lg:flex-row">
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="flex-grow w-full rounded-sm lg:w-3/4 h-[250px] md:h-[350px]"
        >
          <SwiperSlide>
            <img
              src="public/images/fifa22.jpg"
              className="flex size-full items-center justify-center object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="public/images/fifa_22.jpg"
              className="flex size-full items-center justify-center object-cover"
            />
          </SwiperSlide>
        </Swiper>
        <article className="flex flex-col gap-4 max-w-[400px]">
          <p>
            Powered by Football™. EA SPORTS™ FIFA 22 acerca aún más el juego a
            la realidad gracias a mejoras significativas en la jugabilidad y una
            nueva temporada de novedades en todos los modos.
          </p>
          <p className="text-xl font-bold">45,65 US$</p>
          <div className="flex flex-col gap-2">
            <Button className="bg-primaryv2">Comprar</Button>
            <Button className="bg-slate-400">A la lista de deseos</Button>
          </div>
          <div>
            <div className="flex justify-between">
              <span>Desarrolladora</span>
              <span>CD PROJEKT RED</span>
            </div>
            <Divider />
            <div className="flex justify-between">
              <span>Fecha de lanzamiento</span>
              <span>05/12/21</span>
            </div>
            <Divider />
            <div className="flex justify-between">
              <span>Plataforma</span>
              <span>Windows</span>
            </div>
            <Divider />
            <div className="flex justify-between">
              <span>Idioma</span>
              <span>Espanol</span>
            </div>
            <Divider />
            <div className="flex justify-between">
              <span>Categoria</span>
              <span>Deportes</span>
            </div>
            <Divider />
            <div className="flex justify-between">
              <span>Tipo</span>
              <span>Multi-player</span>
            </div>
          </div>
        </article>
      </section>

      <section>
        <Table
          isStriped
          aria-label="Requisitos del sistema"
          removeWrapper
          className="border-collapse rounded-lg text-white"
        >
          <TableHeader className="bg-[#3a475a] border-collapse">
            <TableColumn className="bg-[#3a475a] text-white font-bold border-collapse">
              Componente
            </TableColumn>
            <TableColumn className="bg-[#3a475a]  text-white font-bold border-collapse">
              Mínimo
            </TableColumn>
            <TableColumn className="bg-[#3a475a] text-white font-bold border-collapse">
              Recomendado
            </TableColumn>
          </TableHeader>
          <TableBody>
            {systemRequirements.map((requirement, index) => (
              <TableRow className="bg-primaryv1 border-collapse" key={index}>
                <TableCell>{requirement.component}</TableCell>
                <TableCell>{requirement.min}</TableCell>
                <TableCell>{requirement.rec}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      <section className="flex flex-col gap-4 md:gap-8 mt-8 md:mt-12">
        <article className="flex gap-2">
          <img
            src="/public/images/profilePic.jpeg"
            className="size-12 rounded-full"
          />
          <div className="flex-col space-y-2 w-full">
            <div>
              <h4 className="text-lg font-semibold">User123</h4>
              <span>✩✩✩✩✩</span>
            </div>
            <Textarea
              className="w-full"
              placeholder="Comparte detalles sobre tu experiencia en el juego"
            />
            <div className="flex justify-end">
              <Button className="bg-primaryv2">Enviar</Button>
            </div>
          </div>
        </article>
        <article className="flex gap-2">
          <img
            src="/public/images/profilePic.jpeg"
            className="size-12 rounded-full"
          />
          <div>
            <div>
              <h4 className="text-lg font-semibold">User123</h4>
              <div className="flex items-center gap-2">
                <span>⭐️⭐️⭐️⭐️</span>
                <span className="text-sm text-[#707579]">Hace 2 dias</span>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti
              debitis similique ullam officia laborum quae quia totam illum
              asperiores, eos sapiente excepturi delectus veritatis consectetur
              suscipit et doloribus magnam quis sed temporibus in natus rem,
              repellat animi! Maiores similique temporibus, doloribus obcaecati
              fugiat quibusdam, voluptates id nisi laboriosam voluptas velit
              commodi ut repellendus ad unde. Laudantium tempora optio itaque
              reiciendis.
            </p>
          </div>
        </article>
        <article className="flex gap-2">
          <img
            src="/public/images/profilePic.jpeg"
            className="size-12 rounded-full"
          />
          <div>
            <div>
              <h4 className="text-lg font-semibold">User123</h4>
              <div className="flex items-center gap-2">
                <span>⭐️⭐️⭐️⭐️</span>
                <span className="text-sm text-[#707579]">Hace 2 dias</span>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto dignissimos placeat atque. A dolorem perspiciatis
              tenetur autem eligendi, nam quo.
            </p>
          </div>
        </article>
        <article className="flex gap-2">
          <img
            src="/public/images/profilePic.jpeg"
            className="size-12 rounded-full"
          />
          <div>
            <div>
              <h4 className="text-lg font-semibold">User123</h4>
              <div className="flex items-center gap-2">
                <span>⭐️⭐️⭐️⭐️</span>
                <span className="text-sm text-[#707579]">Hace 2 dias</span>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto dignissimos placeat atque. A dolorem perspiciatis
              tenetur autem eligendi, nam quo.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
};
