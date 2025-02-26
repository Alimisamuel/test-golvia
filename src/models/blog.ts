export interface Blog {
  id: number;
  title: string;
  content: string;
  createdBy: string;
  updatedBy: string;
  category: string;
  images: [
    {
      id: number;
      publicId: string;
      imageUrl: string;
      mediaCredit: string;
    },
  ];
  createdAt: string;
  updatedAt: string;
}