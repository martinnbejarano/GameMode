import { Game } from "../interfaces/Game";
import { Selection } from "@nextui-org/react";

type FormEvent =
  | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  | Selection;

export const handleGameFormChange = (
  e: FormEvent,
  setFormData: React.Dispatch<React.SetStateAction<Game>>,
  fieldName?: string
) => {
  if (fieldName && typeof e === "object" && e !== null && "size" in e) {
    const selectedValues = Array.from(e as Set<string>);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: selectedValues,
    }));
    return;
  }

  if (typeof e === "object" && e !== null && "target" in e) {
    const { name, value } = e.target;

    if (name.includes("SystemRequirements")) {
      const [type, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [type]: {
          ...prev[
            type as keyof Pick<
              Game,
              "minimumSystemRequirements" | "recommendedSystemRequirements"
            >
          ],
          [field]: value,
        },
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};
