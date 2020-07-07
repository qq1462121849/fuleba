<template>
	<view class="agent-index">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="content">拓店者管理中心</block>
		</cu-custom>
		<view class="tabbar" :style="{top: CustomBar + 'px'}">
			<view class="item" :class="{active: tabIndex === 0}" @tap="switchTab(0)">
				<text>我的商家</text>
			</view>
			<view class="item" :class="{active: tabIndex === 1}" @tap="switchTab(1)">
				<text>我的收益</text>
			</view>
		</view>

		<view class="list">
			<agent-shop-list v-if="tabIndex === 0"></agent-shop-list>
			<agent-profit-list v-if="tabIndex === 1"></agent-profit-list>
		</view>
	</view>
</template>

<script>
	import AgentShopList from './AgentShopList'
	import AgentProfitList from './AgentProfitList'
	export default {
		data() {
			return {
				tabIndex: 0,
				CustomBar: this.CustomBar,
			}
		},
		components: {
			AgentShopList,
			AgentProfitList,
		},
		methods: {
			switchTab(index) {
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index;
				this.empty = false;
			}
		}
	}
</script>

<style lang="less">
	.agent-index {
		.tabbar {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			background-color: #FFFFFF;
			display: flex;
		
			.item {
				flex: 1;
				text-align: center;
				font-size: 15px;
		
				text {
					display: inline-block;
					color: #000;
					padding: 0 10px;
					line-height: 40px;
				}
		
				&.active {
					text {
						color: #FF4F07;
						border-bottom: 3px solid #FF4F07;
					}
				}
			}
		}
		
		.list {
			padding-top: 50px;
		}
	}
</style>
