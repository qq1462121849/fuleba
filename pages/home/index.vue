<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-orange">
			<block slot="content">首页</block>
		</cu-custom>

		<my-home-header></my-home-header>
		<my-home-slide v-if="slides.length" :slides="slides"></my-home-slide>
		<view style="margin-top: 10px;"></view>
		<my-home-menus v-if="cateory.length" :cateory="cateory"></my-home-menus>
		<view style="margin-top: 10px;"></view>
		<my-shop-list :shops="shops"></my-shop-list>
	</view>
</template>

<script>
	import api from "@/api/";
	import MyHomeHeader from "@/components/MyHomeHeader";
	import MyHomeSlide from "@/components/MyHomeSlide";
	import MyHomeMenus from "@/components/MyHomeMenus";
	import MyShopList from "@/components/MyShopList";

	export default {
		data() {
			return {
				slides: [],
				cateory: [],
				shops: [],
			};
		},
		components: {
			MyHomeHeader,
			MyHomeSlide,
			MyHomeMenus,
			MyShopList
		},
		onLoad() {
			this.loadIndex();
			this.getCateory();
		},
		methods: {
			async loadIndex() {
				api.index().then(res => {
					if (res.code === 1) {
						this.slides = res.data.list;
					} else {
						this.toast(res.msg);
					}
				});
			},
			async getCateory() {
				let res = await api.cateList()
				if (res.code == 1) {
					this.cateory = res.data.list
				}
			}
		}
	};
</script>

<style>
</style>
