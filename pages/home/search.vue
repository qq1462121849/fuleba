<template>
	<view>
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="content">商家搜索</block>
		</cu-custom>
		<view class="home-header">
			<view class="icon cuIcon-search"></view>
			<input class="search" type="text" v-model="keyword" @keydown.enter.native="search" placeholder="请输入商家名称搜索" />
			<view class="btn" @tap="search">搜索</view>
		</view>
		<view class="list">
			<my-shops :shops="item" v-for="item in shops" :key="item.id"></my-shops>
		</view>
		<view class="emty" v-if="bool">
			<my-empty></my-empty>
		</view>
	</view>
</template>

<script>
	import api from "@/api/";
	import MyShops from "@/components/MyShops";
	export default {
		data() {
			return {
				keyword: "",
				shops: [],
				bool: false,
			};
		},
		components: {
			MyShops
		},
		methods: {
			async search() {
				this.bool = false
				this.shops = []
				let res = await api.shopList({keyword: this.keyword})
				if (res.code == 1) {
					if (!res.data.list.length) return this.bool = true
					this.shops = res.data.list
				}
			},
			godetail(id) {
				uni.navigateTo({
					url: `/pages/home/detail?id=${id}`
				})
			}
		},
		onLoad({
			key: keyword
		}) {
			this.keyword = keyword
			if (!keyword) return
			this.search({
				keyword
			})
		},
		watch: {
			shops(n) {
				this.bool = n.length > 0 ? false : true
			}
		}
	};
</script>
<style lang="less" scoped>
	.emty {
		margin: auto;
		text-align: center;

		.tipss {
			text-align: center;
			color: #999;
		}
	}

	.home-header {
		position: relative;
		width: 100%;
		background-color: #ffffff;
		padding: 10px;

		.search {
			display: block;
			width: 100%;
			height: 30px;
			padding: 0 50px 0 30px;
			border: none;
			border-radius: 15px;
			background-color: #f4f4f4;
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
			color: #ffffff;
			font-size: 12px;
			text-align: center;
			line-height: 28px;
			background-color: #ff4f07;
			border-radius: 14px;
		}
	}

	.list {
		padding: 10px 0;
	}
</style>
