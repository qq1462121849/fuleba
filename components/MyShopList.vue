<template>
	<view class="home-shops">
		<view class="tabbar">
			<view :class="['label',active==0?'active':'']" @tap="switchTab(0)"><text>附近</text></view>
			<view :class="['label',active==1?'active':'']" @tap="switchTab(1)"><text>人气</text></view>
			<view :class="['label',active==2?'active':'']" @tap="switchTab(2)"><text>新入</text></view>
			<view :class="['label',active==3?'active':'']" @tap="switchTab(3)"><text>优惠</text></view>
		</view>
		<view class="list">
			<my-shops :shops="item" v-for="item in shops" :key="item.id"></my-shops>
		</view>
	</view>
</template>
<script>
	import api from "@/api/";
	import MyShops from "@/components/MyShops";
	import Permission from "@/common/Permission.js";
	export default {
		name: 'MyShopList',
		data() {
			return {
				active: 0,
				shops: []
			}
		},
		components: {
			MyShops
		},
		mounted() {
			this.getshops();
		},
		methods: {
			async switchTab(index) {
				this.active = index;
				let res = await api.shopList({
					sortType: index
				});
				if (res.code == 1) {
					this.shops = res.data.list
				}
			},
			async getshops() {
				const permission = new Permission('scope.userLocation', '需要在设置中获取定位权限');
				const result = await permission.request();
				if (!result) {
					return;
				}

				const [locationError, locationRes] = await uni.getLocation({
					type: 'wgs84'
				});
				console.log(locationError, locationRes);
				if (locationError) {
					return this.toast('位置获取失败');
				}

				let res = await api.shopList({
					lng: locationRes.longitude,
					lat: locationRes.latitude
				})
				if (res.code == 1) {
					this.shops = res.data.list
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.home-shops {
		.tabbar {
			display: flex;

			.label {
				flex: 0 0 25%;
				text-align: center;
				font-size: 15px;

				text {
					display: inline-block;
					color: #000;
					line-height: 30px;
				}

				&.active {
					text {
						color: #FF4F07;
						border-bottom: 3px solid #FF4F07;
					}
				}
			}
		}

		.list {
			padding: 10px 0;
		}
	}
</style>
