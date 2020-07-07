<template>
	<view class="home-slides">
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true" :autoplay="true" interval="3000" duration="500">
			<swiper-item v-for="(item,index) in slides" :key="index">
				<image :src="item.thumb" mode="scaleToFill" ></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	/**
	 * 首页轮播图
	 */
	export default {
		name: 'MyHomeMenus',
		data() {
			return {
				cardCur: 0,
				swiperList: [
					
				],
				dotStyle: true,
				towerStart: 0,
				direction: ''
			};
		},
		props:['slides'],
		mounted() {
			
					
			
			this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
		},
		methods: {
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			}
		}
	}
</script>
