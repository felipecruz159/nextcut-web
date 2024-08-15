import { axiosInstance } from "@/app/_helpers/axios-instance";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
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
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const type: string = 'client'
        try {
          const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`, {
            name: profile?.name,
            email: profile?.email,
            image: profile?.image,

            token: account?.id_token,
            provider: account.provider,
            access_token: account.access_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
            session_state: account.session_state,
            refresh_token: account.refresh_token,
            providerAccountId: account.providerAccountId,
            type: type
          }, {
            headers: {
              'Authorization': `Bearer ${account.id_token}`,
              'Content-Type': 'application/json'
            },
          });

          if (response.status === 200) {
            const { token } = response.data;
            return token ? true : false;
          } else {
            return false;
          }
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false;
        }
      }
      return true;
    },
  }
});

export { handler as GET, handler as POST };
