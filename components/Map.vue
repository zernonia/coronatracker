<template>
  <div id="map-wrap" style="height: 400px; width:100%" v-if="completed"  >
    <client-only>
        <l-map  class=" rounded-lg" :zoom=2 :center="[55.9464418,8.1277591]">
            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
            <l-geo-json @click="gotopage(geo.properties.iso_a2)" v-for="geo in geojson.features" :key="geo.index" :geojson="geo" :visible="geo.properties.showmap" :options="options" :options-style="styleFunction"></l-geo-json>
            <l-marker @click="gotopage(marker.code)" v-for="marker in geodata" :key="marker.id" :lat-lng="marker.position" >
                <l-icon icon-url="~"  />
                <l-tooltip>
                    <strong>{{ marker.country }}</strong> <br>
                    Confirmed : {{ marker.confirmed }} <br>
                    Deaths : {{ marker.deaths }} <br>
                    Recovered : {{ marker.recovered }}
                </l-tooltip>
            </l-marker>            
        </l-map>
    </client-only>
  </div>
</template>

<script>
import axios from 'axios'
import geojson from '~/static/geojson.json'

export default {
props:{
    geodata : Array,
    completed : Boolean
},
data(){
    return{
        geojson,
        
    }
},
// mounted() {
//     axios.get('https://api.coronatracker.com/v2/analytics/country').then( res => {
//         for (var i = 0; i < res.data.length; i++){
//             if (res.data[i].lat != undefined && res.data[i].lng != undefined){

//                 var temp = {
//                     position: {
//                         lat: 0,
//                         lng: 0
//                     },
//                     confirmed:0,
//                     deaths:0,
//                     recovered:0,
//                     country: "",
//                     code: "",
//                 }
//                 temp.position.lat = res.data[i].lat,
//                 temp.position.lng = res.data[i].lng,
//                 temp.confirmed = res.data[i].confirmed,
//                 temp.deaths = res.data[i].deaths,
//                 temp.recovered = res.data[i].recovered,
//                 temp.country = res.data[i].countryName
//                 temp.code = res.data[i].countryCode
                
//                 this.geodata.push(temp)
//             }
//         }
//     }).catch(e => console.log(e)).finally( () => {
//         this.completed = true
//     })
// },
methods: {
    gotopage(countrycode){
        window.location = `/country/${countrycode}`
    },
    searchfilter(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].country === nameKey) {
            return myArray[i];
        }
    }},
    getColor(d) {
    return d > 60000 ? '#a50f15' :
           d > 20000  ? '#de2d26' :
           d > 2000  ? '#fb6a4a' :
           d > 500  ? '#fcae91' :
           d > 100  ? '#fcbba1' :
           d > 20   ? '#fee5d9' :
                      '#ffffff';
}

},
computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction,
        // filter: this.filteringdata
      };
    },
    styleFunction() {
      return () => {
        return {
          weight: 1.5,
          color: "#a50f15",
          opacity: 0.7,
          fillOpacity: 0.4
        };
      };
    },
    filteringdata(geoJsonFeature){
        
        return (true)
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        const filterdata = this.searchfilter(feature.properties.name, this.geodata)
        if (filterdata != undefined){ 
            feature.properties.showmap = true
            feature.properties.confirmed = filterdata.confirmed
            feature.properties.deaths = filterdata.deaths
            feature.properties.recovered = filterdata.recovered
            }
        else { 
            feature.properties.showmap = false
            feature.properties.confirmed = 0
            feature.properties.deaths = 0
            feature.properties.recovered = 0
        }

        layer.options.fillColor = this.getColor(feature.properties.confirmed)

        layer.bindTooltip(
          "<div><strong>" +
            feature.properties.name +
            "</strong></div><div>Confirmed : " +
            feature.properties.confirmed +
            "</div><div>Deaths : " +
            feature.properties.deaths +
            "</div><div>Recovered : " +
            feature.properties.recovered +
            "</div>",
          { permanent: false, sticky: true }
        );

    }}
}
}
</script>

<style>
</style>