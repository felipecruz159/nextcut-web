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

export interface RegisterProfessionalFormData {
   name: string;
   phone: string;
   CEP: string;
   neighborhood: string;
   street: string;
   state: string;
   city: string;
   number: string;
}
