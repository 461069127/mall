import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  addCart(context, payload){
    return new Promise((resolve) =>{
      let oldProduct = null
      for(let item of context.state.cartList){
        if (item.iid === payload.iid) {
          oldProduct = item
        }
      }

      if(oldProduct){
        // oldProduct.count +=1;
        context.commit(ADD_COUNTER, oldProduct)
        resolve('商品数量加一')
      }else{
        // payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit(ADD_TO_CART, payload)
        resolve('添加新商品')
      }
    })
  }
}