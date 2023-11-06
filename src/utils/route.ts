import routes from "pages-generated";
import moment from "moment";
/**
 * @description 获取地图标点
 * @returns 地图标点
 */
export function CreateMapMarkerData(): MarkerItem[] {
  const MarkerList: MarkerItem[] = [];
  routes.forEach((route) => {
    if (route.name?.toString().includes("travel")) {
      const frontmatter = route.meta?.frontmatter as any;
      MarkerList.push({
        ...frontmatter,
        route: route.path,
      });
    }
  });
  return MarkerList.sort(
    (a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()
  );
}
