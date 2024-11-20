export interface IBarberItemProps {
   barber: {
      id: string
      name: string,
      address: string
      imageUrl: string
   }
};

export interface Ibarber {
   id: string;
   name: string;
   imageUrl: string;
   phone: string;
   addressId: string;
   userId: string;
   address: Address;
   appraiser: number;
   Rating: Rating;
   User: UserType
}

export interface UserType {
   id: string;
   email: string;
   name: string;
   type: string;
   phone: string | null;
   emailVerified: boolean;
};

export interface Address {
   neighborhood: string;
   number: number;
   street: string;
   state: string;
   city: string;
   zipCode: string;
}

export interface Rating {
   id: string;
   userId: number;
   barbershopId: string;
   comment: string;
   rating: number;
}

export interface ServiceFormData {
   barbershopId: string | undefined;
   id: string;
   name: string;
   description: string;
   category: string;
   price: number;
   time: number;
}

export interface InfomationsData {
   about: string;
   phone: string;
   operation: string;
   address: Address;
}