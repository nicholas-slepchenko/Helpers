if (typeof Helper !== 'object') {
	Helper = {};
}

Helper.xml = {
	parse: function (node) {
		var parser = new DOMParser, result = {}, xml = node;

		if (typeof node === 'string') {
			node = node.replace(/\0/, '');
			xml = parser.parseFromString(node, 'text/xml');
		}

		var attrs = xml.attributes;

		if (attrs) {
			for (var i = 0, len = attrs.length; i < len; i++) {
				result[attrs[i].name] = attrs[i].value;
			}
		}

		var firstChild = xml.firstChild;

		while (firstChild) {
			if (firstChild.nodeType === 1) {
				var res = Helper.xml.parse(firstChild), tag = firstChild.tagName, prop;

				if (prop = result[tag]) {
					if (Array.isArray(prop)) {
						prop.push(res);
					} else {
						(result[tag] = []).push(prop, res);
					}
				} else {
					result[tag] = res;
				}
			}

			firstChild = firstChild.nextSibling;
		}

		return result;
	},

	encode: function (object, tagName) {
		var xmlDoc = document.implementation.createDocument('http://www.w3.org/XML', 'xml', null), result = xmlDoc.createDocumentFragment();

		if (tagName) {
			result = xmlDoc.createElement(tagName);
		}

		for (var prop in object) {
			var value = object[prop];

			if (Array.isArray(value)) {
				for (var i = 0, len = value.length; i < len; i++) {
					result.appendChild(this.encode(value[i], prop));
				}
			} else if (typeof value === 'object') {
				result.appendChild(this.encode(value, prop));
			} else {
				result.setAttribute(prop, value);
			}
		}

		return result;
	}
};