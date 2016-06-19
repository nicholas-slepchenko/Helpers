if (typeof Helper !== 'object') {
	Helper = {};
}

Helper.date = {
	timestamp: function (date) {
		var time = (date ? new Date(date) : new Date),
			hh = time.getHours(),
			mm = time.getMinutes() + 1,
			ss = time.getSeconds();

		if (hh < 10) hh = '0' + hh;
		if (mm < 10) mm = '0' + mm;
		if (ss < 10) mm = '0' + mm;

		return hh + ':' + mm + ':' + ss;
	}
};