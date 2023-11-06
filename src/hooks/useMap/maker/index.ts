import { Layer, Map, click, pointerMove } from "~/ol-imports";

import { CreateMarkerLayer } from "./point";
import { MarkerPreview, CreateMarkerPreview } from "./preview";
import { Interaction } from "./interaction";
import { useRouter } from "vue-router";

export function SetupMarkerLayer(map: Map, watchWindowChange: Function) {
  // 创建点图层
  const containerLayer = CreateMarkerLayer();

  map.addLayer(containerLayer);
  map.getView().on("change:resolution", containerLayer.changed);
  const preview = CreateMarkerPreview();
  map.addOverlay(preview.overlay);

  BindMarkerEvents(map, containerLayer, preview);
}

// 点击事件
function BindMarkerEvents(map: Map, layer: Layer, preview: MarkerPreview) {
  const router = useRouter();
  const interaction = new Interaction(layer, pointerMove);
  interaction.mount(map);
  interaction.on((e) => {
    const { hit, info, coords } = e;
    map.getTargetElement().style.cursor = hit ? "pointer" : "default";
    preview.setPreview(info);
    preview.setStyle(info);
    preview.setPosition(coords);
  });
  const interactions = new Interaction(layer, click);
  interactions.mount(map);
  interactions.on(({ info }) => {
    if (info?.route) router.push(info?.route);
  });
}
