export interface CoursePartner {
  title: string;
  logo: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  courseDescription: string;
  coursePartner: CoursePartner[];
  thumbnailImage: string;
  courseTopic: string[];
  price: number;
  salePrice?: number;
  isOnSale: boolean;
  imageUrl?: string; 
}

export interface TRPCResponse {
  result: {
    data: Course[];
  };
} 