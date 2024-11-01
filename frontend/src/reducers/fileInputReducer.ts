import { toast } from "react-hot-toast";

export interface FileWithPreview {
  file: File;
  preview: string;
  isExisting: boolean;
  error?: boolean;
  status?: "pending" | "uploading" | "complete" | "error";
}

export type FileInputAction =
  | { type: "ADD_FILES"; payload: FileWithPreview[] }
  | { type: "REMOVE_FILE"; payload: number }
  | { type: "CLEAR_ALL" };

export const fileInputReducer = (
  state: FileWithPreview[],
  action: FileInputAction
): FileWithPreview[] => {
  switch (action.type) {
    case "ADD_FILES": {
      if (state.length + action.payload.length > 10) {
        toast.error("Máximo 10 archivos permitidos");
        return state;
      }
      return [...state, ...action.payload];
    }
    case "REMOVE_FILE": {
      return state.filter((_, index) => index !== action.payload);
    }
    case "CLEAR_ALL": {
      return [];
    }
    default:
      return state;
  }
};
