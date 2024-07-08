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
        // const res = await fetch("/your/endpoint", {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" }
        // })
        // const user = await res.json()

        // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user
        // }
        // // Return null if user data could not be retrieved
        // return null
        
        if (!credentials) {
          return null;
        }

        if (
          credentials.email === "felipe.cruz159@outlook.com" &&
          credentials.password === "123"
        ) {
          return {
            id: "1",
            name: "Felipe",
            email: "felipe.cruz159@outlook.com",
          };
        }

        console.log(credentials);
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
