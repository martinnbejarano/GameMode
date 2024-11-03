import { useState } from "react";
import { Input, Textarea, Select, SelectItem, Button } from "@nextui-org/react";
import { gameCategories } from "../constants/gameCategories";
import { gamePlatforms } from "../constants/gamePlatforms";
import { languages } from "../constants/languages";
import { FileInput } from "../components/FileInput";
import { Game } from "../interfaces/Game";
import { SystemRequirementInput } from "../components/SystemRequirementInput";
import { handleGameFormChange } from "../utils/formHandlers";
import { useFetch } from "../hooks/useFetch";
import { axi } from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

export const EditGames = () => {
  const { data: gamesResponse, loading } = useFetch<{ data: Game[] }>(
    "/company/games"
  );
  const [selectedGame, setSelectedGame] = useState("");
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [formData, setFormData] = useState<Game>({
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGameSelect = (gameId: string) => {
    setSelectedGame(gameId);
    const selectedGameData = gamesResponse?.data.find(
      (game) => game._id === gameId
    );
    if (selectedGameData) {
      setFormData(selectedGameData);
      setCurrentImages((selectedGameData.images || []) as string[]);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    handleGameFormChange(e, setFormData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedGame) {
      toast.error("Por favor selecciona un juego para editar");
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSubmit = new FormData();

      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("description", formData.description);
      formDataToSubmit.append("price", String(formData.price));
      formDataToSubmit.append("category", formData.category);

      formDataToSubmit.append("platforms", JSON.stringify(formData.platforms));
      formDataToSubmit.append("languages", JSON.stringify(formData.languages));

      formDataToSubmit.append(
        "minimumSystemRequirements",
        JSON.stringify(formData.minimumSystemRequirements)
      );
      formDataToSubmit.append(
        "recommendedSystemRequirements",
        JSON.stringify(formData.recommendedSystemRequirements)
      );

      newImages.forEach((image) => {
        formDataToSubmit.append("images", image);
      });

      await axi.put(`/company/games/${selectedGame}`, formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Juego actualizado exitosamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el juego");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImagesChange = (files: File[]) => {
    setNewImages(files);
    setFormData((prev) => ({
      ...prev,
      images: currentImages,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader />
      </div>
    );
  }

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
          {(gamesResponse?.data || []).map((game) => (
            <SelectItem key={game._id as string} value={game._id as string}>
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
              selectedKeys={formData.category ? [formData.category] : []}
              onChange={handleChange}
            >
              {gameCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Select
              label="Plataforma"
              selectionMode="multiple"
              name="platforms"
              selectedKeys={new Set(formData.platforms)}
              onChange={handleChange}
            >
              {gamePlatforms.map((platform) => (
                <SelectItem key={platform} value={platform}>
                  {platform}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Idioma"
              selectionMode="multiple"
              name="languages"
              selectedKeys={new Set(formData.languages)}
              onChange={handleChange}
            >
              {languages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
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
              className="self-end min-w-1/3 bg-primaryv2 text-white font-semibold text-lg py-6"
              type="submit"
              isLoading={isSubmitting}
            >
              Guardar cambios
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
