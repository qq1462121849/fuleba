import user from '@/api/user';

export function upload(file) {
	uni.showLoading({
		title: '上传中~'
	})
	setTimeout(() => {
		uni.hideLoading()
	}, 5000)
	return new Promise((resolve, reject) => {
		user.upload(file).then((res) => {
			uni.hideLoading();
			if (res.code === 1) {
				resolve(res.data)
			} else {
				reject(new Error(res.data.msg))
			}
		})
	})
}

export function save(url) {
	uni.showLoading({
		title: '保存中~'
	})
	setTimeout(() => {
		uni.hideLoading()
	}, 5000)
	return new Promise((resolve, reject) => {
		uni.downloadFile({
			url: url,
			success: (res) => {
				if (res.statusCode === 200) {
					uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success: function() {
							uni.hideLoading()
							resolve()
							uni.showToast({
								title: "保存成功",
								icon: "none"
							});
						},
						fail: function() {
							uni.hideLoading()
							uni.showToast({
								title: "保存失败，请稍后重试",
								icon: "none"
							})
						}
					});
				}
			}
		})
	})
}
