<script setup lang="ts">
import { onMounted } from "vue";
import { SetupMap } from "~/hooks/useMap/index";
const { initMap } = SetupMap();
onMounted(() => {
  initMap();
});
</script>

<template>
  <div id="map"></div>
</template>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
