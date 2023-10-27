import { Map, View, fromLonLat, transformExtent } from "~/ol-imports";

import { MAP_DEFAULT_OPTIONS, EPSG4326 } from "./config";

import {
  SetupBaseLayer,
  SetupProvinceLayer,
  SetupEventListener,
} from "./layer";

import { SetupMarkerLayer } from "./maker";

import { setupWindowEventListener } from "~/utils/window";

import { ref } from "vue";

function CreateMap() {
  const { center, zoom, minZoom, maxZoom, extent } = MAP_DEFAULT_OPTIONS;
  const map = new Map({
    target: "map",
    layers: [],
    controls: [],
  });
  map.setView(
    new View({
      center: fromLonLat(center),
      zoom,
      minZoom,
      maxZoom,
      constrainResolution: true,
      extent: transformExtent(extent, EPSG4326, map.getView().getProjection()),
    })
  );
  return map;
}

export function SetupMap() {
  const map = ref<Map>();

  const { listen, watchWindowChange } = setupWindowEventListener();
  const initMap = () => {
    map.value = CreateMap();
    SetupBaseLayer(map.value);
    SetupProvinceLayer(map.value);

    SetupMarkerLayer(map.value, watchWindowChange);

    SetupEventListener(map.value);

    listen();
  };
  return { initMap, map };
}
