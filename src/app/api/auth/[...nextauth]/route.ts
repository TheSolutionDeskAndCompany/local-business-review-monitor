import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import EmailProvider from "next-auth/providers/email";
import { Resend } from "resend";
import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" as const },
  providers: [
    EmailProvider({
      from: env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier, url }) => {
        await resend.emails.send({ 
          to: identifier, 
          from: env.EMAIL_FROM, 
          subject: "Sign in to ReviewReady", 
          html: `<p>Click to sign in:</p><p><a href="${url}">${url}</a></p>` 
        });
      },
    }),
  ],
  pages: { signIn: "/auth/signin" },
};

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };
