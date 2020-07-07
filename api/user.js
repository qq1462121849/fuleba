import http from '@/api/http'
import store from '@/store/index'

// 上传用户图片
export const upload = (filePath) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: http.config.baseUrl + '/common/upload', //仅为示例，非真实的接口地址
			fileType: 'image',
			filePath: filePath,
			name: 'file',
			header: {token: store.state.token},
			complete: (response) => {
				let statusCode = response.statusCode
				if (statusCode === 200) {
					resolve(JSON.parse(response.data))
				} else if (statusCode === 401) {
					return uni.navigateTo({url: '/pages/login/index'})
				} else {
					reject(JSON.parse(response.data))
				}
			}
		})
	})
}

// 用户登陆
export const login = (data) => {
    return http.post('/user/third', data)
}

// 用户信息
export const index = () => {
    return http.get('/user/index')
}

// 更新用户信息
export const profile = (data) => {
    return http.post('/user/profile', data)
}

// 用户优惠券信息
export const coupons = (data) => {
    return http.post('/user/coupons', data)
}

//关注商家
export const followShop = (option) => {
    return http.post('/app/followShop', option)
}

// 关注商家列表
export const followShopList = () => {
    return http.get('/user/followShopList')
}

// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	upload,
	login,
	index,
	profile,
	coupons,
	followShop,
	followShopList
}