import Vue from 'vue'
import App from './App'

import UtilsPlugin from '@/plugins/utils'
Vue.use(UtilsPlugin)

import store from '@/store'
Vue.prototype.$store = store

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import MyEmpty from '@/components/MyEmpty'
Vue.component('my-empty',MyEmpty)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()

 



