<script lang="ts">
    import Card from "$lib/ui/Card.svelte";
    import PlacemarkList from "$lib/ui/PlacemarkList.svelte";
    import { placemarkService } from "$lib/services/placemark-service";
    import type { Placemark } from "$lib/types/placemark-types";
    import { currentSession, subTitle } from "$lib/stores";
  
    import { onMount } from "svelte";
    import { get } from "svelte/store";
  
    
  
  
    subTitle.set("Report");
    let placemarks: Placemark[] = [];
    let category = ["Beach", "Surf Spot", "Mobile Sauna", "Coastal Path", "Diving Board", "Snorkelling"];
    let selectedCategory = "";
    let message = "Please select a category";

    onMount(async () => {
      placemarks = await placemarkService.filterCategory(get(currentSession),"Beach");
    });


    async function filterPlacemark() {
    // console.log(`Just added: ${name} with category ${category} and description ${description} `);
    // console.log(`latitude: ${latitude}, longitude: ${longitude}`);

    if (selectedCategory) {
    placemarks = await placemarkService.filterCategory(get(currentSession),selectedCategory);
    
    } else {
      message = "Please select amount, method and candidate";
    }
  }



  
  </script>
  

  <form on:submit|preventDefault={filterPlacemark}>


    <label class="label" for="category">Select Category:</label>
    <div class="select">
      <select bind:value={selectedCategory}>
        {#each category as cat}
          <option value={cat}>{cat}</option>
        {/each}
      </select>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-success">Filter Placemarks</button>
      </div>
    </div>


</form>


  <Card title="Placemarks">

   <PlacemarkList {placemarks}/>
  </Card>
  
  
  