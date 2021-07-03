import Toast from './Toast.vue'

const obj = {}

obj.install = function (Vue){
  // 创建组件构造器
  const toastContrustor = Vue.extend(Toast);

  // new一个组件对象
  const toast = new toastContrustor()

  // 组件对象进行挂载
  toast.$mount(document.createElement('div'))

  // 添加元素
  document.body.appendChild(toast.$el)

  // 将toast添加到Vue原型
  Vue.prototype.$toast = toast
}

export default obj