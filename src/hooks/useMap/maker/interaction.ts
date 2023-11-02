import { Coordinate } from "ol/coordinate";
import { Condition, pointerMove } from "ol/events/condition";
import { Layer, Map, Select, Point } from "~/ol-imports";

export interface InteractionEvent {
  hit: boolean;
  info?: MarkerItem;
  coords?: Coordinate;
  other?: any;
}

export class Interaction {
  interaction: Select;
  constructor(layer: Layer, condition: Condition) {
    this.interaction = new Select({
      layers: [layer],
      condition,
      style: null,
    });
  }

  mount(map: Map) {
    map.addInteraction(this.interaction);
  }
  on(callback: (item: InteractionEvent) => void) {
    this.interaction.on("select", (e) => {
      const item: InteractionEvent = {
        hit: e.selected.length > 0,
        info: {} as MarkerItem,
      };
      if (item.hit) {
        const selectedFeature = e.selected[0];
        item.info = selectedFeature.get("info");

        const geometry = selectedFeature.getGeometry();
        if (geometry instanceof Point) {
          item.coords = geometry.getCoordinates();
          
        }
      }
      callback(item);
    });
  }
}
