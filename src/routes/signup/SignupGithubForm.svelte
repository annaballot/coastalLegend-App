

<script lang="ts">
import { signIn, signOut } from "@auth/sveltekit/client"
import { page } from "$app/stores"
console.log($page.data.session) 

let userEmail: any;


async function signInAndReroute() {
signIn("github");
}

</script>


 
        <button on:click={() => signInAndReroute()} class="button is-success is-fullwidth">Sign up with GitHub</button>
    
  


