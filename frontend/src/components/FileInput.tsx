import { useReducer, useState, type ChangeEvent, type DragEvent } from "react";
import { toast } from "react-hot-toast";
import { MdUpload } from "react-icons/md";

interface FileWithPreview {
  file: File;
  preview: string;
  error?: boolean;
  status?: "pending" | "uploading" | "complete" | "error";
}

type Action = {
  type: "ADD_FILES";
  payload: FileWithPreview[];
};

const FileInput = () => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [files, dispatch] = useReducer(
    (state: FileWithPreview[], action: Action) => {
      switch (action.type) {
        case "ADD_FILES": {
          if (state.length + action.payload.length > 10) {
            toast.error("Máximo 10 archivos permitidos");
            return state;
          }
          return [...state, ...action.payload];
        }
        default:
          return state;
      }
    },
    []
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

    const newFiles = imageFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    dispatch({ type: "ADD_FILES", payload: newFiles });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const selectedFiles = Array.from(e.target.files);
    const newFiles = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    dispatch({ type: "ADD_FILES", payload: newFiles });
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-lg font-semibold">Imágenes del juego</h4>

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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 bg-primaryv1/90">
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
                        file.error
                          ? "bg-red-100 text-red-800"
                          : "bg-primaryv1/70 text-primaryv2"
                      }`}
                    >
                      {file.error ? "Error" : "Listo"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primaryv2 hover:bg-primaryv2/90 transition-colors">
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
