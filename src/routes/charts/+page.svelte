<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import { onMount } from "svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import { currentSession, subTitle } from "$lib/stores";
  import { get } from "svelte/store";
  import Card from "$lib/ui/Card.svelte";

  const countByCategory = {
    labels: ["Beach", "Surf Spot", "Mobile Sauna", "Coastal Path", "Diving Board", "Snorkelling"],
    datasets: [
      {
        values: [0, 0, 0, 0, 0, 0]
      }
    ]
  };

  const totRatingByCategory = {
    labels: ["Beach", "Surf Spot", "Mobile Sauna", "Coastal Path", "Diving Board", "Snorkelling"],
    datasets: [
      {
        values: [0, 0, 0, 0, 0, 0]
      }
    ]
  };

  const avgRatingByCategory = {
    labels: ["Beach", "Surf Spot", "Mobile Sauna", "Coastal Path", "Diving Board", "Snorkelling"],
    datasets: [
      {
        values: [0, 0, 0, 0, 0, 0]
      }
    ]
  };

  subTitle.set("Charts and Graphs");

  onMount(async () => {
    const placemarkList = await placemarkService.getPlacemarks(get(currentSession));
    placemarkList.forEach((placemark) => {
      if (placemark.category == "Beach") {
        countByCategory.datasets[0].values[0] += 1;
        totRatingByCategory.datasets[0].values[0] += placemark.rating;
        avgRatingByCategory.datasets[0].values[0] = totRatingByCategory.datasets[0].values[0] / countByCategory.datasets[0].values[0];
      } else if (placemark.category == "Surf Spot") {
        countByCategory.datasets[0].values[1] += 1;
        totRatingByCategory.datasets[0].values[1] += placemark.rating;
        avgRatingByCategory.datasets[0].values[1] = totRatingByCategory.datasets[0].values[1] / countByCategory.datasets[0].values[1];
      } else if (placemark.category == "Mobile Sauna") {
        countByCategory.datasets[0].values[2] += 1;
        totRatingByCategory.datasets[0].values[2] += placemark.rating;
        avgRatingByCategory.datasets[0].values[2] = totRatingByCategory.datasets[0].values[2] / countByCategory.datasets[0].values[2];
      } else if (placemark.category == "Coastal Path") {
        countByCategory.datasets[0].values[3] += 1;
        totRatingByCategory.datasets[0].values[3] += placemark.rating;
        avgRatingByCategory.datasets[0].values[3] = totRatingByCategory.datasets[0].values[3] / countByCategory.datasets[0].values[3];
      } else if (placemark.category == "Diving Board") {
        countByCategory.datasets[0].values[4] += 1;
        totRatingByCategory.datasets[0].values[4] += placemark.rating;
        avgRatingByCategory.datasets[0].values[4] = totRatingByCategory.datasets[0].values[4] / countByCategory.datasets[0].values[4];
      } else if (placemark.category == "Snorkelling") {
        countByCategory.datasets[0].values[5] += 1;
        totRatingByCategory.datasets[0].values[5] += placemark.rating;
        avgRatingByCategory.datasets[0].values[5] = totRatingByCategory.datasets[0].values[5] / countByCategory.datasets[0].values[5];
      }
    });
  });
</script>

<div class="columns">
  <div class="column">
    <Card title="Placemarks By Category">
      <Chart data={countByCategory} type="bar" />
    </Card>
  </div>
  <div class="column">
    <Card title="Average Rating of Placemark by Category">
      <Chart data={avgRatingByCategory} type="line" />
    </Card>
  </div>
</div>
