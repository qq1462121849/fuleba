<template>
	<view class="empty">
		<image class="icon" src="/static/empty_icon.png" mode="widthFix"></image>
		<view class="label">什么也没有~~</view>
	</view>
</template>

<script>
	/**
	 * 空背景图
	 */
	export default {
		name: 'MyEmpty'
	}
</script>

<style lang="less" scoped>
	.empty {
		width: 100%;
		padding-top: 50px;
		text-align: center;
		.icon {
			width: 60px;
			opacity: 0.3;
		}
		.label {
			line-height: 25px;
			font-size: 14px;
			color: #777;
		}
	}
</style>
