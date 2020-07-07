import http from '@/api/http'
import store from '@/store/index'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

export const index = () => {//轮播图
    return http.post('/app/slideList', { type: 'slide' })
}

export const config = () => {
    return http.get('/app/config')
}

export const agree = () => {
    return http.get('/app/agree')
}

export const cateList = () => {// 导航分类
    return http.post('/app/cateList')
}

export const shopList = (option={}) => {//商家列表
    return http.post('/app/shopList',option)
}

export const shopDetail = (option) => {//商家详情
    return http.post('/app/shopDetail', option)
}

// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
    index,
    config,
    agree,
    cateList,
    shopList,
    shopDetail,
}