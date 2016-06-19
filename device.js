if (typeof Helper !== 'object') {
	Helper = {};
}

Helper.device = {
	userAgent: window.navigator.userAgent.toLowerCase(),

	fullScreen: {
		enter: function () {
			var method = Helper.existMethod(document.body, ['requestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen', 'msRequestFullscreen']);

			if (method) {
				document.body[method]();
			}
		},

		exit: function () {
			var method = Helper.existMethod(document, ['exitFullscreen', 'mozCancelFullScreen', 'webkitExitFullscreen']);

			if (method) {
				document[method]();
			}
		},

		isActive: function () {
			var method = Helper.existMethod(document, ['fullscreenElement', 'webkitFullscreenElement', 'mozFullScreenElement', 'msFullscreenElement']);

			return method !== undefined;
		}
	},

	// Simple UA string search
	find: function (needle) {
		return this.userAgent.indexOf(needle) !== -1;
	},

	// The Device Detection
	isIos: function () {
		return this.isIphone() || this.isIpod() || this.isIpad()
	},

	isIphone: function () {
		return !this.isWindows() && this.find('iphone');
	},

	isIpod: function () {
		return this.find('ipod');
	},

	isIpad: function () {
		return this.find('ipad');
	},

	isAndroid: function () {
		return !this.isWindows() && this.find('android');
	},

	isChrome: function () {
		return this.find('chrome');
	},

	isAndroidPhone: function () {
		return this.isAndroid() && this.find('mobile');
	},

	isAndroidTablet: function () {
		return this.isAndroid() && !this.find('mobile');
	},

	isBlackberry: function () {
		return this.find('blackberry') || this.find('bb10') || this.find('rim');
	},

	isBlackberryPhone: function () {
		return this.isBlackberry() && !this.find('tablet');
	},

	isBlackberryTablet: function () {
		return this.isBlackberry() && this.find('tablet');
	},

	isWindows: function () {
		return this.find('windows');
	},

	isWindowsPhone: function () {
		return this.isWindows() && this.find('phone');
	},

	isWindowsTablet: function () {
		return this.isWindows() && (this.find('touch') && !this.isWindowsPhone());
	},

	isFxos: function () {
		return (this.find('(mobile;') || this.find('(tablet;')) && this.find('; rv:');
	},

	isFxosPhone: function () {
		return this.isFxos() && this.find('mobile');
	},

	isFxosTablet: function () {
		return this.isFxos() && this.find('tablet');
	},

	isMeego: function () {
		return this.find('meego');
	},

	isCordova: function () {
		return window.cordova && location.protocol === 'file:';
	},

	isNodeWebkit: function () {
		return typeof window.process === 'object';
	},

	isMobile: function () {
		return this.isAndroidPhone() || this.isIphone() || this.isIpod() || this.isWindowsPhone() || this.isBlackberryPhone() || this.isFxosPhone() || this.isMeego();
	},

	isTablet: function () {
		return this.isIpad() || this.isAndroidTablet() || this.isBlackberryTablet() || this.isWindowsTablet() || this.isFxosTablet();
	},

	isDesktop: function () {
		return !this.isTablet() && !this.isMobile();
	},

	// Orientation Detection
	isPortrait: function () {
		return window.innerHeight > window.innerWidth;
	},

	isLandscape: function () {
		return window.innerHeight < window.innerWidth;
	}
};