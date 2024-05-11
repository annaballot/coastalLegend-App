import { SvelteKitAuth } from "@auth/sveltekit";
import { goto } from "$app/navigation";
import GitHub from "@auth/sveltekit/providers/github";
import { VITE_CLIENT_ID, VITE_CLIENT_SECRET } from "$env/static/private";
import { currentSession } from "$lib/stores";
import type { Session, User } from "$lib/types/placemark-types";

// GitHub talks BACK to our application, it is handled by the "handle" here
export const { handle } = SvelteKitAuth({
    providers: [
        GitHub({ clientId: VITE_CLIENT_ID, clientSecret: VITE_CLIENT_SECRET })
    ],
    callbacks: {
        // JWT get sent to server?
        async jwt({ token, account }) {
            if(account) {
                token.accessToken = account.access_token
                console.log("token",token)
            }
            return token
            
        },
        async session({ session, token, user }) {
            //@ts-ignore
            session.access_token = token.accessToken
            console.log("session",session)
            console.log("user email",session.user.email)
            console.log("access token",token.accessToken)
            return session
        },

        async redirect({ url, baseUrl }) {
            return "/loggedIn"
          },
    }
})