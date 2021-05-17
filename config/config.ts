import router from "./router";
import defaultTheme from "../src/defaultTheme";

export default {
  dva: {
    hmr: true,
    immer: true
  },
  routes: router,
  targets: {
    ie: 10
  },
  hash: true,
  history: {
    type: "hash"
  },
  define: {},
  antd: {
    dark: false,
    compact: false
  },
  theme: defaultTheme,
  dynamicImport: {
    loading: "@/components/PageLoading/index"
  },
  ignoreMomentLocale: true,
  // cssLoader: {
  //   modules: true
  // },
  proxy: {
    "/api": {
      target: "http://localhost:8000",
      changeOrigin: true,
      pathRewrite: { "^/api": "" }
    }
  },
  plugins: [
    './plugin.js'
  ]

};
