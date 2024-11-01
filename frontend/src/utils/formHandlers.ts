import { Game } from "../interfaces/Game";

export const handleGameFormChange = (
  e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<Game>>
) => {
  const { name, value } = e.target;

  if (
    name.startsWith("minimumSystemRequirements") ||
    name.startsWith("recommendedSystemRequirements")
  ) {
    const [requirementType, field] = name.split(".");
    setFormData((prevData) => ({
      ...prevData,
      [requirementType as keyof Game]: {
        ...(prevData[requirementType as keyof Game] as object),
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
