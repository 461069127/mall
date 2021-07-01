<template>
  <div class="cart-list-item">
    <div class="shop-box">
      <check-button class="button" :is-checked="product.checked" @click.native="checkedClick"/>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="">
    </div>
    <div class="item-info">
      <p class="item-title">
        {{product.title}}
      </p>
      <p class="item-desc">
        {{product.desc}}
      </p>
      <div class="bottom clear-fix">
        <span class="item-pirce">{{product.price}}</span>
        <span class="item-count">x {{product.count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'

export default {
  components: {
     CheckButton
    },
  props: {
    product:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    checkedClick(){
      this.product.checked = !this.product.checked
    }
  },


}
</script>

<style scoped>
  .cart-list-item{
    width: 100%;
    display: flex;
    border-bottom: 1px solid #ccc;
  }
  .shop-box{
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-img{
    padding: 6px 3px;
    width: 80px;
    height: 100px;
    overflow: hidden;
    border-radius: 5px;
  }
  .item-img img{
    height: 100%;
    display: block;
  }
  .item-info{
    width: 70%;
    padding: 8px 15px;
  }
  .item-title, .item-desc{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-title{
    font-size: 17px
  }
  .item-desc{
    font-size: 13px;
    padding: 15px 0;
  }
  .item-pirce{
    color: orangered;
    float: left;
  }
  .item-count{
    float: right;
    margin-right: 10px;
  }
</style>