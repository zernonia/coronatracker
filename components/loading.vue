<template>
    <div class="loading-page" v-if="loading" >
      <client-only>
          <lottie-player :src="animation" :options="options" id="loading" />
      </client-only>
    </div>  
</template>

<script>
import animation from '~/static/loading.json'

export default {
  data: () => ({
    loading: false,
    options:{
      autoplay: true,
      loop: true,
      width: '300px',
      background: 'white'
    },
    animation
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  },
   mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => {
        this.$nuxt.$loading.finish()}, 1000)
    })
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  z-index: 9999;
  animation: fadeIn 0.5s;
  
  /* -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
  -webkit-animation-duration: 0.5 s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both; */
  }

  @-webkit-keyframes fadeIn {
  0% {opacity: 0;}
  100% {opacity: 1;}
  }
  @keyframes fadeIn {
  0% {opacity: 0;}
  100% {opacity: 1;}
  }
  @-webkit-keyframes fadeOut {
    0% {opacity: 1;}
  100% {opacity: 0;}
  }
  @keyframes fadeOut {
    0% {opacity: 1;}
  100% {opacity: 0;}
  }
</style>