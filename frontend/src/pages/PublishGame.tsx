import { useState } from "react";
import { Input, Textarea, Select, SelectItem, Button } from "@nextui-org/react";
import { gameCategories } from "../constants/gameCategories";
import { gamePlatforms } from "../constants/gamePlatforms";
import { languages } from "../constants/languages";
import { FileInput } from "../components/FileInput";
import { SystemRequirementInput } from "../components/SystemRequirementInput";
import { Game } from "../interfaces/Game";
import { handleGameFormChange } from "../utils/formHandlers";

type FormData = Game;

export const PublishGame = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: 0,
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
    images: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    handleGameFormChange(e, setFormData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleImagesChange = (files: File[]) => {
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      images: imageUrls,
    }));
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
            value={formData.price.toString()}
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
          <SystemRequirementInput
            type="minimum"
            values={formData.minimumSystemRequirements}
            onChange={handleChange}
          />
          <SystemRequirementInput
            type="recommended"
            values={formData.recommendedSystemRequirements}
            onChange={handleChange}
          />
        </div>
        <FileInput initialImages={[]} onImagesChange={handleImagesChange} />
        <Button
          className="self-end w-1/3 bg-primaryv2 text-white font-semibold text-lg py-6"
          type="submit"
        >
          Publicar
        </Button>
      </form>
    </div>
  );
};
