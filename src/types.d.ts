interface LayerMapItem {
  name: string;
  layer: Vector<any>;
}

interface RouteMetaFrontmatter {
  title: string;
  tags: string[];
  date: string;
  route: string;
}

interface MarkerItem extends RouteMetaFrontmatter {
  coords: number[];
  desc?: string;
  city: string;
  preview?: string;
}
