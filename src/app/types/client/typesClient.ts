export interface SignupFormData {
   name: string;
   email: string;
   password: string;
   passwordConfirmation: string;
   terms: boolean;
}

export interface Isession {
   user: {
      name: string | null,
      email: string | null,
      image: string | null
   }
}

export interface IregisterProfessionalFormData {
   name: string;
   phone: string;
   CEP: string;
   neighborhood: string;
   street: string;
   state: string;
   city: string;
   number: string;
   email: string,
   imageFile: string
}
export interface IemailCheckProfessional {
   email: string
}

export interface UserType {
   id: string;
   email: string;
   name: string;
   type: string;
   phone: string | null;
   barbershops: BarbershopType;
   address: AddressType;
   ratings: RatingType;
   emailVerified: boolean;
};

interface BarbershopType {
   id: string;
   name: string;
   imageUrl: string;
   phone: string;
   about: string | null;
   operation: string | null;
}

interface AddressType {
   id: string;
   userId: string;
   neighborhood: string;
   number: number;
   street: string;
   state: string;
   city: string;
   zipCode: string;
};

interface RatingType {
   id: string;
   userId: string;
   barbershopId: string | null;
   comment: string;
   rating: number;
};
