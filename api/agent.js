import http from '@/api/http'

// 信息
export const index = (data) => {
    return http.get('/agent/index', data)
}
// 申请拓店
export const apply = (data) => {
    return http.post('/agent/apply', data)
}
// 申请拓店进度
export const applyInfo = () => {
    return http.get('/agent/applyInfo')
}
// 申请拓店进度
export const shopList = () => {
    return http.get('/agent/shopList')
}

export default {
	index,
	apply,
	applyInfo,
	shopList,
}