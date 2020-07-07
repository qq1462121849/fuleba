<template>
	<view class="agent-shop-list">
		<my-empty v-if="empty"></my-empty>
		<my-shops :shops="shops" v-for="shops in list" :key="shops.id"></my-shops>
	</view>
</template>

<script>
	import agent from '@/api/agent';
	import MyShops from '@/components/MyShops';
	export default {
		name: 'AgentShopList',
		data() {
			return {
				list: [],
				empty: false,
			}
		},
		components: {
			MyShops,
		},
		created() {
			this.loadData()
		},
		methods: {
			loadData() {
				agent.shopList().then(res => {
					if (res.code === 1) {
						if (res.data.list.length <= 0) {
							this.empty = true;
							this.list = [];
						} else {
							this.empty = false;
							this.list = res.data.list;
						}
					} else {
						this.empty = true;
						this.list = [];
						this.toast(res.msg);
					}
				})
			}
		}
	}
</script>

<style>
</style>
