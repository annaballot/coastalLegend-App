

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

<section class="hero is-fullheight is-default is-bold">
    <div class="hero-body">
      <div class="container">
        <div >
          <div>
            <h1 class="title has-text-centered">Login to CoastalLegend</h1>
            <div class="box">

    {#if $page.data.session}
    
    <h1>You are logged in</h1>


    {:else}
        <div class="is-size-4 has-text-centered my-6">

        
        <h1>You are not currently logged in</h1>
        

    </div>
        <button on:click={() => signInAndReroute()} class="button is-large is-success is-fullwidth">Sign in with GitHub</button>
    
    {/if}
</div>
</div>
</div>
</div>
</div>
</section>




