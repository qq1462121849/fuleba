<template>
	<view class="follow">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="content">我的关注</block>
		</cu-custom>
		<my-empty v-if="list.length <= 0"></my-empty>
		<my-shops :shops="shops" v-for="shops in list" :key="shops.id"></my-shops>
	</view>
</template>

<script>
	import user from '@/api/user'
	import MyShops from '@/components/MyShops'
	export default {
		data() {
			return {
				list: []
			}
		},
		components: {
			MyShops
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			async loadData() {
				user.followShopList().then(res => {
					if (res.code === 0) {
						return this.toast(res.msg);
					}
					if (res.code === 1) {
						this.list = res.data.list
					}
				})
			}
		}
	}
</script>

<style>

</style>
