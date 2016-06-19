if (typeof Helper !== 'object') {
	Helper = {};
}

Helper.array = {
	/**
	 * Find elements in array
	 * @param array 'first' or 'last'
	 * @param config {item, property, value}
	 * @returns array of elements or object
	 */
	findInArray: function (array, config) {
		config.item = config.item || 'all';
		config.property = config.property || null;
		config.value = config.value || null;

		var response = null, fnc = null;

		if (config.property !== null) {
			if (config.value !== null) {
				fnc = function (obj) {
					return obj[config.property] === config.value;
				};
			} else {
				fnc = function (obj) {
					return obj[config.property] !== undefined;
				};
			}
		} else if (config.value !== null) {
			fnc = function (obj) {
				var _response = false;

				for (var property in obj) {
					if (obj.hasOwnProperty(property) && obj[property] === config.value) {
						_response = true;
					}
				}

				return _response;
			};
		}

		response = array.filter(fnc);

		if (config.item == 'first') {
			response = response[0];
		} else if (config.item == 'last') {
			response = response[response.length - 1];
		}

		return response;
	}
};