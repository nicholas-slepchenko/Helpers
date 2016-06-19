if (typeof Helper !== 'object') {
	Helper = {};
}

Helper.console = {
	log: function (title, data) {
		var timestamp = function (date) {
			var time = (date ? new Date(date) : new Date),
				hh = time.getHours(),
				mm = time.getMinutes() + 1,
				ss = time.getSeconds();

			if (hh < 10) hh = '0' + hh;
			if (mm < 10) mm = '0' + mm;
			if (ss < 10) mm = '0' + mm;

			return hh + ':' + mm + ':' + ss;
		};

		if (localStorage.saveMySoul === 'true') return;
		if (data) {
			console.groupCollapsed(timestamp(data.timeStamp) + ' - ' + title);
			console.log(data);
			console.groupEnd();
		} else {
			console.log(timestamp() + ' - ' + title);
		}
	}
};