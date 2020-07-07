<template>
	<view class="home-menus">
		<view class="item" v-for="(item,index) in cateory" :key="item.id" @tap="goNav(index)">
			<image class="img" :src="item.thumb" mode="widthFix"></image>
			<text class="label">{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	
	export default {
		name: 'MyHomeMenus',
		data(){
			return{

			}
		},
		props:['cateory'],
		methods:{
			goNav(index){
				uni.navigateTo({
					url:`/pages/home/list?index=${index}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.home-menus {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		background-color: #FFFFFF;
		padding-top: 10px;
		padding-bottom: 15px;
		.item {
			flex: 0 0 20%;
			text-align: center;
			padding-top: 5px;
			.img {
				display: block;
				width: 40px;
				height: 40px;
				margin: 0 auto;
			}
			.label {
				display: block;
				padding-top: 5px;
				line-height: 25px;
				font-size: 13px;
			}
		}
	}
</style>
