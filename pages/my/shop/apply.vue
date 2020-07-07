<template>
	<view class="apply">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="content">商家入驻申请</block>
		</cu-custom>
		<view class="cu-form-group margin-top">
			<view class="title">法人姓名</view>
			<input v-model="form.username" :disabled="disabled" placeholder="请输入法人姓名"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">身份证号</view>
			<input v-model="form.idcard" :disabled="disabled" placeholder="请输入法人18位身份证号"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">身份证照</view>
			<view class="file">
				<view class="item">
					<text class='cuIcon-close' @tap="DelImg('idcarda')" v-if="form.idcarda"></text>
					<text class='cuIcon-add' @tap="ChooseImage('idcarda')" v-if="!form.idcarda"></text>
					<image class="img" :src="form.idcarda" mode="aspectFill" @tap="ViewImage('idcarda')" v-if="form.idcarda"></image>
					<text class='label'>正面</text>
				</view>
				<view class="item">
					<text class='cuIcon-close' @tap="DelImg('idcardb')" v-if="form.idcardb"></text>
					<text class='cuIcon-add' @tap="ChooseImage('idcardb')" v-if="!form.idcardb"></text>
					<image class="img" :src="form.idcardb" mode="aspectFill" @tap="ViewImage('idcardb')" v-if="form.idcardb"></image>
					<text class='label'>反面</text>
				</view>
			</view>
		</view>

		<view class="cu-form-group margin-top">
			<view class="title">商家名称</view>
			<input v-model="form.shopname" :disabled="disabled" placeholder="请输入营业执照全称"></input>
		</view>
		<view class="tips">必须和营业执照名称一致</view>
		<view class="cu-form-group">
			<view class="title">商家简称</view>
			<input v-model="form.shortname" :disabled="disabled" placeholder="10个字以内" maxlength="10"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">联系电话</view>
			<input v-model="form.mobile" :disabled="disabled" placeholder="请输入座机号或者手机号" maxlength="11"></input>
		</view>
		<!-- #ifndef H5 || APP-PLUS || MP-ALIPAY -->
		<view class="cu-form-group">
			<view class="title">所在地区</view>
			<picker mode="region" @change="RegionChange" :value="form.region" :disabled="disabled">
				<view class="picker">
					{{form.region[0]}}，{{form.region[1]}}，{{form.region[2]}}
				</view>
			</picker>
		</view>
		<!-- #endif -->
		<view class="cu-form-group">
			<view class="title">地址选择</view>
			<input v-model="form.address" :disabled="true" @tap="ChooseLocation"></input>
			<text class='cuIcon-locationfill text-orange'></text>
		</view>
		<view class="cu-form-group">
			<view class="title">让利比例</view>
			<input v-model="form.percent" :disabled="disabled" placeholder="翁输入让利比率" maxlength="10"></input>
			<text class='text-black'>%</text>
		</view>
		<view class="cu-form-group">
			<view class="title">营业资质</view>
			<view class="file">
				<view class="item">
					<text class='cuIcon-close' @tap="DelImg('licenseImg')" v-if="form.licenseImg"></text>
					<text class='cuIcon-add' @tap="ChooseImage('licenseImg')" v-if="!form.licenseImg"></text>
					<image class="img" :src="form.licenseImg" mode="aspectFill" @tap="ViewImage('licenseImg')" v-if="form.licenseImg"></image>
					<text class='label'>营业执照</text>
				</view>
				<view class="item">
					<text class='cuIcon-close' @tap="DelImg('tobaccoImg')" v-if="form.tobaccoImg"></text>
					<text class='cuIcon-add' @tap="ChooseImage('tobaccoImg')" v-if="!form.tobaccoImg"></text>
					<image class="img" :src="form.tobaccoImg" mode="aspectFill" @tap="ViewImage('tobaccoImg')" v-if="form.tobaccoImg"></image>
					<text class='label'>烟草许可证</text>
				</view>
				<view class="item">
					<text class='cuIcon-close' @tap="DelImg('foodImg')" v-if="form.foodImg"></text>
					<text class='cuIcon-add' @tap="ChooseImage('foodImg')" v-if="!form.foodImg"></text>
					<image class="img" :src="form.foodImg" mode="aspectFill" @tap="ViewImage('foodImg')" v-if="form.foodImg"></image>
					<text class='label'>食品许可证</text>
				</view>
			</view>
		</view>

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
	import shop from '@/api/shop'
	export default {
		data() {
			return {
				form: {
					username: '',
					idcard: '',
					idcarda: '',
					idcardb: '',
					shopname: '',
					shortname: '',
					mobile: '',
					address: '',
					lat: '',
					lng: '',
					percent: '',
					licenseImg: '',
					foodImg: '',
					tobaccoImg: '',
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
				shop.applyInfo().then(res => {
					if (res.code === 1) {
						this.info = res.data.shop;
						if (this.info) {
							this.form.username = this.info.username;
							this.form.idcard = this.info.idcard;
							this.form.idcarda = this.info.idcarda;
							this.form.idcardb = this.info.idcardb;
							this.form.shopname = this.info.shopname;
							this.form.shortname = this.info.shortname;
							this.form.mobile = this.info.mobile;
							this.form.region = [this.info.province, this.info.city, this.info.area];
							this.form.address = this.info.address;
							this.form.lat = this.info.lat;
							this.form.lng = this.info.lng;
							this.form.percent = this.info.percent;
							this.form.licenseImg = this.info.license_img;
							this.form.foodImg = this.info.food_img;
							this.form.tobaccoImg = this.info.tobacco_img;
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

				shop.apply(this.form).then(res => {
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
			ChooseLocation() {
				if (this.loading || this.disabled) {
					return;
				}
				uni.chooseLocation({
				    success: (res) => {
						this.form.address = res.address + res.name
						this.form.lat = res.latitude
						this.form.lng = res.longitude
				    }
				});
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
				this.form.region = e.detail.value
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
