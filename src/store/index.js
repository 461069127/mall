import Vue from 'vue';
import VueX from 'vuex';

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(VueX);

const store = new VueX.Store({
  state:{
    cartList:[]
  },
  mutations,
  actions,
  getters
})

export default store