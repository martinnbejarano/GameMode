import { useState } from "react";
import { Input, Textarea, Select, SelectItem, Button } from "@nextui-org/react";
import { gameCategories } from "../constants/gameCategories";
import { gamePlatforms } from "../constants/gamePlatforms";
import { languages } from "../constants/languages";
import { FileInput } from "../components/FileInput";
import { Game } from "../interfaces/Game";
import { SystemRequirementInput } from "../components/SystemRequirementInput";
import { handleGameFormChange } from "../utils/formHandlers";

const availableGames = [
  { id: "1", name: "FIFA 18" },
  { id: "2", name: "FIFA 19" },
  { id: "3", name: "FIFA 20" },
];

type FormData = Game;

export const EditGames = () => {
  const [selectedGame, setSelectedGame] = useState("");
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
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

  const handleGameSelect = (gameId: string) => {
    setSelectedGame(gameId);
    setCurrentImages([
      "https://ejemplo.com/imagen1.jpg",
      "https://ejemplo.com/imagen2.jpg",
    ]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    handleGameFormChange(e, setFormData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSubmit = {
      ...formData,
      price: Number(formData.price),
    };
    console.log(formDataToSubmit);
  };

  const handleImagesChange = (files: File[]) => {
    setNewImages(files);
    setFormData((prev) => ({
      ...prev,
      images: [...currentImages, ...files],
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Editar juego</h2>

      <div className="mt-4 mb-8">
        <Select
          label="Seleccionar juego"
          placeholder="Selecciona un juego para editar"
          onChange={(e) => handleGameSelect(e.target.value)}
          className="max-w-md"
        >
          {availableGames.map((game) => (
            <SelectItem key={game.id} value={game.id}>
              {game.name}
            </SelectItem>
          ))}
        </Select>
      </div>

      {selectedGame && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-[1000px]"
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

          <FileInput
            initialImages={currentImages}
            onImagesChange={handleImagesChange}
          />

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

          <div className="flex gap-4 self-end">
            <Button color="danger" variant="light">
              Cancelar
            </Button>
            <Button
              className="self-end w-1/3 bg-primaryv2 text-white font-semibold text-lg py-6"
              type="submit"
            >
              Guardar cambios
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
