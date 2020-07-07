<template>
	<view>
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="content">商家列表</block>
		</cu-custom>
		<view>
			<liuyuno-tabs :tabData="cateory" :defaultIndex="defaultIndex" @tabClick='tabClick' />
		</view>
		<view class="list">
			<my-shops :shops="item" v-for="item in shops" :key="item.id" @tap="godetail(item.id)"></my-shops>
		</view>

		<view class="emty" v-if="bool">
			<my-empty></my-empty>
		</view>
	</view>
</template>

<script>
	import api from "@/api/";
	import liuyunoTabs from "@/components/liuyuno-tabs/liuyuno-tabs.vue";
	import MyShops from "@/components/MyShops";
	export default {
		components: {
			liuyunoTabs,
			MyShops
		},
		data() {
			return {
				defaultIndex: 0,
				cateory: ['全部', '服装'],
				shops: [],
				bool: false,
			}
		},
		methods: {
			async tabClick(index) {
				this.bool = false
				this.shops = []
				let res = await api.shopList({
					cid: this.cateory[index].id
				})
				if (res.code == 1) {
					if (!res.data.list.length) return this.bool = true
					this.shops = res.data.list

				}

			},
			async getCateory() {
				let res = await api.cateList()
				if (res.code == 1) {
					this.cateory = res.data.list
				}
				this.tabClick(this.defaultIndex)

			},
			godetail(id) {
				uni.navigateTo({
					url: `/pages/home/detail?id=${id}`
				})
			}

		},
		onLoad({
			index,
			id
		}) {
			this.defaultIndex = index - 0
			this.getCateory()
		},
		watch: {
			shops(n) {
				this.bool = n.length > 0 ? false : true
			}
		}
	}
</script>

<style lang="less">
	.list {
		padding: 10px 0;
	}

	.emty {
		margin: 120rpx auto 0;
		text-align: center;

		.tipss {
			text-align: center;
			color: #999;
		}
	}
</style>
