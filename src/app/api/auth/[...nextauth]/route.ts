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

        return axiosInstance
        .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
          email: credentials.email,
          password: credentials.password,
        })
        .then((response) => {
          return {
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
          };
        })
        .catch((error) => {
          console.log(error.response);
          throw new Error(error.response.data.message);
        }) || null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
