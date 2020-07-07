<template>
	<view class="coupon">
		<cu-custom bgColor="bg-gradual-orange">
			<block slot="content">我的优惠券</block>
		</cu-custom>
		<view class="tabbar" :style="{top: CustomBar + 'px'}">
			<view class="item" :class="{active: status == 'normal'}" @tap="setStatus('normal')">
				<text>可用券</text>
			</view>
			<view class="item" :class="{active: status == 'used'}" @tap="setStatus('used')">
				<text>已用券</text>
			</view>
			<view class="item" :class="{active: status == 'expire'}" @tap="setStatus('expire')">
				<text>过期券</text>
			</view>
		</view>

		<view class="list">
			<my-empty v-if="empty"></my-empty>
			<view class="item" v-for="(item, i) in coupons" :key="i" @tap="jumpTo('/pages/home/index', 'tabbar')">
				<view class="left">
					<view class="top">
						<text class="icon">¥</text>
						<text class="money">{{item.price}}</text>
					</view>
					<view class="bottom">
						<text>抵用券</text>
					</view>
				</view>
				<view class="expire">
					有效期至：{{item.expiretime|dataFormat}}
				</view>
				<view class="btn" @tap="jumpTo('/pages/home/index')" v-if="status == 'normal'">
					立即使用
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import user from "@/api/user";

	export default {
		data() {
			return {
				empty: false,
				CustomBar: this.CustomBar,
				status: 'normal',
				coupons: []
			}
		},
		onShow() {
			this.loadData()
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
			this.loadData()
		},
		filters: {
			dataFormat(date) {
				var date = new Date(date * 1000);
				var YY = date.getFullYear() + '-';
				var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
				return YY + MM + DD;
			}
		},
		methods: {
			async setStatus(status) {
				if (this.status === status) {
					return;
				}
				this.empty = false;
				this.coupons = [];
				this.status = status;
				this.loadData();
			},
			async loadData() {
				const res = await user.coupons({
					status: this.status
				})
				if (res.code === 0) {
					this.toast(res.msg);
					return;
				}
				if (res.code === 1) {
					if (res.data.coupons.length > 0) {
						this.empty = false;
						this.coupons = res.data.coupons;
					} else {
						this.empty = true;
						this.coupons = [];
					}
				}
			}
		}
	}
</script>

<style lang="less">
	.coupon {
		.tabbar {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			background-color: #FFFFFF;
			display: flex;

			.item {
				flex: 1;
				text-align: center;
				font-size: 15px;

				text {
					display: inline-block;
					color: #000;
					padding: 0 10px;
					line-height: 40px;
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
			padding-top: 45px;
			.item {
				display: flex;
				align-items: center;
				margin: 10px;
				padding: 10px;
				background-color: #FFFFFF;

				.left {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: #FF4F07;

					.money {
						font-size: 26px;
						padding-left: 2px;
					}
				}

				.expire {
					flex: 1;
					font-size: 15px;
					margin-left: 30px;
				}

				.btn {
					background-color: #FF4F07;
					color: #FFFFFF;
					padding: 2px 5px;
					border-radius: 4px;
				}
			}
		}
	}
</style>
