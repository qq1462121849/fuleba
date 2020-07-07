<template>
	<view class="agent-profit-list">
		<my-empty v-if="empty"></my-empty>
	</view>
</template>

<script>
	import agent from '@/api/agent';
	export default {
		name: 'AgentProfitList',
		data() {
			return {
				list: [],
				empty: true,
			}
		},
		methods: {
		}
	}
</script>

<style>
</style>
