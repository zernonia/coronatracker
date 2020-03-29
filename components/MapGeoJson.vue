<template>
    <client-only>
    <l-map style="height: 350px" :zoom="zoom" :center="center">
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
        <l-geo-json :geojson="geojson" :options="options" :options-style="styleFunction" ></l-geo-json>
    </l-map>
    </client-only>
</template>

<script>
import geojson from '~/static/geojson.json'

export default {
  data () {
    return {
      zoom: 8,
      center: [47.313220, -1.319482],

    };
  }, 
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction
      };
    },
    styleFunction() {
      const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {

        console.log()
        return {
          weight: 1,
          color: "#ffffff",
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 0.3
        };
      };
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        console.log(feature)
        console.log(layer)
        layer.bindTooltip(
          "<div><strong>" +
            feature.properties.name +
            "</strong></div><div>nom: " +
            feature.properties.iso_a2 +
            "</div>",
          { permanent: false, sticky: true }
        )
        };
    }
}}
</script>