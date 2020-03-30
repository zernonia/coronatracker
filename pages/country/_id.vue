<template>
  <div>
    <side-bar />
    <div class="mainBar">
        <div>
            <global-data :totalConfirmed="Confirmed" :totalDeaths="Deaths" :totalRecovered="Recovered"  :totalNewCases="NewCases" :totalNewDeaths="NewDeaths" :totalNewRecovered="NewRecovered" :totalActiveCases="ActiveCases" />
            <div class=" w-full flex relative">
                <h1 class="absolute text-gray-900 z-10 font-extrabold text-6xl top-0 left-0"><span class="underline-magic">{{ country }}</span></h1>
                <line-daily-country style="height:450px" :series="series" :completed="completed" />
                <ratio-data :totalConfirmed="Confirmed" :totalDeaths="Deaths" :totalRecovered="Recovered" :completed="completed"/>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import GlobalData from '~/components/GlobalData.vue';
import LineDailyCountry from '~/components/LineDailyCountry.vue';
import RatioData from '~/components/RatioData.vue';
import SideBar from '~/components/sidebar.vue';


export default {
  components: {
    GlobalData,
    LineDailyCountry,
    RatioData,
    SideBar,

  },
  data() {
        return {
            Confirmed: 0,
            Deaths: 0,
            Recovered: 0,
            NewCases: 0,
            NewDeaths: 0,
            NewRecovered: 0,
            ActiveCases: 0,
            completed: false,
            country: "",
            series: [{
                name: 'Confirmed',
                data: []
                },
                {
                name: 'Deaths',
                data: []
                },
                {
                name: 'Recovered',
                data: []
                }]
            
        }
    },
    created() {
        const slug = this.$route.params.id
        const url = `https://api.coronatracker.com/v3/stats/worldometer/country?countryCode=${slug}`
        axios.get(url).then( res => {
            this.Confirmed = res.data[0].totalConfirmed,
            this.Deaths = res.data[0].totalDeaths,
            this.Recovered = res.data[0].totalRecovered,
            this.NewCases = res.data[0].dailyConfirmed,
            this.NewDeaths = res.data[0].dailyDeaths,
            this.ActiveCases = res.data[0].activeCases,
            this.country = res.data[0].country

        }).catch( e => { console.log(e) })

        // Datetime
        const d = new Date()
        const date = d.getDate()
        const m = d.getMonth() + 1
        const month = `0${m}`
        const year = d.getFullYear()

        var series

        const urldate = `https://api.coronatracker.com/v3/analytics/trend/country?countryCode=${slug}&startDate=${year}-${month}-${date - 14}&endDate=${year}-${month}-${date + 1}`
        axios.get(urldate).then( res => {
            for (var i = 0; i < res.data.length; i++){

                var totalConfirmed= []
                var totalDeaths= []
                var totalRecovered= []

                totalConfirmed.push(Date.parse(res.data[i].last_updated), res.data[i].total_confirmed)
                this.series[0].data.push(totalConfirmed)
                totalDeaths.push(Date.parse(res.data[i].last_updated), res.data[i].total_deaths)
                this.series[1].data.push(totalDeaths)
                totalRecovered.push(Date.parse(res.data[i].last_updated), res.data[i].total_recovered)
                this.series[2].data.push(totalRecovered)        

                this.completed = true
            } 

        },
        

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
