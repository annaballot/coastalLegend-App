<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import PlacemarkList from "$lib/ui/PlacemarkList.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import type { Placemark } from "$lib/types/placemark-types";
  import { currentSession, latestPlacemark, subTitle } from "$lib/stores";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";

  import { onMount } from "svelte";
  import { get } from "svelte/store";

  subTitle.set("Report");
  let placemarks: Placemark[] = [];
  let category = ["Beach", "Surf Spot", "Mobile Sauna", "Coastal Path", "Diving Board", "Snorkelling"];
  let selectedCategory = "";
  let message = "Please select a category";
  let map: LeafletMap;
  let activeLayer = "OpenTopoMap";
  let height = 100;

  onMount(async () => {
    placemarks = await placemarkService.getPlacemarks(get(currentSession));
  });

  async function filterPlacemark() {
    // console.log(`Just added: ${name} with category ${category} and description ${description} `);
    // console.log(`latitude: ${latitude}, longitude: ${longitude}`);

    if (selectedCategory) {
      placemarks = await placemarkService.filterCategory(get(currentSession), selectedCategory);
      placemarks.forEach((placemark: Placemark) => {
        const popup = `${placemark.name} Category: ${placemark.category} Rating: ${placemark.rating}`;
        map.addMarker(placemark.latitude, placemark.longitude, popup);
    });
    const lastPlacemark = placemarks[placemarks.length - 1];
    if (lastPlacemark) map.moveTo(lastPlacemark.latitude, lastPlacemark.longitude);

    
      if (selectedCategory == "Beach") {
        // activeLayer = "OpenStreetMap_HOT";
        height = 30;
        // console.log("activeLayer")
        // console.log(activeLayer)
      }
    } else {
      message = "Please select amount, method and candidate";
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

<Card title="View your Placemarks">
  <LeafletMap height={height} activeLayer={activeLayer} bind:this={map} />
</Card>
</form>