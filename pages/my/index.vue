<template>
	<view class="my">
		<cu-custom bgColor="bg-gradual-orange">
			<block slot="content">个人中心</block>
		</cu-custom>
		<view class="header" @tap="goTo('/pages/my/profile')">
			<image class="avatar" :src="userInfo.avatar || '/static/default_avatar.png'" mode="aspectFill"></image>
			<view class="info">
				<button class="login-btn" open-type="getUserInfo" @getuserinfo.stop="login" v-if="!hasLogin">点击登陆</button>
				<view class="nickname" v-if="hasLogin">
					{{userInfo.nickname || '登陆'}}
				</view>
				<view class="uid" v-if="hasLogin">
					<text>UID: {{userInfo.id}}</text>
					<text class="copy" @tap.stop="copy">复制</text>
				</view>
			</view>
			<view class="right-icon cuIcon-right"></view>
		</view>

		<view class="list" style="margin-top: 10px;">
			<view class="item" @tap="jumpTo('/pages/my/follow', 'inside', true)">
				<view class="icon cuIcon-favor"></view>
				<view class="title">
					我的关注
				</view>
				<view class="right cuIcon-right"></view>
			</view>
		</view>

		<view class="list" style="margin-top: 10px;">
			<view class="item" @tap="jumpTo('/pages/my/agent/apply', 'inside', true)" v-if="userInfo.agent !== 1">
				<view class="icon cuIcon-form"></view>
				<view class="title">
					申请拓店
				</view>
				<view class="right cuIcon-right"></view>
			</view>
			<view class="item" @tap="jumpTo('/pages/my/agent/index', 'inside', true)" v-else>
				<view class="icon cuIcon-form"></view>
				<view class="title">
					拓店者管理中心
				</view>
				<view class="right cuIcon-right"></view>
			</view>
		</view>

		<view class="list" style="margin-top: 10px;">
			<view class="item" @tap="jumpTo('/pages/my/shop/apply', 'inside', true)">
				<view class="icon cuIcon-shop"></view>
				<view class="title">
					商家入驻
				</view>
				<view class="right cuIcon-right"></view>
			</view>
		</view>

		<view class="list" style="margin-top: 10px;">
			<view class="item" @tap="tel">
				<view class="icon cuIcon-service"></view>
				<view class="title">
					联系客服
				</view>
				<view class="right cuIcon-right"></view>
			</view>
			<view class="item">
				<view class="icon cuIcon-write"></view>
				<view class="title">
					<button class="feedback-btn" open-type="feedback">意见反馈</button>
				</view>
				<view class="right cuIcon-right"></view>
			</view>
			<view class="item" @tap="jumpTo('/pages/my/agree')">
				<view class="icon cuIcon-text"></view>
				<view class="title">
					服务协议
				</view>
				<view class="right cuIcon-right"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import user from '@/api/user';
	export default {
		data() {
			return {}
		},
		computed: {
			...mapState(['config', 'hasLogin', 'userInfo']),
		},
		onLoad() {
			if (this.hasLogin) {
				this.$store.dispatch('user')
			}
		},
		methods: {
			async login(res) {
				const userInfo = res.detail;
				if (userInfo.errMsg !== "getUserInfo:ok") {
					console.error(userInfo.errMsg)
					return;
				}

				const [loginErr, loginRes] = await uni.login({
					provider: 'weixin'
				});
				if (loginErr) {
					return this.toast(loginErr.errMsg);
				}

				const data = {
					platform: 'weapp',
					code: loginRes.code,
					encryptedData: userInfo.encryptedData,
					iv: userInfo.iv,
				};
				uni.showLoading({
					title: '登陆中~'
				})
				setTimeout(() => {
					uni.hideLoading()
				}, 5000)
				user.login({
					platform: data.platform,
					code: data.code,
					encryptedData: data.encryptedData,
					iv: data.iv,
				}).then(res => {
					uni.hideLoading();
					if (res.code !== 1) {
						return this.toast(res.msg)
					}
					if (res.code === 1) {
						this.$store.commit('setHasLogin', true);
						this.$store.commit('setToken', res.data.userinfo.token);
						this.$store.commit('setUserInfo', res.data.userinfo);
						uni.navigateBack();
					}
				})
			},
			async goTo(path) {
				if (!this.hasLogin) {
					return;
				}
				this.jumpTo(path)
			},
			async copy() {
				uni.setClipboardData({
					data: this.userInfo.id.toString()
				}).then(res => {
					const [error, data] = res;
					if (!error) {
						this.toast('复制成功');
					} else {
						console.error(error);
					}
				});
			},
			async tel() {
				if (!this.config.contact) {
					this.toast('暂不支持');
					return;
				}
				uni.makePhoneCall({
					phoneNumber: this.config.contact
				});
			}
		}
	}
</script>

<style lang="less">
	.my {
		.header {
			display: flex;
			align-items: center;
			padding: 20px 0;
			background-color: #FFFFFF;

			.avatar {
				width: 60px;
				height: 60px;
				margin: 0 10px;
				border-radius: 100%;
			}

			.info {
				flex: 1;

				.login-btn {
					display: block;
					margin: 0;
					padding: 0;
					line-height: 40px;
					border: none;
					background-color: transparent;
					font-size: 18px;
					text-align: left;

					&::after {
						display: none;
					}
				}

				.nickname {
					font-size: 18px;
					line-height: 40px;
				}

				.uid {
					font-size: 16px;
					color: #888;
					display: flex;
					align-items: center;

					.copy {
						display: inline-block;
						background-color: #176A5C;
						width: 50px;
						height: 22px;
						line-height: 22px;
						margin-left: 10px;
						font-size: 12px;
						color: #FFFFFF;
						text-align: center;
						border-radius: 12px;
					}
				}
			}

			.right-icon {
				font-size: 24px;
				padding: 0 10px;
				color: #888;
			}
		}

		.list {
			.item {
				display: flex;
				align-items: center;
				width: 100%;
				height: 50px;
				background-color: #FFFFFF;
				border-bottom: 1px solid #EFEFEF;
				
				.feedback-btn {
					display: block;
					margin: 0;
					padding: 0;
					line-height: 40px;
					border: none;
					background-color: transparent;
					font-size: 16px;
					text-align: left;
				
					&::after {
						display: none;
					}
				}

				.icon {
					margin: 0 10px;
					font-size: 20px;
				}

				.title {
					flex: 1;
					font-size: 16px;
				}

				.right {
					padding: 0 10px;
					font-size: 18px;
				}
			}
		}
	}
</style>
