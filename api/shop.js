import http from '@/api/http'

// 申请商家
export const apply = (data) => {
    return http.post('/shop/apply', data)
}
// 申请商家新都
export const applyInfo = () => {
    return http.get('/shop/applyInfo')
}

export default {
	apply,
	applyInfo,
}