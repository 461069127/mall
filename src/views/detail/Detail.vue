<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"
                    @itemClick="itemClick"
                    ref="nav"/>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3"
            @scroll="contentScroll" >
      <detail-swiper :top-images="topImages"
                     ref="detailSwiper"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="paramsRef"/>
      <detail-comment :comment="comment" ref="commentRef"/>
      <goods-list :goods="recommends" ref="recommendRef"/>
    </scroll>
    <detail-bottom-bar @addcart="addToCart"/>
    <back-top v-show="isShowTop" @click.native="backTop"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailComment from './childComps/DetailComment.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail";
  import { debounce } from 'common/utils'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailComment,
      DetailBottomBar,

      Scroll,
      GoodsList,
      BackTop,
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        comment: {},
        recommends: [],
        themePosY: [],
        itemImgListener: null,
        getThemePosY: null,
        newRefresh: null,
        isShowTop: false,
        currentIndex: 0
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        
        // 6.获取评论的信息
        this.comment =data.rate.list[0]
      })

        // 7.获取推荐的信息
      getRecommend().then(res =>{
        this.recommends = res.data.list
      }) 
    },
    mounted(){
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      this.itemImgListener = () =>{
        refresh()
      }
      this.$bus.$on('itemImageLoad', this.itemImgListener)

      this.getThemePosY = debounce(() => {
        this.themePosY = [0];
        this.themePosY.push(-this.$refs.paramsRef.$el.offsetTop + 44);
        this.themePosY.push(-this.$refs.commentRef.$el.offsetTop + 44);
        this.themePosY.push(-this.$refs.recommendRef.$el.offsetTop + 44);
      }, 50);
    },

    beforeDestroy() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },

    methods: {     
      imageLoad() {
        this.itemImgListener()
        this.getThemePosY()
      },
      // swiperImageLoad(){
      //   this.$refs.detailSwiper.playTime()
      // },
      
      itemClick(index) {
        this.$refs.scroll.scrollTo(0, this.themePosY[index], 700);
      },

      contentScroll(position){
        this.isShowTop = -position.y > 1000;
        let length = this.themePosY.length
        let positionY = -position.y
        for(let i=0; i<length; i++){
          if(this.currentIndex !== i && ((i < length - 1 && positionY >= -this.themePosY[i] && positionY < -this.themePosY[i+1] ) || (i === length - 1 && positionY >= -this.themePosY[i]))){
            this.currentIndex = i
            console.log(this.currentIndex); 
            this.$refs.nav.currIndex = this.currentIndex
          }
        }
      },
      addToCart(){
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // this.$store.commit('addCart', product)
        this.$store.dispatch('addCart', product).then(res => {
          console.log(res);
          this.$toast.show(res, 2000)
        })

      },

      backTop(){
        this.$refs.scroll.scrollTo(0, 0, 700)
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
