<template>
  <div class="cart-bottom-bar">
    <div class="btn-content">
      <check-button class="btn-check" 
                    :is-checked="isSelectAll"
                    @click.native="btnClick"/>
      <span>全选</span>
    </div>
    <div class="totalprice">
      合计: {{totalprice}}
    </div>
    <div class="toadd" @click="toaddClick">
      去计算 {{length}}
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
export default {
  props:{

  },
  computed: {
    totalprice(){
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    length(){
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).length
    },
    isSelectAll(){
      if(this.$store.state.cartList.length === 0) return false
      return !this.$store.state.cartList.find(item => {
        return !item.checked
      })
    }
  },
  components: {
    CheckButton
  },
  methods: {
    btnClick(){
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item => {
          item.checked = false
        });
      }else{
        this.$store.state.cartList.forEach(item => {
          item.checked = true
        });
      }
    },
    toaddClick(){
      if (!this.isSelectAll) {
        this.$toast.show('请选择要购物的商品')
      }
    }
  }

}
</script>

<style scoped>
  .cart-bottom-bar{
    position: fixed;
    width: 100%;
    bottom: 49px;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
  }
  .btn-content{
    display: flex;
  }
  .btn-check{
    display: flex;
    align-items: center;
    padding: 0 5px;
  }
  .totalprice{

    flex: 1;
    margin-left: 10px;
  }
  .toadd{
    text-align: center;
    width: 100px;
    background-color: var(--color-high-text);
    color: white;
  }
</style>