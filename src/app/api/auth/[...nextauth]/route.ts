import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import { Adapter } from "next-auth/adapters"
import { signInWithUserAndPassword } from "@/app/auth/actions/auth-actions";


export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "******" }
      },
      async authorize(credentials, req) {
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        if (user) {
          const dbUser = signInWithUserAndPassword(credentials!.email, credentials!.password)
          return dbUser
        }

        return null
      }
    })
    // ...add more providers here
  ],
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({user, account, profile}) {
      return true
    },
    async jwt({token, user, account, profile}) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email! }
      })
      if(dbUser?.isActive === false){
        throw new Error('User is not active')
      }
      if (dbUser) {
        token.id = dbUser.id
        token.roles = dbUser.roles
      }
      return token;
    },
    async session({session, token, user}) {
      if(session && session.user){
        session.user.id = token.id
        session.user.roles = token.roles
      }
      return session
    },
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }