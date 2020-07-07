<template>
	<view class="home-header">
		<view class="icon cuIcon-search"></view>
		<input class="search" type="text" v-model="value" @keydown.enter.native="gotoSearch" placeholder="请输入商家名称搜索" />
		<view class="btn" @tap="gotoSearch">搜索</view>
	</view>
</template>

<script>
	/**
	 * 首页头部
	 */
	export default {
		name: 'MyHomeHeader',
		methods:{
			gotoSearch(){
				uni.navigateTo({
					url:`/pages/home/search?key=${this.value}`
				})
			}
		},
		data(){
			return {
				value:''
			}
		}
	}
</script>

<style lang="less" scoped>
	.home-header {
		position: relative;
		width: 100%;
		background-color: #FFFFFF;
		padding: 10px;
		.search {
			display: block;
			width: 100%;
			height: 30px;
			padding: 0 50px 0 30px;
			border: none;
			border-radius: 15px;
			background-color: #F4F4F4;
			line-height: 20px;
			font-size: 14px;
		}
		.icon {
			position: absolute;
			left: 20px;
			top: 15px;
			font-size: 18px;
		}
		.btn {
			position: absolute;
			right: 10px;
			top: 11px;
			width: 60px;
			height: 28px;
			color: #FFFFFF;
			font-size: 12px;
			text-align: center;
			line-height: 28px;
			background-color: #FF4F07;
			border-radius: 14px;
		}
	}
</style>
