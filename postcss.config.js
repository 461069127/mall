module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      unitToConvert: "px", // 要转化的单位
      viewportWidth: 350, // UI设计稿的宽度
      viewportHeight: 667, //UI设计稿的高度
      unitPrecision: 6, // 转换后的精度，即小数点位数
      viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
      selectorBlackList: ["ignore"], // 指定不转换为视窗单位的类名，在组件添加相应类名就可以不转换
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
      exclude: [/node_modules/, /^MainTab/, /TabBar/,  /dist/], // 设置忽略文件，用正则做目录名匹配
      landscape: false // 是否处理横屏情况
    }
  }
}
