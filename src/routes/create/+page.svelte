<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import CreatePlacemarkForm from "./CreatePlacemarkForm.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import PlacemarkList from "$lib/ui/PlacemarkList.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import type { Placemark } from "$lib/types/placemark-types";
  import { currentSession, latestPlacemark, subTitle } from "$lib/stores";

  import { onMount } from "svelte";
  import { get } from "svelte/store";

  
  let map: LeafletMap;
  let placemarks: Placemark[] = [];

  onMount(async () => {
    // candidateList = await placemarkService.getCandidates(get(currentSession));
    placemarks = await placemarkService.getPlacemarks(get(currentSession));
    // candidates = await placemarkService.getCandidates(get(currentSession));
    // placemarksByCandidate = generateByCandidate(placemarks, candidates);

    placemarks.forEach((placemark: Placemark) => {
      // if (typeof placemark.candidate !== "string") {
        // const popup = `${placemark.name} Category: ${placemark.category} Rating: ${placemark.rating}`;
        const popup = `Category`;
        map.addMarker(placemark.latitude, placemark.longitude, popup);
      // }
    });
    const lastPlacemark = placemarks[placemarks.length - 1];
    if (lastPlacemark) map.moveTo(lastPlacemark.latitude, lastPlacemark.longitude);
  });

  latestPlacemark.subscribe(async (placemark) => {
    if (placemark) {
      placemarks.push(placemark);
      placemarks = [...placemarks];
      // placemarksByCandidate = generateByCandidate(placemarks, candidates);
    }
    // if (typeof placemark.candidate !== "string") {
      // const popup = `${placemark.name} Category: ${placemark.category} Rating: ${placemark.rating}`;
      const popup = `Category`;
      map.addMarker(placemark.latitude, placemark.longitude, popup);
      map.moveTo(placemark.latitude, placemark.longitude);
    // }
  });
  console.log("latestPlacemark")
  console.log(latestPlacemark)

  subTitle.set("Create a Placemark");

</script>


<div class="columns">
  <div class="column">
    <Card title="View your Placemarks">
      <LeafletMap height={45} bind:this={map} />
    </Card>
  </div>
  <div class="column">
<Card title="Create a Placemark">
  <CreatePlacemarkForm />
</Card>
</div>
</div>

