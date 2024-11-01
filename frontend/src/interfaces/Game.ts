export type SystemRequirements = {
  OS: string;
  Processor: string;
  RAM: string;
  Storage: string;
  GraphicCard: string;
  DirectX: string;
};

export type Game = {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  platforms: string[];
  languages: string[];
  images: (string | File)[];
  minimumSystemRequirements: SystemRequirements;
  recommendedSystemRequirements: SystemRequirements;
  createdAt?: Date;
  updatedAt?: Date;
  publisherId?: string;
  isActive?: boolean;
};
