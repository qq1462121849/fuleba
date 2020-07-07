<template>
	<view class="agree">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="content">用户协议</block>
		</cu-custom>
		<view class="content-view">
			<rich-text :nodes="agree"></rich-text>
		</view>
	</view>
</template>

<script>
	import app from '@/api/index'
	export default {
		data() {
			return {
				agree: ''
			}
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			async loadData() {
				app.agree().then(res => {
					if (res.code === 1) {
						this.agree = res.data.agree
					}
				})
			}
		}
	}
</script>

<style lang="less">
.agree {
	min-height: 100%;
	background-color: #FFFFFF;
	.content-view {
		padding: 10px;
	}
}
</style>
