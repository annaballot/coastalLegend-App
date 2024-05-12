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
    placemarks = await placemarkService.getPlacemarks(get(currentSession));

    placemarks.forEach((placemark: Placemark) => {
      const popup = `<b>${placemark.name} </b><br>Category: ${placemark.category} <br>Rating: ${placemark.rating}`;
        map.addMarker(placemark.latitude, placemark.longitude, popup, placemark.category);

    });
    const lastPlacemark = placemarks[placemarks.length - 1];
    if (lastPlacemark) map.moveTo(lastPlacemark.latitude, lastPlacemark.longitude);
  });

  latestPlacemark.subscribe(async (createPlacemark) => {
    if (createPlacemark) {
      placemarks.push(createPlacemark);
      placemarks = [...placemarks];
      placemarks.forEach((placemark: Placemark) => {
        console.log("Adding markers to map");
        console.log(placemark.name, placemark.latitude, placemark.longitude);
        const popup = `<b>${placemark.name} </b><br>Category: ${placemark.category} <br>Rating: ${placemark.rating}`;
            map.addMarker(placemark.latitude, placemark.longitude, popup, placemark.category);
        });
        console.log("latestPlacemark")
      const lastCreatedPlacemark = placemarks[placemarks.length - 1];
      console.log("latest placemark: " + lastCreatedPlacemark.name);
        if (lastCreatedPlacemark) {
            map.moveTo(lastCreatedPlacemark.latitude, lastCreatedPlacemark.longitude);
        }
    // }
      }
  });
  

  subTitle.set("Create a Placemark");

</script>


<div class="columns">
  <div class="column">
    <Card title="View your Placemarks">
      <LeafletMap height={45} addCategories={true} bind:this={map} />
    </Card>
  </div>
  <div class="column">
<Card title="Create a Placemark">
  <CreatePlacemarkForm />
</Card>
</div>
</div>

