export interface SystemRequirements {
  OS: string;
  Processor: string;
  RAM: string;
  Storage: string;
  GraphicCard: string;
  DirectX: string;
}

export interface Game {
  _id?: string;
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
  companyId?: string;
  isActive?: boolean;
  averageRating?: number;
  views?: number;
  wishlistCount?: number;
  totalSales?: number;
}
