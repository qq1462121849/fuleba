<template>
	<view class="profile">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="content">个人信息</block>
		</cu-custom>
		<view class="cu-form-group">
			<view class="title">UID</view>
			<input :value="userInfo.id" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">昵称</view>
			<input :value="userInfo.nickname" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号</view>
			<input :value="userInfo.mobile" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">积分</view>
			<input :value="userInfo.score" disabled=""></input>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods: {
		}
	}
</script>

<style>

</style>
