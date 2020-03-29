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
      <no-ssr>
        <div class=" p-6 rounded-lg shadow-xl bg-white w-auto block relative m-6">
          <map-data />
        </div>
      </no-ssr>
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

export default {
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
        }
    },
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
    }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
