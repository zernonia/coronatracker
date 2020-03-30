<template>
  <div class="container">
    <side-bar></side-bar>
    <div class="mainBar">
      <global-data :totalConfirmed="totalConfirmed" :totalDeaths="totalDeaths" :totalRecovered="totalRecovered"  :totalNewCases="totalNewCases" :totalNewDeaths="totalNewDeaths" :totalNewRecovered="0" />
      <div class=" w-full flex relative">
        <h1 class="absolute text-gray-900 z-10 font-extrabold text-6xl top-0 left-0"><span class="underline-magic">Corona Tracker</span></h1>
        <line-daily />
        <ratio-data :totalConfirmed="totalConfirmed" :totalDeaths="totalDeaths" :totalRecovered="totalRecovered" :completed="completed"/>
      </div>
      <client-only>
        <div class=" p-6 rounded-lg shadow-xl bg-white w-auto block relative m-6">
          <map-data :geodata="geodata" :completed="completed2" />
        </div>
      </client-only>
      <div class=" m-6 shadow-xl rounded-lg overflow-hidden" >
        <vue-good-table
          v-if="completed2"
          :columns="columns"
          :rows="rows"
          :fixed-header="true"
          :sort-options="{
          enabled: true,
          initialSortBy: {field: 'confirmed', type: 'desc'}
            }"
          :pagination-options="{
              enabled: true
            }"
          :search-options="{
              enabled: true
            }"
          @on-row-click="onRowClick"
          />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import GlobalData from '~/components/GlobalData.vue';
import LineDaily from '~/components/LineDaily.vue';
import RatioData from '~/components/RatioData.vue';
import MapData from '~/components/Map.vue';
import SideBar from '~/components/sidebar.vue';
import countrynames from '~/static/convertcode'

export default {
  transitions: 'bounce',
  components: {
    GlobalData,
    LineDaily,
    RatioData,
    MapData,
    SideBar,

  },
  data() {
    return {
      totalConfirmed: 0,
      totalDeaths: 0,
      totalRecovered: 0,
      totalNewCases: 0,
      totalNewDeaths: 0,
      totalActiveCases: 0,
      completed: false,
      completed2: false,
      geodata: [],
      isoCountries : countrynames,
      columns: [
      {
        label: 'Country',
        field: 'country',
      },
      {
        label: 'Confirmed',
        field: 'confirmed',
        type: 'number',
      },
      {
        label: 'Deaths',
        field: 'deaths',
        type: 'number',
      },
      {
        label: 'Recovered',
        field: 'recovered',
        type: 'number',
      },
      {
        label: 'Recovery Ratio',
        field: 'recoveryratio',
        type: 'percentage',
      },
      {
        label: 'Death Ratio',
        field: 'deathsratio',
        type: 'percentage',
      },
    ],
    rows: [],
  }}  ,
  created() {
      const url = 'https://api.coronatracker.com/v3/stats/worldometer/global'
      axios.get(url).then( res => {
          this.totalConfirmed = res.data.totalConfirmed,
          this.totalDeaths = res.data.totalDeaths,
          this.totalRecovered = res.data.totalRecovered,
          this.totalNewCases = res.data.totalNewCases,
          this.totalNewDeaths = res.data.totalNewDeaths,
          this.totalActiveCases = res.data.totalActiveCases,

          this.completed = true
      }
      ).catch( e => { console.log(e) })

      axios.get('https://api.coronatracker.com/v2/analytics/country').then( res => {
      for (var i = 0; i < res.data.length; i++){
          if (res.data[i].lat != undefined && res.data[i].lng != undefined){

              var temp = {
                  position: {
                      lat: 0,
                      lng: 0
                  },
                  confirmed:0,
                  deaths:0,
                  recovered:0,
                  country: "",
                  code: "",
              }
              temp.position.lat = res.data[i].lat,
              temp.position.lng = res.data[i].lng,
              temp.confirmed = res.data[i].confirmed,
              temp.deaths = res.data[i].deaths,
              temp.recovered = res.data[i].recovered,
              temp.country = res.data[i].countryName
              temp.code = res.data[i].countryCode
              
              this.geodata.push(temp)


              const temp2 = {
                country: "",
                confirmed: 0,
                deaths: 0,
                recovered: 0,
                recoveryratio: 0,
                deathsratio: 0,
              }
              temp2.confirmed = res.data[i].confirmed,
              temp2.deaths = res.data[i].deaths,
              temp2.recovered = res.data[i].recovered,
              temp2.country = res.data[i].countryName
              temp2.recoveryratio = ((temp2.recovered / temp2.confirmed) > 0 ? (temp2.recovered / temp2.confirmed) : 0)
              temp2.deathsratio = ((temp2.deaths / temp2.confirmed) > 0 ? (temp2.deaths / temp2.confirmed) : 0)

              this.rows.push(temp2)
          }
      }
  }).catch(e => console.log(e)).finally( () => {
      this.completed2 = true
    })
  },
  methods: {
  onRowClick(params) {
    // params.row - row object 
    this.gotocountry(params.row.country)
    // params.pageIndex - index of this row on the current page.
    // params.selected - if selection is enabled this argument 
    // indicates selected or not
    // params.event - click event
  },
  gotocountry(result){
      const country_code = this.getCountryCode(`${result}`)
      this.$router.push({ path: `/country/${country_code}`})
    },
  getCountryCode(countryName) {
    if (this.isoCountries.hasOwnProperty(countryName)) {
        return this.isoCountries[countryName];
    } else {
        return countryName;
    }
}
}}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

</style>
