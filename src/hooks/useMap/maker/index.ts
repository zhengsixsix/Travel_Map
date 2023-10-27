import { Map } from "~/ol-imports";

import { CreateMarkerLayer } from "./point";

export function SetupMarkerLayer(map: Map, watchWindowChange: Function) {
  // 创建点图层
  const containerLayer = CreateMarkerLayer();

  map.addLayer(containerLayer);
  map.getView().on("change:resolution", containerLayer.changed);
}
