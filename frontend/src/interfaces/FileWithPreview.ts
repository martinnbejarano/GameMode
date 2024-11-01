export interface FileWithPreview {
  file: File;
  preview: string;
  error?: boolean;
  status?: "pending" | "uploading" | "complete" | "error";
}
