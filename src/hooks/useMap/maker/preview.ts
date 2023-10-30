import { Overlay } from "~/ol-imports";

export class MarkerPreview {
  overlay: Overlay;
  information?: MarkerItem | null;
  readonly BaseOffset = 70;

  events: Set<Function> = new Set();

  constructor(element: HTMLElement) {
    this.overlay = new Overlay({
      element,
      positioning: "center-center",
      offset: [-100, -270],
      stopEvent: false,
    });
  }
}
