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
  <div id="map_marker_preview">
    <div class="img_box">
      <img />
    </div>
    <div class="info">
      <div class="title" />
      <div class="desc" />
      <div class="date" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
#map_marker_preview {
  display: flex;
  box-sizing: border-box;
  position: absolute;
  pointer-events: none;
  z-index: 100;
  width: 300px;
  height: 120px;
  background-color: #eaeaea;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;

  &::before,
  &::after {
    position: absolute;

    content: "";
    width: 0;
    height: 0;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-top: 10px solid #eaeaea;

    @media (max-width: 640px) {
      bottom: -20px;
      left: 50%;
      margin-left: -10px;
    }

    @media (min-width: 640px) {
      top: 50%;
      left: -20px;
      margin-top: -10px;
      border-top: 10px solid transparent;
      border-right: 10px solid #eaeaea;
    }
  }

  .img_box {
    max-width: 100px;
    height: auto;
    border-radius: 5px;
    margin-right: 20px;
    padding-bottom: 0;

    img {
      height: 100%;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    span {
      display: inline-block;
    }
    .title {
      width: 100%;
      font-size: 14px;
      opacity: 0.8;
    }

    .desc {
      font-size: 12px;
      opacity: 0.7;
    }

    .date {
      text-align: right;
      font-size: 12px;
      opacity: 0.5;
    }
  }

  @media (max-width: 640px) {
    display: inherit;
    width: 200px;
    height: 230px;

    .img_box {
      display: flex;
      justify-content: center;
      width: 100%;
      max-width: 100%;
      height: 100px;
      margin-right: 0;
      padding-bottom: 20px;
    }

    .info {
      height: 100px;

      .title {
        text-align: center;
      }
    }
  }
}
</style>
