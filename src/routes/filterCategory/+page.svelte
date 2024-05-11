<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import PlacemarkList from "$lib/ui/PlacemarkList.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import type { Placemark } from "$lib/types/placemark-types";
  import { currentSession, latestPlacemark, subTitle } from "$lib/stores";

  import { onMount } from "svelte";
  import { get } from "svelte/store";

  subTitle.set("Report");
  let placemarks: Placemark[] = [];
  let category = ["Beach", "Surf Spot", "Mobile Sauna", "Coastal Path", "Diving Board", "Snorkelling"];
  let selectedCategory = "";
  let message = "Please select a category";
  let height = 100;

  onMount(async () => {
    placemarks = await placemarkService.getPlacemarks(get(currentSession));
  });

  async function filterPlacemark() {
    // console.log(`Just added: ${name} with category ${category} and description ${description} `);
    // console.log(`latitude: ${latitude}, longitude: ${longitude}`);

    if (selectedCategory) {
      placemarks = await placemarkService.filterCategory(get(currentSession), selectedCategory);
     
    const lastPlacemark = placemarks[placemarks.length - 1];
  

    
    } else {
      message = "Please select a category";
    }
  }
</script>

<form on:submit|preventDefault={filterPlacemark}>
  <div class="columns">
    <div class="column">
      <label class="label is-fullwidth" for="category">Select a Category to Filter by:</label>
    </div>
    <div class="column">
      <div class="select is-fullwidth">
        <select bind:value={selectedCategory}>
          {#each category as cat}
            <option value={cat}>{cat}</option>
          {/each}
        </select>
      </div>
    </div>
    <div class="column">
      <div class="field">
        <div class="control">
          <button class="button is-success is-fullwidth">Filter Placemarks</button>
        </div>
      </div>
    </div>
  </div>

<br />

<Card title="Placemarks">
  <PlacemarkList {placemarks} />
</Card>
</form>