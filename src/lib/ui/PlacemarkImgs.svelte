<script lang="ts">
  // import UploadWidget from '$lib/components/UploadWidget.svelte';
  import type { Placemark, PlacemarkPlus } from "$lib/types/placemark-types";
  import { currentSession, placemarkStore, placemarkPlusStore } from "$lib/stores";
  import { placemarkService } from "$lib/services/placemark-service";
  import Card from "$lib/ui/Card.svelte";
  import { get } from "svelte/store";
  export let placemarks: PlacemarkPlus[] = [];
  import UploadWidget from "$lib/components/UploadWidget.svelte";

  let test_img_url;
  let message;

  placemarkPlusStore.subscribe((value) => {
    placemarks = value;
  });

  // async function uploadImage(placemark: PlacemarkPlus) {
  //   test_img_url = "www.test_img_url"
  // 		console.log(test_img_url)

  //     console.log("placemark before image change")
  //     console.log(placemark)

  //           const updatedPlacemark: PlacemarkPlus = {
  //         name: placemark.name,
  //         category: placemark.category,
  //         description: placemark.description,
  //         latitude: placemark.latitude,
  //         longitude: placemark.longitude,
  //         rating: placemark.rating,
  //         img: test_img_url,
  //         userid: placemark.userid,
  //         _id: placemark._id,
  //       };

  //     console.log("placemark after image change")
  //     console.log(updatedPlacemark)

  //     const success = await placemarkService.updatePlacemark(updatedPlacemark, get(currentSession));
  //       console.log(updatedPlacemark);
  //       if (!success) {
  //         message = "Donation not completed - some error occurred";
  //         console.log("not successful");
  //         return;
  //       }
  // }

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
  </Card>
{/each}
