import {
  GeoJSON,
  Map,
  SourceVector,
  Vector,
  intersects,
  transformExtent,
} from "~/ol-imports";
import { ALL_EXTENT } from "~/data/province";
import { EPSG4326 } from "../config";
import { LayerCacheMap, LayerIndex } from ".";

export function SetupEventListener(map: Map) {
  ChangeResolutionListener(map);
}

export function ChangeResolutionListener(map: Map) {
  map.getView().on("change", (e) => {
    const mapView = e.target;
    const zoom = e.target.getZoom();
    const currentExtent = mapView.calculateExtent(map.getSize());
    const transformedExtent = transformExtent(
      currentExtent,
      mapView.getProjection(),
      EPSG4326
    );

    for (const _index in LayerCacheMap) {
      const index = _index as any as LayerIndex;
      if (index <= LayerIndex.First) continue;

      if (zoom > index) {
        for (const key in ALL_EXTENT) {
          const extent = ALL_EXTENT[key];
          const isCityInView = intersects(extent, transformedExtent);

          const LayerCache = LayerCacheMap[index][key];

          if (!LayerCache || !LayerCache.layer) continue;

          const layer = LayerCache.layer;

          if (isCityInView) {
            if (!layer.getVisible()) layer.setVisible(true);
          } else {
            layer.setVisible(false);
          }
        }
      } else {
        for (const key in ALL_EXTENT) {
          const LayerCache = LayerCacheMap[index][key];
          if (LayerCache && LayerCache.layer) {
            LayerCache.layer.setVisible(false);
          }
        }
      }
    }
  });
}
