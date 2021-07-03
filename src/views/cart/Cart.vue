<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <template #center>
        <div>
          购物车 {{cartLength}}
        </div>
      </template>
    </nav-bar>
    <scroll class="content"
            ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar.vue'
  import CartList from './childComps/CartList.vue'
  import CartBottomBar from './childComps/CartBottomBar.vue'


  import { mapGetters } from 'vuex'
  import Scroll from 'components/common/scroll/Scroll.vue'

  export default {
    name: "Cart",
    components: {
      NavBar,
      Scroll,
      CartList,
      CartBottomBar 
    },
    computed: {
      ...mapGetters(['cartLength'])
    },
    activated() {
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  #cart{
    position: relative;
    height: 100vh;
  }
  .nav-bar{
    position: relative;
    background-color: var(--color-high-text);
    color: #fff;
    z-index: 9;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 89px;
  }
</style>
