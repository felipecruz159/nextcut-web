import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createFileObject = (file: File) => {
  const fileExtension = file.name.split('.').pop();
  const fileName = `image_${Date.now()}.${fileExtension}`;

  return {
    file,
    name: fileName,
    type: file.type,
  };

};

export const calculateStarRating = (totalStars: number, numberOfRatings: number) => {
  if (numberOfRatings === 0) {
    return 0;
  }
  return (totalStars / numberOfRatings).toFixed(1);
};
