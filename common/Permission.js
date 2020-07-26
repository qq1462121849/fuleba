export default class Permission {
	constructor(permissionID, permissionDes = '') {
		this.permissionID = permissionID
		this.permissionDes = permissionDes
	}

	async request() {
		
		return	await this.check();
			
	}

	async check() {
		const [settingError, settingRes] = await uni.getSetting();
		console.log(settingError, settingRes);
		

		// 首次授权
		if (!settingRes.authSetting.hasOwnProperty(this.permissionID)) {
			const [authError, authRes] = await uni.authorize({
				scope: this.permissionID
			})
			return authError?false:true;
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
		
		if (res.cancel) return   
		let resq = await uni.openSetting();
		return console.log(resq,'11111111111111')
		const [openSettingError, openSettingRes] = await uni.openSetting();
		console.log(openSettingError, openSettingRes);
		
		return openSettingRes.authSetting[this.permissionID];
	}
}
