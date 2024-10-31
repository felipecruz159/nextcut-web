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
}

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
   name: string;
   description: string;
   category: string;
   price: number;
   time: number;
}