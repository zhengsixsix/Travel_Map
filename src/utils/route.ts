/**
 * @description 获取地图标点
 * @returns 地图标点
 */
export function CreateMapMarkerData(): MarkerItem[] {
  return [
    {
      title: "标题",
      tags: ["旅游"],
      date: "2023-9-2",
      route: "/sss",
      coords: [114.321939, 30.550686],
      desc: "备注",
      city: "随机",
      preview: "预览",
    },
  ];
}
