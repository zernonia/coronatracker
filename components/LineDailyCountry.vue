<template>
    <div class=" bg-white rounded-lg shadow-lg w-2/3 m-6 py-10 px-6">
        <apexchart  v-if="completed" :options="options" :series="series"></apexchart>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props:{
        series: Array,
        completed: Boolean
    },
    data() {
        return {
      options: {
        chart: {
            fontFamily: 'Poppins, Helvetica, sans-serif',
            height: '380px',
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
    }
    },
    created() {

    }
}
</script>

<style>

</style>