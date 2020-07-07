export default class Permission {
	constructor(permissionID, permissionDes = '') {
		this.permissionID = permissionID
		this.permissionDes = permissionDes
	}

	async request() {
		try {
			const result = await this.check();
			return result;
		} catch (e) {
			console.log(e)
			uni.showToast({
				title: e.message,
				icon: 'none'
			})
			return false;
		}
	}

	async check() {
		const [settingError, settingRes] = await uni.getSetting();
		console.log(settingError, settingRes);
		if (settingError) {
			throw new Error(settingError.errMsg);
		}

		// 首次授权
		if (!settingRes.authSetting.hasOwnProperty(this.permissionID)) {
			const [authError, authRes] = await uni.authorize({
				scope: this.permissionID
			})
			console.log(authError, authRes);
			if (authError) {
				throw new Error('授权取消');
			}

			return true;
		}

		// 已授权
		if (settingRes.authSetting[this.permissionID] === true) {
			return true;
		} else {
			return this.openSetting()
		}
	}

	async openSetting() {
		const [error, res] = await uni.showModal({
			title: '是否打开设置页？',
			content: this.permissionDes,
		});
		
		if (error) {
			throw new Error(error.errMsg);
		}
		
		if (res.cancel === true) {
			throw new Error('已取消设置');
		}
		
		const [openSettingError, openSettingRes] = await uni.openSetting();
		console.log(openSettingError, openSettingRes);
		if (openSettingError) {
			throw new Error(openSettingError.errMsg);
		}
		if (!openSettingRes.authSetting[this.permissionID]) {
			throw new Error('授权失败');
		}
		
		return true;
	}
}
