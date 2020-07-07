<template>
	<view class="my-shops" @tap="jumpTo('/pages/home/detail?id=' + shops.id)">
		<image class="logo" src="../static/shop_logo.jpg" mode="aspectFill"></image>
		<view class="info">
			<view class="name text-cut">
				{{shops.title}}
			</view>
			<view class="discount" v-if="shops.disInfo">
				<view class="coupon">
					{{shops.disInfo}}
				</view>
				<view class="distance">
					{{shops.distance}}
				</view>
			</view>
			<view class="address text-cut">
				<text class="icon cuIcon-locationfill"></text>{{shops.address}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'MyEmpty',
		props: {
			shops: {
				type: Object,
				default: () => {}
			}
		},
	}
</script>

<style lang="less">
	.my-shops {
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 5px;
		.logo {
			width: 100px;
			min-width: 100px;
			height: 80px;
			border-radius: 6px;
			margin-right: 10px;
		}
		.info {
			width: 100%;
			overflow: hidden;
			flex: 0 1 auto;
			.name {
				height: 30px;
				line-height: 30px;
				font-size: 15px;
			}
			.discount {
				display: flex;
				align-items: center;
				padding: 5px 0 8px 0;
				.coupon {
					height: 20px;
					padding: 0 10px;
					line-height: 20px;
					text-align: center;
					border-radius: 2px;
					background-image: -webkit-linear-gradient(45deg, #ff9700, #ed1c24);
					background-image: linear-gradient(45deg, #ff9700, #ed1c24);
					color: #ffffff;
					font-size: 13px;
				}
				.distance {
					flex: 1;
					height: 20px;
					line-height: 20px;
					color: #999;
					text-align: right;
					font-size: 13px;
				}
			}
			.address {
				height: 20px;
				line-height: 20px;
				color: #999;
				font-size: 12px;
				.icon {
					color: #0081ff;
				}
			}
		}
	}
	.my-shops +.my-shops {
		border-top: 1px solid #eee;
	}
</style>
