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