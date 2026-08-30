import NextAuth from "next-auth";
import authOptions from "../authOptions";

// const handler = NextAuth(
//     {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         }),
//     ],
//     session: {
//         strategy: "jwt", // No database needed for auth!
//     },
// }
// );

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };