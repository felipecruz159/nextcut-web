import { axiosInstance } from "@/app/_helpers/axios-instance";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        try {
          const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          if (response.data && response.data.user) {
            return {
              id: response.data.user.id,
              name: response.data.user.name,
              email: response.data.user.email,
            };
          } else {
            throw new Error("Erro na resposta do servidor");
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.error || "Erro de autenticação";
          throw new Error(errorMessage);
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
