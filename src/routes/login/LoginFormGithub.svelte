

<script lang="ts">
    import { goto } from "$app/navigation";
    import { placemarkService } from "$lib/services/placemark-service";
    import { currentSession } from "$lib/stores";
import { signIn, signOut } from "@auth/sveltekit/client"
import { page } from "$app/stores"
console.log($page.data.session) 



async function signInAndReroute() {

signIn("github");



console.log(`attemting to log in email: ${email} using Github`);
      let session = await placemarkService.loginGithub(email);
      if (session) {
        currentSession.set(session);
        localStorage.placemark = JSON.stringify(session);
        goto("/report");
      } else {
        email = "";
        password = "";
        message = "Invalid Credentials";
      }




}

</script>


        <button on:click={() => signInAndReroute()} class="button is-success is-fullwidth">Sign in with GitHub</button>
    

