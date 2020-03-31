import Vue from 'vue';
import { LMap, LTileLayer, LMarker, LPopup, LTooltip, LGeoJson, LIcon } from "vue2-leaflet";
/* purgecss start ignore */
import 'leaflet/dist/leaflet.css';
/* purgecss end ignore */

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-popup', LPopup);
Vue.component('l-tooltip', LTooltip);
Vue.component('l-geo-json', LGeoJson);
Vue.component('l-icon', LIcon);