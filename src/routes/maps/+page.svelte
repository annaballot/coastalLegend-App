<script lang="ts">
  import Menu from "$lib/ui/Menu.svelte";
  import Heading from "$lib/ui/Heading.svelte";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { currentSession, subTitle } from "$lib/stores";
  import { placemarkService } from "$lib/services/placemark-service";
  import { onMount } from "svelte";
  import type { Placemark } from "$lib/types/placemark-types";
  import { get } from "svelte/store";

  subTitle.set("Location Data");

  let map: LeafletMap;

  onMount(async () => {
    const placemarks = await placemarkService.getPlacemarks(get(currentSession));
    placemarks.forEach((placemark: Placemark) => {
      const popup = `<b>${placemark.name} </b><br>Category: ${placemark.category} <br>Rating: ${placemark.rating}`;
        map.addMarker(placemark.latitude, placemark.longitude, popup, placemark.category);
    });
    const lastPlacemark = placemarks[placemarks.length - 1];
    if (lastPlacemark) map.moveTo(lastPlacemark.latitude, lastPlacemark.longitude);
  });

  </script>
  
  <Card title="Placemark Locations">
    <LeafletMap height={60} addCategories={true} bind:this={map} />
  </Card>
  