
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"


const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt", // No database needed for auth!
    },
}

export default authOptions