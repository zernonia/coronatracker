<template>
    <div class=" w-1/3">
      <apexchart v-if="completed" :options="options1" :series="series1"></apexchart>
      <apexchart v-if="completed" :options="options" :series="series"></apexchart>
    </div>
</template>

<script>
export default {
props:{
    totalRecovered: Number,
    totalDeaths: Number,
    totalConfirmed: Number,
    completed: Boolean,
},
data(){
    return{
        deathRatio: 0,
        recoveredRatio: 0,
        //fatality rate
        options: {
            chart: {
                height: 280,
                type: "radialBar",
                fontFamily: 'Poppins, Helvetica, sans-serif',
            },
            plotOptions: {
                radialBar: {
                hollow: {
                    margin: 0,
                    size: "70%",
                    background: "#ffffff"
                },
                track: {
                    dropShadow: {
                    enabled: true,
                    top: 2,
                    left: 0,
                    blur: 4,
                    opacity: 0.15
                    }
                },
                dataLabels: {
                    value: {
                    color: "#000",
                    fontSize: "1.75rem",
                    show: true
                    },
                    name: {
                    color: "#000",
                    fontSize: "1.125rem"
                    },
                }
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                shade: "dark",
                type: "vertical",
                gradientToColors: ["#87D4F9"],
                stops: [0, 100]
                }
            },
            stroke: {
                lineCap: "round"
            },
            labels: ["Fatality Rate"]
        },
        //recovery rate
        options1: {
            chart: {
                height: 280,
                type: "radialBar",
                fontFamily: 'Poppins, Helvetica, sans-serif',
            },
            plotOptions: {
                radialBar: {
                hollow: {
                    margin: 0,
                    size: "70%",
                    background: "#ffffff"
                },
                track: {
                    dropShadow: {
                    enabled: true,
                    top: 2,
                    left: 0,
                    blur: 4,
                    opacity: 0.15
                    }
                },
                dataLabels: {
                    value: {
                    color: "#000",
                    fontSize: "1.75rem",
                    show: true
                    },
                    name: {
                    color: "#000",
                    fontSize: "1.125rem"
                    },
                }
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                shade: "dark",
                type: "vertical",
                gradientToColors: ["#87D4F9"],
                stops: [0, 100]
                }
            },
            stroke: {
                lineCap: "round"
            },
            labels: ["Recovery Rate"]
        },
        series: [0],
        series1: [0],
    }
},
watch: {
    totalConfirmed: function (value){ 
    if (value != 0){
        if (this.totalConfirmed != 0){
            this.deathRatio = (this.totalDeaths / this.totalConfirmed) * 100,
            this.recoveredRatio = (this.totalRecovered / this.totalConfirmed) * 100

        this.series = [parseFloat(this.deathRatio).toFixed(2)],
        this.series1 = [parseFloat(this.recoveredRatio).toFixed(2)]
        }
    }
    }
}
}
</script>

<style>

</style>