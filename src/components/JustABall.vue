<template>
  <el-row ref="viewerContainer" class="demo-viewer">
    <vc-viewer ref="vcViewer" :animation="animation" :base-layer-picker="baseLayerPicker" :timeline="timeline" :fullscreen-button="fullscreenButton"
               :fullscreen-element="fullscreenElement" :info-box="infoBox" :skyAtmosphere="false" :skyBox="false" :scene-mode-picker="true"
               :show-credit="showCredit" @cesium-ready="onCesiumReady" @ready="onViewerReady" @left-click="onLeftClick" @touch-end="onTouchEnd">
      <vc-navigation :offset="offset" @compass-evt="onNavigationEvt" :other-opts="otherOpts" @zoom-evt="onNavigationEvt"></vc-navigation>

      <!--最上层盖一层字，并指定这个字的覆盖范围-->
      <!--<vc-entity v-model:billboard="billboard" ref="entity" @click="onEntityClick" :position="{lng: 108, lat: 32}" :point="point" :label="label">
        <vc-graphics-billboard ref="billboard" image="https://zouyaoji.top/vue-cesium/favicon.png"></vc-graphics-billboard>
        <vc-graphics-rectangle :coordinates="[130, 20, 80, 25]" material="green"></vc-graphics-rectangle>
      </vc-entity>-->

      <!--图像层-->
      <vc-layer-imagery>
        <vc-imagery-provider-tianditu map-style="img_c" token="00652b525d97afe1cc85ddea1759a430"></vc-imagery-provider-tianditu>
      </vc-layer-imagery>

      <!--标注层-->
      <vc-layer-imagery ref="layerText">
        <vc-imagery-provider-tianditu map-style="cia_c" token="00652b525d97afe1cc85ddea1759a430"></vc-imagery-provider-tianditu>
      </vc-layer-imagery>
    </vc-viewer>

    <el-row class="demo-toolbar">
      <el-row>
        <el-button type="danger" round @click="unload">销毁</el-button>
        <el-button type="danger" round @click="load">加载</el-button>
        <el-button type="danger" round @click="reload">重载</el-button>
      </el-row>
      <el-row v-if="!loading">
        <el-switch v-model="animation" active-color="#13ce66" inactive-text="动画"></el-switch>
        <el-switch v-model="timeline" active-color="#13ce66" inactive-text="时间轴"></el-switch>
        <el-switch v-model="baseLayerPicker" active-color="#13ce66" inactive-text="基础图层"></el-switch>
        <el-switch v-model="fullscreenButton" active-color="#13ce66" inactive-text="全屏按钮"></el-switch>
        <el-switch v-model="infoBox" active-color="#13ce66" inactive-text="信息提示框"></el-switch>
        <el-switch v-model="showCredit" active-color="#13ce66" inactive-text="版权信息"></el-switch>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "JustABall",
  zh_label: '只是个球',
  data() {
    return {
      loading: true,
      animation: true,
      timeline: true,
      baseLayerPicker: false,
      fullscreenButton: true,
      infoBox: true,
      showCredit: true,
      fullscreenElement: document.body,
      point: {
        pixelSize: 28,
        color: 'red'
      },
      label: {
        text: 'Hello World',
        pixelOffset: [0, 150]
      },
      billboard: {},
      offset: [50, 25],
      otherOpts: {
        offset: [0, 32],
        position: 'bottom-right'
      }
    }
  },
  watch: {
    timeline(val) {
      this.otherOpts.offset = val ? [0, 30] : this.fullscreenButton ? [30, 5] : [0, 5]
    },
    fullscreenButton(val) {
      if (!this.timeline && !val) {
        this.otherOpts.offset = [0, 5]
      } else if (!this.timeline && val) {
        this.otherOpts.offset = [30, 5]
      }
    }
  },
  mounted() {
    this.$refs.vcViewer.creatingPromise.then(({Cesium, viewer}) => {
      console.log('viewer is loaded.')
    })
  },
  methods: {
    onViewerReady({Cesium, viewer}) {
      this.loading = false
      viewer.scene.globe.enableLighting = true
    },
    onCesiumReady(e) {
      console.log(e)
    },
    onNavigationEvt(e) {
      console.log(e)
    },
    onEntityClick(e) {
      console.log(e)
    },
    onLeftClick(e) {
      console.log(e)
    },
    onTouchEnd(e) {
      console.log(e)
    },
    load() {
      this.$refs.vcViewer.load().then(e => {
        console.log(e)
        this.loading = false
      })
    },
    unload() {
      this.$refs.vcViewer.unload().then(e => {
        console.log(e)
        this.loading = true
      })
    },
    reload() {
      this.loading = true
      this.$refs.vcViewer.reload().then(e => {
        console.log(e)
        this.loading = false
      })
    }
  }
}
</script>

<style>

</style>