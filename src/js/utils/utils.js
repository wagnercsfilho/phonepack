export default {

	extend: function(a, b) {
		for (let i = 1; i < arguments.length; i++) {
			for (let key in arguments[i]) {
				if (arguments[i].hasOwnProperty(key)) {
					arguments[0][key] = arguments[i][key];
				}
			}
		}
		return arguments[0];
	},

	clousestClass: function(el, className) {

		while (el && el.parentNode) {
			el = el.parentNode;
			if (el.classList)
				if (el.classList.contains(className)) {
					return el;
				}
		}

		return null;
	}

};