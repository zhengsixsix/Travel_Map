import { watch } from "vue";
import { Fill, Style, Text, Stroke } from "~/ol-imports";

export function CreateLayerStyle(feature: any) {
  const text = new Text({
    text: feature.get("name_zh") || feature.get("name"),
    fill: new Fill({ color: "black" }),
    stroke: new Stroke({ color: "white" }),
  });
  const stroke = new Stroke({
    color: feature.get("name") === "China" ? "transparent" : "pink",
    width: 1,
  });
  return [
    new Style({
      text,
      stroke,
    }),
  ];
}
