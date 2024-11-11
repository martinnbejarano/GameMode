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
  images: string[];
  createdAt?: Date;
  companyId?:
    | string
    | {
        _id: string;
        name: string;
      };
  minimumSystemRequirements: SystemRequirements;
  recommendedSystemRequirements: SystemRequirements;
  updatedAt?: Date;
  isActive?: boolean;
  averageRating?: number;
  views?: number;
  wishlistCount?: number;
  totalSales?: number;
}
