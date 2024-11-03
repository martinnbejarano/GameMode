import { useState } from "react";
import { Input, Textarea, Select, SelectItem, Button } from "@nextui-org/react";
import { gameCategories } from "../constants/gameCategories";
import { gamePlatforms } from "../constants/gamePlatforms";
import { languages } from "../constants/languages";
import { FileInput } from "../components/FileInput";
import { SystemRequirementInput } from "../components/SystemRequirementInput";
import { Game } from "../interfaces/Game";
import { handleGameFormChange } from "../utils/formHandlers";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { axi } from "../utils/axiosInstance";
import { initialGameState } from "../constants/initialGameState";
import { Selection } from "@nextui-org/react";

type FormData = Game;

export const PublishGame = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>(initialGameState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    handleGameFormChange(e, setFormData);
  };

  const handleSelectionChange = (fieldName: string) => (e: Selection) => {
    handleGameFormChange(e, setFormData, fieldName);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price.toString());
      formDataToSend.append("category", formData.category);

      formDataToSend.append("platforms", JSON.stringify(formData.platforms));
      formDataToSend.append("languages", JSON.stringify(formData.languages));

      const minReqs = {
        OS: formData.minimumSystemRequirements?.OS || "",
        Processor: formData.minimumSystemRequirements?.Processor || "",
        RAM: formData.minimumSystemRequirements?.RAM || "",
        GraphicCard: formData.minimumSystemRequirements?.GraphicCard || "",
        DirectX: formData.minimumSystemRequirements?.DirectX || "",
        Storage: formData.minimumSystemRequirements?.Storage || "",
      };

      const recReqs = {
        OS: formData.recommendedSystemRequirements?.OS || "",
        Processor: formData.recommendedSystemRequirements?.Processor || "",
        RAM: formData.recommendedSystemRequirements?.RAM || "",
        GraphicCard: formData.recommendedSystemRequirements?.GraphicCard || "",
        DirectX: formData.recommendedSystemRequirements?.DirectX || "",
        Storage: formData.recommendedSystemRequirements?.Storage || "",
      };

      formDataToSend.append(
        "minimumSystemRequirements",
        JSON.stringify(minReqs)
      );
      formDataToSend.append(
        "recommendedSystemRequirements",
        JSON.stringify(recReqs)
      );

      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image) => {
          formDataToSend.append("images", image);
        });
      }

      await axi.post("/company/games", formDataToSend);

      toast.success("Juego publicado exitosamente");
      navigate("/company/my-games");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al publicar el juego");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImagesChange = (files: File[]) => {
    setFormData((prev) => ({
      ...prev,
      images: files,
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
            selectedKeys={new Set(formData.platforms)}
            onSelectionChange={handleSelectionChange("platforms")}
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
            selectedKeys={new Set(formData.languages)}
            onSelectionChange={handleSelectionChange("languages")}
          >
            {languages.map((language) => (
              <SelectItem key={language} value={language}>
                {language}
              </SelectItem>
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
          isLoading={isSubmitting}
        >
          Publicar
        </Button>
      </form>
    </div>
  );
};
