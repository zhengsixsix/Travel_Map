import {
  Feature,
  Point,
  SourceVector,
  Vector,
  fromLonLat,
  Style,
  Icon,
} from "~/ol-imports";
import { CreateMapMarkerData } from "~/utils/route";

export function CreateMarkerLayer() {
  const container = new Vector({
    source: new SourceVector(),
  });
  const markerList = CreateMapMarkerData();
  markerList.forEach((item) => {
    const pointFeature = CreatePointFeature(item);
    if (pointFeature) container.getSource()?.addFeature(pointFeature);
  });

  return container;
}
export function CreatePointFeature(item: MarkerItem) {
  if (!item?.coords) return;
  const pointFeature = new Feature({
    geometry: new Point(fromLonLat(item.coords)),
    info: item,
  });
  const iconStyle = new Style({
    image: new Icon({
      src: "/images/icons/marker.svg",
      color: "red",
      scale: 1,
      anchor: [0.15, 0.9], // 图标的锚点位置，[0.5, 1] 表示图标底部中心
    }),
  });
  pointFeature.setStyle(iconStyle);
  return pointFeature;
}
