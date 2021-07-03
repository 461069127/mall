<template>
  <div class="toats" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message = '默认文字', duration = '2000'){
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false
      }, duration);
    }
  }
}
</script>

<style>
  .toats{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    padding: 8px 10px;
    border-radius: 8px;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.75);
    white-space: nowrap;
  }
</style>