var DOM = (function() {

	Element.prototype.matches = (Element.prototype.matches || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.webkitMatchesSelector);

	var eventsListeners = {};

	document.addEventListener('click', handler, false);
	document.addEventListener('dblclick', handler, false);
	document.addEventListener('touchend', handler, false);
	document.addEventListener('touchstart', handler, false);


	function handler(e) {
		var element = e.target;

		if (eventsListeners[e.type]) {
			eventsListeners[e.type].forEach(function(ev) {
				let _elementTarget = closest(element, ev.selector); 
				if (_elementTarget) {
					ev.fn(e, _elementTarget);
				}
			});
		}
	}

	function closest(el, selector) {

		if (Element.prototype.closest) {
			return el.closest(selector);
		}

		while (el && el.parentNode) {
			if (el.matches(selector)) {
				return el;
			}

			el = el.parentNode;
		}

		return null;
	}

	class DOM {

		constructor(selector) {
			this.selector = selector;
			this.elements = document.querySelectorAll(selector);

			return this;
		}

		on(eventName, callback) {
			var obj = {
				selector: this.selector,
				element: this.elements,
				fn: callback
			};

			if (!eventsListeners[eventName]) {
				eventsListeners[eventName] = [obj];
			}
			else {
				eventsListeners[eventName].push(obj);
			}
		}

		click(callback) {
			[].forEach.call(this.elements, function(el) {
				el.addEventListener('click', callback);
			});
		}
		
		dblclick(callback) {
			[].forEach.call(this.elements, function(el) {
				el.addEventListener('dblclick', callback);
			});
		}
		
		ontouchend(callback) {
			[].forEach.call(this.elements, function(el) {
				el.addEventListener('touchend', callback);
			});
		}
		
		ontouchstart(callback) {
			[].forEach.call(this.elements, function(el) {
				el.addEventListener('touchstart', callback);
			});
		}

		addClass(className) {
			[].forEach.call(this.elements, function(el) {
				el.classList.add(className);
			});
		}

		toggleClass(className) {
			[].forEach.call(this.elements, function(el) {
				el.classList.toggle(className);
			});
		}

		removeClass(className) {
			[].forEach.call(this.elements, function(el) {
				el.classList.remove(className);
			});
		}

		append(htmlContent) {
			[].forEach.call(this.elements, function(el) {
				return el.insertAdjacentHTML('beforeend', htmlContent);
			});
		}

		prepend(htmlContent) {
			[].forEach.call(this.elements, function(el) {
				return el.insertAdjacentHTML('afterbegin', htmlContent);
			});
		}

		insertBefore(htmlContent) {
			[].forEach.call(this.elements, function(el) {
				return el.insertAdjacentHTML('beforebegin', htmlContent);
			});
		}

		insertAfter(htmlContent) {
			[].forEach.call(this.elements, function(el) {
				return el.insertAdjacentHTML('afterend', htmlContent);
			});
		}

		next() {
			[].forEach.call(this.elements, function(el) {
				return el.nextElementSibling;
			});
		}

		setAttribute(attrName) {
			[].forEach.call(this.elements, function(el) {
				el.setAttribute("disabled", "disabled");
			});
		}

		removeAttibute(attrName) {
			[].forEach.call(this.elements, function(el) {
				el.removeAttibute(attrName);
			});
		}

		getAttribute(attrName) {
			return this.element[0].getAttribute(attrName);
		}

		hasAttribute(attrName) {
			return this.element[0].hasAttribute(attrName);
		}

		html(content) {
			[].forEach.call(this.elements, function(el) {
				el.innerHTML = content;
			});
		}

		outerHTML() {
			return this.element[0].outerHTML;
		}

		closest(selector) {
			return closest(this.element[0], selector);
		}

	}

	function element(el) {
		return new DOM(el);
	}

	return element;

})();

export default DOM;