import { Overlay, containsCoordinate } from "~/ol-imports";
import moment from "moment";
import { Coordinate } from "ol/coordinate";
import { InteractionEvent } from "./interaction";
export class MarkerPreview {
  overlay: Overlay;
  information?: MarkerItem | null;
  readonly BaseOffset = 70;

  events: Set<Function> = new Set();
  element: HTMLElement | null = null;
  constructor(element: HTMLElement) {
    this.element = element;
    this.overlay = new Overlay({
      element,
      positioning: "center-center",
      offset: [28, -73],
      stopEvent: false,
    });
  }
  contains(extent: Coordinate) {
    return containsCoordinate(this.getCoordinates(), extent);
  }
  runEvent(e: InteractionEvent) {
    console.log(e);
  }
  getCoordinates() {
    const element = this.overlay.getElement();
    if (element) {
      const { x, y, width, height } = element.getBoundingClientRect();
      return [x, y - this.BaseOffset, x + width, y + height - this.BaseOffset];
    } else {
      return [];
    }
  }
  setPosition(position?: Coordinate) {
    this.overlay.setPosition(position);
  }
  setPreview(info?: MarkerItem) {
    this.information = info;
  }
  setStyle(info?: MarkerItem) {
    if (!info) return;
    const { preview = "", title = "", date = "", desc = "" } = info;
    const previewContainer = document.querySelector("#map_marker_preview");

    if (previewContainer == null) return;

    const img = previewContainer.querySelector("img");
    img && img.setAttribute("src", preview);

    const titleDom = previewContainer.querySelector("div.title");
    titleDom && (titleDom.textContent = title);

    const descDom = previewContainer.querySelector("div.desc");
    descDom && (descDom.textContent = desc);

    const dateDom = previewContainer.querySelector("div.date");
    dateDom && (dateDom.textContent = moment(date).format("YY-MM-DD"));
  }
}
export const CreateMarkerPreview = (): MarkerPreview => {
  const element = document.getElementById("map_marker_preview");

  if (element == null) return {} as MarkerPreview;
  const preview = new MarkerPreview(element);
  return preview;
};
