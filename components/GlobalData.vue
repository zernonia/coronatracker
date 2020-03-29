<template>
    <div class=" w-full flex flex-row justify-between">
        <div class="card ">
            <h3 class=" font-bold text-lg">Total Confirmed</h3>
            <div class=" relative mt-2 flex flex-row items-center align-middle"><h5 class=" font-extrabold text-4xl">{{ totalConfirmed }}</h5><span v-if="totalNewCases != 0" style="right: -3rem;" class=" absolute text-xs">+{{ totalNewCases }}</span></div>
        </div>
        <div class="card ">
            <h3 class=" font-bold text-lg">Total Recovered</h3>
            <div class=" relative mt-2 flex flex-row items-center align-middle"><h5 class=" font-extrabold text-4xl">{{ totalRecovered }}</h5><span v-if="totalNewRecovered != 0" style="right: -3rem;" class=" absolute text-xs">+{{ totalNewRecovered }}</span></div>
        </div>
        <div class="card ">
            <h3 class=" font-bold text-lg">Total Death</h3>
            <div class=" relative mt-2 flex flex-row items-center align-middle"><h5 class=" font-extrabold text-4xl">{{ totalDeaths }}</h5><span v-if="totalNewDeaths != 0" style="right: -3rem;" class=" absolute text-xs">+{{ totalNewDeaths }}</span></div>
        </div>
    </div>
</template>

<script>


export default {
    props: {
        totalConfirmed: Number,
        totalDeaths: Number,
        totalRecovered: Number,
        totalNewCases: Number,
        totalNewDeaths: Number,
        totalNewRecovered: Number,
        totalActiveCases: Number,
    }
}
</script>

<style>

</style>