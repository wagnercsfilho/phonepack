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

	function isArray(value) {
		if (Object.prototype.toString.call(value) === '[object Array]') {
			return true;
		}

		return false;

	}

	class DOM {

		constructor(selector) {
			if (typeof selector === 'object') {
				this.selector = selector.selector;
				this.elements = selector;
			}
			else {
				this.selector = selector;
				this.elements = document.querySelectorAll(selector);
			}

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
			return this;
		}

		toggleClass(className) {
			[].forEach.call(this.elements, function(el) {
				el.classList.toggle(className);
			});
			return this;
		}

		removeClass(className) {
			[].forEach.call(this.elements, function(el) {
				el.classList.remove(className);
			});
			return this;
		}

		hasClass(className) {
			return this.elements[0].classList.contains(className);
		}

		append(htmlContent) {
			[].forEach.call(this.elements, function(el) {
				return el.insertAdjacentHTML('beforeend', htmlContent);
			});
			return this;
		}

		prepend(htmlContent) {
			[].forEach.call(this.elements, function(el) {
				return el.insertAdjacentHTML('afterbegin', htmlContent);
			});
			return this;
		}

		insertBefore(htmlContent) {
			[].forEach.call(this.elements, function(el) {
				return el.insertAdjacentHTML('beforebegin', htmlContent);
			});
			return this;
		}

		insertAfter(htmlContent) {
			[].forEach.call(this.elements, function(el) {
				return el.insertAdjacentHTML('afterend', htmlContent);
			});
			return this;
		}

		next() {
			[].forEach.call(this.elements, function(el) {
				return el.nextElementSibling;
			});
			return this;
		}

		setAttribute(attrName) {
			[].forEach.call(this.elements, function(el) {
				el.setAttribute("disabled", "disabled");
			});
			return this;
		}

		removeAttibute(attrName) {
			[].forEach.call(this.elements, function(el) {
				el.removeAttibute(attrName);
			});
			return this;
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

		touch(callback) {
			if (isArray(this.elements)) {
				[].forEach.call(this.elements, function(el) {
					handlerTouch(el);
				});
			}
			else {
				handlerTouch(this.elements);
			}

			function handlerTouch (el) {
				var touchsurface = el,
					dir,
					swipeType,
					startX,
					startY,
					distX,
					distY,
					dist,
					threshold = 150, //required min distance traveled to be considered swipe
					restraint = 100, // maximum distance allowed at the same time in perpendicular direction
					allowedTime = 500, // maximum time allowed to travel that distance
					elapsedTime,
					startTime,
					handletouch = callback || function(evt, dir, phase, swipetype, distance) {};

				touchsurface.addEventListener('touchstart', function(e) {
					var touchobj = e.changedTouches[0];
					dir = 'none';
					swipeType = 'none';
					dist = 0;
					startX = touchobj.pageX;
					startY = touchobj.pageY;
					startTime = new Date().getTime(); // record time when finger first makes contact with surface
					handletouch(e, 'none', 'start', swipeType, 0); // fire callback function with params dir="none", phase="start", swipetype="none" etc
					//e.preventDefault();

				}, false);

				touchsurface.addEventListener('touchmove', function(e) {
					var touchobj = e.changedTouches[0];
					distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
					distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
					if (Math.abs(distX) > Math.abs(distY)) { // if distance traveled horizontally is greater than vertically, consider this a horizontal movement
						dir = (distX < 0) ? 'left' : 'right';
						handletouch(e, dir, 'move', swipeType, distX); // fire callback function with params dir="left|right", phase="move", swipetype="none" etc
					}
					else { // else consider this a vertical movement
						dir = (distY < 0) ? 'up' : 'down';
						handletouch(e, dir, 'move', swipeType, distY); // fire callback function with params dir="up|down", phase="move", swipetype="none" etc
					}
					// e.preventDefault(); // prevent scrolling when inside DIV
				}, false);

				touchsurface.addEventListener('touchend', function(e) {
					var touchobj = e.changedTouches[0];
					elapsedTime = new Date().getTime() - startTime; // get time elapsed
					if (elapsedTime <= allowedTime) { // first condition for awipe met
						if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
							swipeType = dir; // set swipeType to either "left" or "right"
						}
						else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
							swipeType = dir; // set swipeType to either "top" or "down"
						}
					}
					// Fire callback function with params dir="left|right|up|down", phase="end", swipetype=dir etc:
					handletouch(e, dir, 'end', swipeType, (dir == 'left' || dir == 'right') ? distX : distY);
					//e.preventDefault();
				}, false);

				touchsurface.addEventListener('touchcancel', function(e) {
					var touchobj = e.changedTouches[0];
					dir = 'none';
					swipeType = 'none';
					handletouch(e, 'none', 'cancel', swipeType, 0); // fire callback function with params dir="none", phase="start", swipetype="none" etc
				}, false);
			}
		}
	}

	function element(el) {
		return new DOM(el);
	}

	return element;

})();

export default DOM;