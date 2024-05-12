<script lang="ts">
    import LoginForm from "./LoginForm.svelte";
    import LoginFormGithub from "./LoginFormGithub.svelte";
  
  </script>
  
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-black has-text-centered">Login to CoastalLegend</h3>
          <div class="box">
            <LoginForm />
            <br>
            <LoginFormGithub />
          </div>
        </div>
      
      </div>
    </div>
  </section>