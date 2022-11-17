import {createApp} from 'vue';
import App from './App.vue';
import Router from "@/router";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import VueCesium from 'vue-cesium';
import 'vue-cesium/dist/index.css';
import OpenLayersMap from 'vue3-openlayers';
import 'vue3-openlayers/dist/vue3-openlayers.css';
import axios from 'axios';
import OLCesium from 'olcs/OLCesium.js';

createApp(App).use(Router).use(VueCesium).use(OpenLayersMap).use(ElementPlus).component("OLCesium", OLCesium).component("axios", axios).mount('#app');