<script lang="ts">
  // import UploadWidget from '$lib/components/UploadWidget.svelte';
  import type { Placemark, PlacemarkPlus } from "$lib/types/placemark-types";
  import { currentSession, placemarkStore, placemarkPlusStore } from "$lib/stores";
  import { placemarkService } from "$lib/services/placemark-service";
  import Card from "$lib/ui/Card.svelte";
  import { get } from "svelte/store";
  export let placemarks: PlacemarkPlus[] = [];
  import UploadWidget from "$lib/components/UploadWidget.svelte";


  placemarkStore.subscribe((value) => {
    placemarks = value;
  });

  function handleImageUploaded(event: CustomEvent<{ imageUrl: string }>, placemarkId: string) {
    const imageUrl = event.detail.imageUrl;
    const placemark = placemarks.find((p) => p._id === placemarkId);

    if (placemark) {
      placemark.img = imageUrl;
      console.log("Updated placemark:", placemark);
      placemarkService.updatePlacemark(placemark, get(currentSession));

      placemarkStore.set(placemarks);
    }
  }

  function handleImageDelete(placemarkId: string) {
    const placemark = placemarks.find((p) => p._id === placemarkId);

    if (placemark) {
      placemark.img = "";
      console.log("Updated placemark:", placemark);
      placemarkService.updatePlacemark(placemark, get(currentSession));

      placemarkStore.set(placemarks);
    }
  }
</script>

{#each placemarks as placemark}
  <Card title={placemark.name}>
    {#if placemark.img}
      <figure class="image">
        <img src={placemark.img} alt={placemark.name} title={placemark.name} />
      </figure>
    {:else}
      No Image Available
    {/if}

    <br />

    <UploadWidget placemarkId={placemark._id} on:imageUploaded={(event) => handleImageUploaded(event, placemark._id)} />
    <button title="Delete Image" class="button is-danger is-fullwidth" on:click={() => handleImageDelete(placemark._id)}>
      Delete Image <br />
      <span class="icon">
        <i class="fas fa-trash"></i>
      </span>
    </button>
  </Card>
{/each}
