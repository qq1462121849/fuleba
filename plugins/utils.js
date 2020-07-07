const UtilsPlugin = {
	install: (Vue, options) => {
		/**
		 * 跳转
		 * type 1 页面跳转 2 tab跳转 3 调用webview
		 */
		Vue.prototype.jumpTo = function(path, type = "inside", needLogin = false) {
			if (needLogin === true) {
				if (!this.$store.state.hasLogin) {
					uni.switchTab({
						url: '/pages/my/index'
					});
					return this.toast('请登录后操作');
				}
			}
			switch (type) {
				case "inside":
					uni.navigateTo({
						url: path
					});
					break;
				case "tabbar":
					uni.switchTab({
						url: path
					});
					break;
				case "web":
					uni.navigateTo({
						url: '/pages/web/index?url=' + encodeURIComponent(path)
					});
					break;
				default:
					console.log(path, type, needLogin)
					uni.showToast({
						title: '未知的跳转路径',
						icon: 'none',
						duration: 1500
					});
					break;
			}
		}
		
		/**
		 * 返回
		 */
		Vue.prototype.goBack = function() {
			// #ifdef APP-PLUS
			uni.navigateBack({
				animationType: 'pop-out',
				animationDuration: 200
			})
			// #endif
			
			// #ifdef H5
			history.back()
			// #endif
		}
		
		/**
		 * 消息提示
		 */
		Vue.prototype.toast = function(msg = '') {
			uni.showToast({
				title: msg,
				icon: 'none'
			})
		}
	}
}

export default UtilsPlugin
