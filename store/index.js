import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/api/user'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		config: {},
		hasLogin: uni.getStorageSync('hasLogin'),
		token: uni.getStorageSync('token'),
		userInfo: uni.getStorageSync('userInfo'),
	},
	mutations: {
		logout: (state) => {
			state.hasLogin = false
			state.token = ''
			state.userInfo = {}
			uni.removeStorageSync('hasLogin')
			uni.removeStorageSync('token')
			uni.removeStorageSync('userInfo')
		},
		setHasLogin: (state, data) => {
			state.hasLogin = data
			uni.setStorageSync('hasLogin', data)
		},
		setToken: (state, data) => {
			state.token = data
			uni.setStorageSync('token', data)
		},
		setUserInfo: (state, data) => {
			state.userInfo = Object.assign({}, state.userInfo, data)
			uni.setStorageSync('userInfo', data)
		},
		setConfig(state, config) {
			state.config = Object.assign({}, state.config, config)
		},
	},
	getters: {},
	actions: {
		user(context, data) {
			user.index().then(res => {
				if (res.code === 1) {
					context.commit('setUserInfo', res.data.user)
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			})
		},
	}
})

export default store
