<template>
    <div class=" bg-white rounded-lg shadow-lg w-2/3 m-6 py-10 px-6">
        <apexchart  v-if="completed" :options="options" :series="series"></apexchart>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
      completed: false,
      options: {
        chart: {
            fontFamily: 'Poppins, Helvetica, sans-serif',
            height: '100%',
            width: "100%",
            type: "area",
            animations: {
                initialAnimation: {
                    enabled: false
                }
            },
            toolbar: {
                show: true,
                tools: {
                    download: false,
                    selection: false,
                    zoom: true,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: true
                },
                autoSelected: 'zoom' 
            },
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: 'datetime'
            },
        },
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
        const url = 'https://api.coronatracker.com/v3/stats/worldometer/totalTrendingCases?limit=15'
         axios.get(url).then( res => {
            for (var i = 0; i < res.data.length; i++){

                var totalConfirmed= []
                var totalDeaths= []
                var totalRecovered= []

                totalConfirmed.push(Date.parse(res.data[i].lastUpdated), res.data[i].totalConfirmed)
                this.series[0].data.push(totalConfirmed)
                totalDeaths.push(Date.parse(res.data[i].lastUpdated), res.data[i].totalDeaths)
                this.series[1].data.push(totalDeaths)
                totalRecovered.push(Date.parse(res.data[i].lastUpdated), res.data[i].totalRecovered)
                this.series[2].data.push(totalRecovered)             
            } 

            this.completed = true;
        }
        
        ).catch( e => { console.log(e) })
    }
}
</script>

<style>

</style>