import { useState } from "react";
import { Input, Textarea, Select, SelectItem, Button } from "@nextui-org/react";
import { gameCategories } from "../constants/gameCategories";
import { gamePlatforms } from "../constants/gamePlatforms";
import { languages } from "../constants/languages";
import { FileInput } from "../components/FileInput";

type FormData = {
  name: string;
  description: string;
  price: string;
  category: string;
  platforms: string[];
  languages: string[];
  minimumSystemRequirements: {
    OS: string;
    Processor: string;
    RAM: string;
    Storage: string;
    GraphicCard: string;
    DirectX: string;
  };
  recommendedSystemRequirements: {
    OS: string;
    Processor: string;
    RAM: string;
    Storage: string;
    GraphicCard: string;
    DirectX: string;
  };
};

export const PublishGame = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    category: "",
    platforms: [],
    languages: [],
    minimumSystemRequirements: {
      OS: "",
      Processor: "",
      RAM: "",
      Storage: "",
      GraphicCard: "",
      DirectX: "",
    },
    recommendedSystemRequirements: {
      OS: "",
      Processor: "",
      RAM: "",
      Storage: "",
      GraphicCard: "",
      DirectX: "",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (
      name.startsWith("minimumSystemRequirements") ||
      name.startsWith("recommendedSystemRequirements")
    ) {
      const [requirementType, field] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [requirementType as keyof FormData]: {
          ...(prevData[requirementType as keyof FormData] as object),
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Publicar juego</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mt-8 max-w-[1000px]"
      >
        <Input
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Textarea
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            label="Precio"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          <Select
            label="Categoría"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {gameCategories.map((category) => (
              <SelectItem key={category}>{category}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Select
            label="Plataforma"
            selectionMode="multiple"
            name="platforms"
            onChange={handleChange}
          >
            {gamePlatforms.map((platform) => (
              <SelectItem key={platform}>{platform}</SelectItem>
            ))}
          </Select>
          <Select
            label="Idioma"
            selectionMode="multiple"
            name="languages"
            onChange={handleChange}
          >
            {languages.map((language) => (
              <SelectItem key={language}>{language}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold">Requisitos del sistema</h4>
          <h5 className="font-semibold">Mínimos</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Sistema Operativo"
              name="minimumSystemRequirements.OS"
              value={formData.minimumSystemRequirements.OS}
              onChange={handleChange}
            />
            <Input
              label="Procesador"
              name="minimumSystemRequirements.Processor"
              value={formData.minimumSystemRequirements.Processor}
              onChange={handleChange}
            />
            <Input
              label="RAM"
              name="minimumSystemRequirements.RAM"
              value={formData.minimumSystemRequirements.RAM}
              onChange={handleChange}
            />
            <Input
              label="Almacenamiento"
              name="minimumSystemRequirements.Storage"
              value={formData.minimumSystemRequirements.Storage}
              onChange={handleChange}
            />
            <Input
              label="Tarjeta Gráfica"
              name="minimumSystemRequirements.GraphicCard"
              value={formData.minimumSystemRequirements.GraphicCard}
              onChange={handleChange}
            />
            <Input
              label="DirectX"
              name="minimumSystemRequirements.DirectX"
              value={formData.minimumSystemRequirements.DirectX}
              onChange={handleChange}
            />
          </div>
          <h5 className="font-semibold">Recomendados</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Sistema Operativo"
              name="recommendedSystemRequirements.OS"
              value={formData.recommendedSystemRequirements.OS}
              onChange={handleChange}
            />
            <Input
              label="Procesador"
              name="recommendedSystemRequirements.Processor"
              value={formData.recommendedSystemRequirements.Processor}
              onChange={handleChange}
            />
            <Input
              label="RAM"
              name="recommendedSystemRequirements.RAM"
              value={formData.recommendedSystemRequirements.RAM}
              onChange={handleChange}
            />
            <Input
              label="Almacenamiento"
              name="recommendedSystemRequirements.Storage"
              value={formData.recommendedSystemRequirements.Storage}
              onChange={handleChange}
            />
            <Input
              label="Tarjeta Gráfica"
              name="recommendedSystemRequirements.GraphicCard"
              value={formData.recommendedSystemRequirements.GraphicCard}
              onChange={handleChange}
            />
            <Input
              label="DirectX"
              name="recommendedSystemRequirements.DirectX"
              value={formData.recommendedSystemRequirements.DirectX}
              onChange={handleChange}
            />
          </div>
        </div>
        <FileInput />
        <Button className="self-end w-1/3 bg-primaryv2" type="submit">
          Publicar
        </Button>
      </form>
    </div>
  );
};
