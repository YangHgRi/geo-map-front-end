<template>
  <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height:600px">
    <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection"/>

    <!--图像层-->
    <ol-tile-layer>
      <!--osm -> OpenStreetMap.org，从这个网站获取地图数据-->
      <!--<ol-source-osm/>-->
      <!--天地图源-->
      <!--layerType: img（卫星图）, vec（街道图）, ter（地形图）, eia（看不出来英文标注干嘛的，八成用不上）, cta（高速图），默认 img-->
      <ol-source-tianditu layerType="ter" projection="EPSG:4326" tk="00652b525d97afe1cc85ddea1759a430" :hidpi="true"></ol-source-tianditu>
    </ol-tile-layer>

    <!--地理位置标注层，不同 layerType 标注样式不同-->
    <ol-tile-layer>
      <ol-source-tianditu :isLabel="true" layerType="vec" projection="EPSG:4326" tk="00652b525d97afe1cc85ddea1759a430" :hidpi="true"></ol-source-tianditu>
    </ol-tile-layer>
  </ol-map>
</template>

<script>
import {ref} from "vue";

export default {
  name: 'JustAMap',
  zh_label: '只是个地图',
  data() {
    return {}
  },
  setup() {
    // 初始地图中心位置 -> 北京的经纬度
    const center = ref([116.4, 39.9])
    // 地图投影法：WGS 84，默认 -> EPSG:3857（墨卡托投影）
    const projection = ref('EPSG:4326')
    // 初始缩放，默认 -> 0,当 resolution 属性为空时启用
    const zoom = ref(8)
    // 初始地图旋转弧度（顺时针方向）
    const rotation = ref(0)
    return {center, projection, zoom, rotation}
  },
}
</script>