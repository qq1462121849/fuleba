<template>
	<view class="detail">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="content">商家详情</block>
		</cu-custom>
		<view class="shop" v-if="shops.id">
			<image class="img" :src="shops.logo" mode="scaleToFill"></image>
			<view class="text">
				<view>{{shops.title}}</view>
				<view class="next">
					<view>{{shops.tips}}</view>
					<button v-if="follow==1" size="mini" class="notice" @tap="followShops(0)">已关注</button>
					<button v-else size="mini" class="notice" @tap="followShops(1)">关注</button>
				</view>
			</view>
		</view>
		<view class="address" v-if="shops.id">
			<view class="titel">
				{{shops.address}}
			</view>
			<view class="distance">
				<text v-if="String(shops.distance)"> 距您 {{shops.distance}}</text>
			</view>
			<div class="photos" v-if="imgs.length">
				<image v-for="item in imgs" :key="item" class="img" :src="item" mode="scaleToFill"></image>
			</div>

		</view>
		<button class="bottom bg-orange ra" @tap="goMap">到这里</button>
	</view>
</template>

<script>
	import api from "@/api/";
	import user from "@/api/user";
	export default {
		data() {
			return {
				shops: {},
				follow: 0,
				imgs: [],
			};
		},
		onLoad({
			id
		}) {
			this.id = id
			this.getDetail()
		},
		methods: {
			async getDetail() {
				let res = await api.shopDetail({
					spid: this.id
				})
				if (res.code == 1) {
					this.shops = res.data.shop
					this.follow = res.data.followStatus
					if (!res.data.thumb) return this.imgs = []
					this.imgs = res.data.thumb.split(',')

				}

			},
			async followShops(num) {
				let res = await user.followShop({
					spid: this.id,
					followStatus: num
				})
				if (res.code == 1) {
					uni.showToast({
						title: res.msg
					})
					this.getDetail()
				}
			},
			async goMap() {
				if (!this.shops.lat || !this.shops.lng) {
					return this.toast('商家暂未设置导航');
				}
				const [err, res] = await uni.openLocation({ //​使用微信内置地图查看位置。
					latitude: parseFloat(this.shops.lat), //要去的纬度-地址
					longitude: parseFloat(this.shops.lng), //要去的经度-地址
					name: this.shops.title,
					address: this.shops.address
				})
				if (err) {
					this.toast(err.errMsg)
				}
			}
		}
	};
</script>

<style lang="less">
	.detail {
		.shop {
			margin: 0 auto;
			padding: 10px;
			display: flex;
			background: #fff;

			.img {
				width: 100px;
				height: 80px;
				border-radius: 10rpx;
			}

			.text {
				width: 600rpx;
				padding-left: 10rpx;
				padding-top: 50rpx;

				.next {
					color: red;
					font-size: 24rpx;
					display: flex;
					justify-content: space-between;

					.notice {
						background-color: #FFFFFF;
						color: #0081ff;
						border: 1rpx solid #0081ff;
						border-radius: 2px;
						padding: 2px 4px;
						line-height: 38rpx;
						font-size: 14px;
						text-align: center;
						margin: 0;
					}
				}
			}
		}

		.address {
			background: #fff;
			padding: 8rpx 15rpx 40rpx;
			margin: 0 auto;
			margin-top: 20rpx;
			color: #333;
			font-size: 14px;

			.distance {
				display: flex;
				justify-content: flex-end;
				padding-bottom: 20rpx;
			}

			.photos {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.img {
					width: 170rpx;
					height: 170rpx;
					border-radius: 10rpx;
				}
			}
		}

		.bottom {
			position: fixed;
			bottom: 0;
			width: 100%;
			line-height: 50px;
			font-size: 16px;
			border-radius: unset;
		}
	}
</style>
