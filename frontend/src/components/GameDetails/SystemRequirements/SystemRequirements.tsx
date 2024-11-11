import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { SystemRequirements as ISystemRequirements } from "../../../interfaces/Game";
import "./SystemRequirements.css";

interface Props {
  minimumRequirements: ISystemRequirements;
  recommendedRequirements: ISystemRequirements;
}

export const SystemRequirements = ({
  minimumRequirements,
  recommendedRequirements,
}: Props) => {
  const requirements = [
    {
      component: "Sistema Operativo",
      min: minimumRequirements.OS,
      rec: recommendedRequirements.OS,
    },
    {
      component: "Procesador",
      min: minimumRequirements.Processor,
      rec: recommendedRequirements.Processor,
    },
    {
      component: "Memoria RAM",
      min: minimumRequirements.RAM,
      rec: recommendedRequirements.RAM,
    },
    {
      component: "Tarjeta gráfica",
      min: minimumRequirements.GraphicCard,
      rec: recommendedRequirements.GraphicCard,
    },
    {
      component: "DirectX",
      min: minimumRequirements.DirectX,
      rec: recommendedRequirements.DirectX,
    },
    {
      component: "Almacenamiento",
      min: minimumRequirements.Storage,
      rec: recommendedRequirements.Storage,
    },
  ];

  return (
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
        <TableColumn className="bg-[#3a475a] text-white font-bold border-collapse">
          Mínimo
        </TableColumn>
        <TableColumn className="bg-[#3a475a] text-white font-bold border-collapse">
          Recomendado
        </TableColumn>
      </TableHeader>
      <TableBody>
        {requirements.map((req, index) => (
          <TableRow className="bg-primaryv1 border-collapse" key={index}>
            <TableCell>{req.component}</TableCell>
            <TableCell>{req.min}</TableCell>
            <TableCell>{req.rec}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
