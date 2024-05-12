

<script lang="ts">
    import { goto } from "$app/navigation";
    import { placemarkService } from "$lib/services/placemark-service";
    import { currentSession } from "$lib/stores";
import { signIn, signOut } from "@auth/sveltekit/client"
import { page } from "$app/stores"
console.log($page.data.session) 

let userEmail: any;


async function signInAndReroute() {
signIn("github");
}

</script>


 
        <button on:click={() => signInAndReroute()} class="button is-success is-fullwidth">Sign up with GitHub</button>
    
  


