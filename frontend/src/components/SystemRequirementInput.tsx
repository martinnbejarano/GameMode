import { Input } from "@nextui-org/react";

type SystemRequirementInputProps = {
  type: "minimum" | "recommended";
  values: {
    OS: string;
    Processor: string;
    RAM: string;
    Storage: string;
    GraphicCard: string;
    DirectX: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
};

export const SystemRequirementInput = ({
  type,
  values,
  onChange,
}: SystemRequirementInputProps) => {
  const prefix = `${type}SystemRequirements`;

  return (
    <>
      <h5 className="font-semibold">
        {type === "minimum" ? "Mínimos" : "Recomendados"}
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Sistema Operativo"
          name={`${prefix}.OS`}
          value={values.OS}
          onChange={onChange}
        />
        <Input
          label="Procesador"
          name={`${prefix}.Processor`}
          value={values.Processor}
          onChange={onChange}
        />
        <Input
          label="RAM"
          name={`${prefix}.RAM`}
          value={values.RAM}
          onChange={onChange}
        />
        <Input
          label="Almacenamiento"
          name={`${prefix}.Storage`}
          value={values.Storage}
          onChange={onChange}
        />
        <Input
          label="Tarjeta Gráfica"
          name={`${prefix}.GraphicCard`}
          value={values.GraphicCard}
          onChange={onChange}
        />
        <Input
          label="DirectX"
          name={`${prefix}.DirectX`}
          value={values.DirectX}
          onChange={onChange}
        />
      </div>
    </>
  );
};
