export interface Review {
  _id: string;
  content: string;
  rating: number;
  createdAt: string;
  user: {
    _id: string;
    username: string;
    profilePicture?: string;
  };
  game: {
    _id: string;
    name: string;
    companyId: {
      _id: string;
      name: string;
    };
  };
}
