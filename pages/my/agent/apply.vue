<template>
	<view class="apply">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="content">拓店者申请</block>
		</cu-custom>
		<view class="cu-form-group margin-top">
			<view class="title">联系姓名</view>
			<input v-model="form.username" :disabled="disabled" placeholder="请输入联系人姓名"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">联系电话</view>
			<input v-model="form.mobile" :disabled="disabled" placeholder="请输入手机号"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">身份证照</view>
			<view class="file">
				<view class="item">
					<text class='cuIcon-close' @tap="DelImg('cardFrontImg')" v-if="form.cardFrontImg"></text>
					<text class='cuIcon-add' @tap="ChooseImage('cardFrontImg')" v-if="!form.cardFrontImg"></text>
					<image class="img" :src="form.cardFrontImg" mode="aspectFill" @tap="ViewImage('cardFrontImg')" v-if="form.cardFrontImg"></image>
					<text class='label'>正面</text>
				</view>
				<view class="item">
					<text class='cuIcon-close' @tap="DelImg('cardBackImg')" v-if="form.cardBackImg"></text>
					<text class='cuIcon-add' @tap="ChooseImage('cardBackImg')" v-if="!form.cardBackImg"></text>
					<image class="img" :src="form.cardBackImg" mode="aspectFill" @tap="ViewImage('cardBackImg')" v-if="form.cardBackImg"></image>
					<text class='label'>反面</text>
				</view>
			</view>
		</view>
		<!-- #ifndef H5 || APP-PLUS || MP-ALIPAY -->
		<view class="cu-form-group">
			<view class="title">所在地区</view>
			<picker mode="region" :disabled="disabled" @change="RegionChange" v-model="form.region">
				<view class="picker">
					{{form.region[0]}}，{{form.region[1]}}，{{form.region[2]}}
				</view>
			</picker>
		</view>
		<!-- #endif -->

		<view class="cu-form-group margin-top">
			<textarea @input="textareaAInput" maxlength="200" placeholder="请输入申请理由" :value="form.reason"></textarea>
		</view>

		<view class="padding flex flex-direction">
			<button class="cu-btn bg-gradual-orange margin-tb-sm lg" :disabled="disabled" :loading="loading" @tap="submit">{{status}}</button>
		</view>
	</view>
</template>

<script>
	import { upload } from "@/common/upload.js"
	import agent from '@/api/agent'
	export default {
		data() {
			return {
				form: {
					username: '',
					mobile: '',
					cardFrontImg: '',
					cardBackImg: '',
					region: ['北京市', '北京市', '东城区'],
					reason: '',
				},
				info: {},
				disabled: false,
				loading: false,
				status: '提交申请'
			}
		},
		onShow() {
			this.loadInfo();
		},
		methods: {
			async loadInfo() {
				agent.applyInfo().then(res => {
					if (res.code === 1) {
						this.info = res.data.agent;
						if (this.info) {
							this.form.username = this.info.username;
							this.form.mobile = this.info.mobile;
							this.form.cardFrontImg = this.info.card_back_img;
							this.form.cardBackImg = this.info.card_front_img;
							this.form.region = [this.info.province, this.info.city, this.info.area];
							this.form.reason = this.info.reason;
							this.status = res.data.status;
							this.disabled = true;
						}
					} else {
						this.toast(res.msg);
					}
				})
			},
			async submit() {
				if (this.loading || this.disabled) {
					return;
				}
				this.loading = true;
				setTimeout(() => {
					this.loading = false
				}, 7000)

				agent.apply(this.form).then(res => {
					if (res.code === 1) {
						this.disabled = true;
						this.loading = true;
						this.toast(res.msg);
						this.status = res.msg;
					} else {
						this.loading = false
						this.toast(res.msg);
					}
				})
			},
			ChooseImage(type) {
				if (this.loading || this.disabled) {
					return;
				}
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (chooseRes) => {
						upload(chooseRes.tempFilePaths[0]).then(res => {
							this.form[type] = res.url;
						})
					}
				});
			},
			ViewImage(type) {
				const imgs = [];
				imgs.push(this.form[type]);
				uni.previewImage({
					urls: imgs,
					current: 0
				});
			},
			DelImg(type) {
				if (this.loading || this.disabled) {
					return;
				}
				uni.showModal({
					title: '删除图片',
					content: '确定要删除吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.form[type] = ''
						}
					}
				})
			},
			RegionChange(e) {
				if (this.loading || this.disabled) {
					return;
				}
				console.log(e);
				this.region = e.detail.value;
			},
			textareaAInput(e) {
				if (this.loading || this.disabled) {
					return;
				}
				this.form.reason = e.detail.value
			},
		}
	}
</script>

<style lang="less">
	.apply {
		.cu-btn[disabled] {
			color: #FFFFFF!important;
		}
	}
	.tips {
		background-color: #FFFFFF;
		color: red;
		margin-top: -10px;
		padding: 5px 15px;
		border-bottom: 0.5px solid #eee;
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.cu-form-group {
		.file {
			flex: 1;

			.item {
				display: inline-block;
				padding: 10px 20px 0 0;
				position: relative;

				.cuIcon-add {
					box-sizing: border-box;
					display: block;
					width: 60px;
					height: 60px;
					line-height: 60px;
					text-align: center;
					border: 1px dashed #DDDDDD;
					font-size: 30px;
					color: #aaa;
				}

				.cuIcon-close {
					position: absolute;
					right: 20px;
					top: 10px;
					width: 18px;
					height: 18px;
					line-height: 18px;
					border-radius: 2px;
					text-align: center;
					background-color: #00000060;
					color: #FFFFFF;
					z-index: 999;
				}

				.img {
					display: block;
					width: 60px;
					height: 60px;
				}

				.label {
					display: block;
					line-height: 25px;
					font-size: 12px;
					text-align: center;
					color: #aaa;
				}
			}
		}
	}
</style>
