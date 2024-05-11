<script lang="ts">

    import { goto } from "$app/navigation";
    import { placemarkService } from "$lib/services/placemark-service";
    import { currentSession } from "$lib/stores";
import { signIn, signOut } from "@auth/sveltekit/client";
import { page } from "$app/stores";
import { onMount } from "svelte";
console.log("page.data.session",$page.data.session) ;



onMount(async () => {
    let email = $page.data.session.user.email;
      console.log(`attemting to log in email: ${email} `);
      let session = await placemarkService.loginGithub(email);
      console.log("session", session);
      if (session) {
        currentSession.set(session);
        localStorage.placemark = JSON.stringify(session);
        goto("/report");
      } else {
        email = "";
        console.log("Invalid Credentials");
      }
    })

</script>






<section class="hero is-fullheight is-default is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-5">
            <h1 class="title has-text-centered">Login to CoastalLegend</h1>
            <div class="box">

    {#if $page.data.session}
        <h1>You are logged in</h1>
        {#if $page.data.session.user?.image}
            <img 
                src={$page.data.session.user.image}
                alt="User Profile"
                class="w-12 h-12"
            />
        {/if}
        <p>Signed in as {$page.data.session.user?.name}</p>
        <p>User Email Address: {$page.data.session.user?.email}</p>
        <button on:click={() => signOut()} class="bg-blue-500 py-1 px-2 rounded text-white font-bold">Sign Out</button>

    {:else}
        <div class="is-size-4 has-text-centered my-6">

        
        <h1>You are not currently logged in</h1>

    </div>
        <button on:click={() => signIn("github")} class="button is-large is-success is-fullwidth">Sign in with GitHub</button>
    
    {/if}
</div>
</div>
<div class="column is-6 is-offset-1">
  <figure class="image is-4by3">
    <img class="object-fit" src="/coastalLegendLogo.png" alt="coastalLegendLogo" />
  </figure>
</div>
</div>
</div>
</div>
</section>
