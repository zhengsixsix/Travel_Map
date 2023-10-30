import { Layer, Map, click, pointerMove } from "~/ol-imports";

import { CreateMarkerLayer } from "./point";
import { MarkerPreview } from "./preview";
import { Interaction } from "./interaction";

export function SetupMarkerLayer(map: Map, watchWindowChange: Function) {
  // 创建点图层
  const containerLayer = CreateMarkerLayer();

  map.addLayer(containerLayer);
  map.getView().on("change:resolution", containerLayer.changed);
  const preview = null;

  BindMarkerEvents(map, containerLayer);
}

// 点击事件
function BindMarkerEvents(map: Map, layer: Layer, preview?: MarkerPreview) {
  const interaction = new Interaction(layer, pointerMove);
  interaction.mount(map);
  interaction.on((e) => {
    const { hit, info, coords } = e;
    console.log(hit, info, coords);
  });
}
