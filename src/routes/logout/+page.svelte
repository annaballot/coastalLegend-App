<script lang="ts">
  import { goto } from "$app/navigation";
  import { currentSession } from "$lib/stores";
  import { signIn, signOut } from "@auth/sveltekit/client";

  currentSession.set({ name: "", _id: "", token: "" });
  localStorage.removeItem("placemark");
  signOut();
  goto("/");
</script>