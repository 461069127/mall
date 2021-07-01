<template>
  <swiper class="detail-swiper"
          ref="swiper">
    <swiper-item v-for="(item, index) in topImages"
                 :key="index">
      <img :src="item" alt="" @load="imageLoad">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods:{
      imageLoad(){
        if (!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      },
      // playTime(){
      //   this.$refs.swiper.startTimer()
      // }
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
