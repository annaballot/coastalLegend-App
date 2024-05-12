<script lang="ts">

  import Coordinates from "$lib/ui/Coordinates.svelte";
  import type { Placemark } from "$lib/types/placemark-types";
  import { currentSession, latestPlacemark } from "$lib/stores";
  import { placemarkService } from "$lib/services/placemark-service";
  import { get } from "svelte/store";

  let name = "";
  let category = ["Beach", "Surf Spot", "Mobile Sauna", "Coastal Path", "Diving Board", "Snorkelling"];
  let description = "";
  let latitude = 52.160858;
  let longitude = -7.15242;
  let rating = 8;
  let img = "";
  let selectedCategory = "";
  let message = "";

  async function createPlacemark() {
    let formInputError = false;

    // Check latitude
    if (latitude < -90 || latitude > 90) {
      message = "ERROR: Latitude  should be in the range -90 to 90 degrees.";
      formInputError = true;
    }

    // Check longitude
    if (longitude < -180 || longitude > 180) {
      message = "ERROR: Longitude should be in the range -180 to 180 degrees.";
      formInputError = true;
    }

    // Check rating
    if (rating < 1 || rating > 10) {
      message = "ERROR: Rating should be between 1 - 10";
      formInputError = true;
    }

    console.log("message", message);

    if (name && !formInputError) {
      const placemark: Placemark = {
        name: name,
        category: selectedCategory,
        description: description,
        latitude: latitude,
        longitude: longitude,
        rating: rating,
        img: img
      };
      const createdPlacemark = await placemarkService.createPlacemark(placemark, get(currentSession));
      console.log(`Just added: ${name} with category ${category} and description ${description} `);
      console.log(`latitude: ${latitude}, longitude: ${longitude}`);
      console.log("createdPlacemark", createdPlacemark);
      latestPlacemark.set(placemark);
      return placemark;
    } 
  }
</script>

<form on:submit|preventDefault={createPlacemark}>
  <div class="field">
    <label class="label" for="name">Enter Name:</label>
    <input bind:value={name} class="input" id="name" name="name" type="string" />
  </div>
  <div class="field">
    <label class="label" for="category">Select Category:</label>
    <div class="select">
      <select bind:value={selectedCategory}>
        {#each category as cat}
          <option value={cat}>{cat}</option>
        {/each}
      </select>
    </div>
  </div>
  <div class="field">
    <label class="label" for="description">Provide a Description for your placemark:</label>
    <input bind:value={description} class="input" id="description" name="description" type="string" />
  </div>
  <Coordinates bind:latitude bind:longitude />
  <div class="field">
    <label class="label" for="rating">Give this Placemark a Rating:</label>
    <input bind:value={rating} class="input" id="rating" name="rating" type="integer" />
  </div>
  <div class="field has-text-centered has-text-{"danger"} is-outlined p-2">
    {message}
  </div>
  <div class="field">
    <div class="control">
      <button class="button is-success is-fullwidth">Create Placemark</button>
    </div>
  </div>
</form>
