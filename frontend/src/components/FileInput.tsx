import {
  useReducer,
  useState,
  type ChangeEvent,
  type DragEvent,
  useEffect,
} from "react";
import { toast } from "react-hot-toast";
import { MdUpload, MdDelete } from "react-icons/md";
import {
  fileInputReducer,
  type FileWithPreview,
  type FileInputAction,
} from "../reducers/fileInputReducer";

interface FileInputProps {
  initialImages?: string[];
  onImagesChange?: (files: File[]) => void;
}

const FileInput = ({ initialImages = [], onImagesChange }: FileInputProps) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [files, dispatch] = useReducer(
    fileInputReducer,
    initialImages.map((url) => ({
      file: new File([], url.split("/").pop() || ""),
      preview: url,
      isExisting: true,
      error: false,
      status: "complete" as const,
    }))
  );

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const imageFiles = droppedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (droppedFiles.length !== imageFiles.length) {
      toast.error("Solo se permiten archivos de imagen");
    }

    const newFiles: FileWithPreview[] = imageFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isExisting: false,
      error: false,
      status: "complete" as const,
    }));

    dispatch({ type: "ADD_FILES", payload: newFiles });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const selectedFiles = Array.from(e.target.files);
    const newFiles: FileWithPreview[] = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isExisting: false,
      error: false,
      status: "complete" as const,
    }));

    dispatch({ type: "ADD_FILES", payload: newFiles });
    onImagesChange?.(selectedFiles);
  };

  const handleDelete = (index: number) => {
    dispatch({ type: "REMOVE_FILE", payload: index });
    const updatedFiles = files.filter((_, i) => i !== index).map((f) => f.file);
    onImagesChange?.(updatedFiles);
  };

  const handleClearAll = () => {
    dispatch({ type: "CLEAR_ALL" });
    onImagesChange?.([]);
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">Imágenes del juego</h4>
        {files.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-red-500 hover:text-red-700 transition-colors text-sm flex items-center gap-1"
          >
            <MdDelete className="w-4 h-4" />
            Borrar todas las imágenes
          </button>
        )}
      </div>

      {files.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primaryv1 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  VISTA PREVIA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  NOMBRE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  TAMAÑO
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  ESTADO
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  ACCIONES
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-primaryv1/70">
              {files.map((file, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-16 w-16 relative">
                      <img
                        src={file.preview}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full object-cover rounded"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {file.file.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {(file.file.size / 1024).toFixed(0)} KB
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        file.isExisting
                          ? "bg-blue-100 text-blue-800"
                          : file.error
                          ? "bg-red-100 text-red-800"
                          : "bg-primaryv1/70 text-primaryv2"
                      }`}
                    >
                      {file.isExisting
                        ? "Existente"
                        : file.error
                        ? "Error"
                        : "Listo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <MdDelete className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-primaryv2 text-sm font-medium rounded-md text-primaryv2 bg-transparent hover:bg-primaryv2/10 transition-colors">
              <MdUpload className="w-5 h-5 mr-2" />
              Agregar más archivos
              <input
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      ) : (
        <div
          className={`h-[200px] flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors
            ${
              dragActive
                ? "border-primaryv2 bg-primaryv2/10"
                : "border-gray-200 hover:border-primaryv2"
            }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
            <input
              type="file"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
            <MdUpload className="w-12 h-12 mb-2 text-primaryv1" />
            <p className="text-sm text-gray-500">
              Arrastra tus archivos o haz clic para seleccionar
            </p>
            <p className="text-xs text-gray-500 mt-1">Máximo 10 imágenes</p>
          </label>
        </div>
      )}
    </div>
  );
};

FileInput.displayName = "FileInput";

export { FileInput };
