import { Map, GeoJSON, Vector, SourceVector, Group } from "~/ol-imports";
import { CreateAddLayerCache, LayerIndex } from ".";
import { CreateLayerStyle } from "../style";

export function SetupBaseLayer(map: Map) {
  const asiaLayer = CreateMap("/geojson/asia.json");
  const chinaLayer = CreateMap("/geojson/china.json");
  const japanLayer = CreateMap("/geojson/japen.json");

  CreateAddLayerCache(LayerIndex.Zero, "asia", asiaLayer);
  CreateAddLayerCache(LayerIndex.First, "china", chinaLayer);
  CreateAddLayerCache(LayerIndex.Second, "japen", japanLayer);

  const layerGroup = new Group({
    layers: [asiaLayer, chinaLayer, japanLayer],
  });
  map.addLayer(layerGroup);
}

function CreateMap(url: string) {
  const layer = new Vector({
    source: new SourceVector({
      url,
      format: new GeoJSON(),
    }),
  });
  layer.setStyle(CreateLayerStyle);
  return layer;
}
