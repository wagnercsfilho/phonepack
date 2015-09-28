var DOM = (function() {

	var eventsListeners = [];

	document.addEventListener('click', handler, false);
	
	function handler(e) {
		var element = e.target;
		
		console.log(e);

		eventsListeners.forEach(function(ev) {
			//TODO
		});
	}

	function clousestClass(el, className) {

		if (verifyClass(el, className)) {
			return el;
		}

		function verifyClass(el) {
			if (el.classList.contains(className)) {
				return el;
			}
		}

		while (el && el.parentNode) {
			el = el.parentNode;
			if (el.classList) {
				return verifyClass(el, className);
			}
		}

		return null;
	}

	

	class DOM {

		constructor(element) {
			this.element = document.querySelectorAll(element);
			return this;
		}

		on(eventName, callback) {
			eventsListeners.push({
				eventName: eventName,
				element: this.getElement(),
				fn: callback
			});
		}

		click(callback) {
			eventsListeners.push({
				element: this.element,
				fn: callback
			});
		}

		getElement() {
			return this.element;
		}

	}


	function element(el) {
		return new DOM(el);
	}

	return element;

})();

export default DOM;