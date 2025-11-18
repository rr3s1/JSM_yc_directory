// Type definition for StartupCard component
export type StartupTypeCard = {
  _id: number | string;
  _createdAt: Date;
  views: number;
  author: {
    _id: number | string;
    name: string;
    image?: string;
  };
  title: string;
  category?: string;
  image: string;
  description: string;
};

