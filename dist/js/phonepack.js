(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/ubuntu/workspace/phonepack/src/js/buttons.js":[function(require,module,exports){
var utils = require('./utils');

module.exports = function() {

    var addRippleEffect = function (e) {
        var target = e.target;

        if ((target.classList.contains('button--ripple')) 
            || (utils.clousestClass(target, 'button--ripple')) 
            || (utils.clousestClass(target, 'tab--ripple')) 
            || (target.classList.contains('tab--ripple'))) {
            
            var rect = target.getBoundingClientRect();
            var ripple = target.querySelector('.button--ripple__animation');
            
            if (!ripple) {
                ripple = document.createElement('span');
                ripple.className = 'button--ripple__animation';
                ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
                target.appendChild(ripple);
            }
            
            ripple.classList.remove('show');
            var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
            var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
            ripple.style.top = top + 'px';
            ripple.style.left = left + 'px';
            ripple.classList.add('show');
        }

        return false;
    }

    document.addEventListener('click', addRippleEffect, false);

}
},{"./utils":"/home/ubuntu/workspace/phonepack/src/js/utils.js"}],"/home/ubuntu/workspace/phonepack/src/js/dialog.js":[function(require,module,exports){
var utils = require('./utils');

var Dialog = (function(){

	function Dialog(params){

		var self = this;

		var options = {
			title: null,
			content: null,
			options: { 
				ok: 'OK',
				cancel: null
			}
		}

		this.options = utils.extend({}, options, params);

		self.overlay = document.createElement("div");
		self.overlay.className = 'dialog-filter';

		self.dialog = document.createElement("div");
		self.dialog.className = 'dialog';

		if (self.options.title){
			var title = document.createElement("div");
			title.className = 'dialog__title';
			title.innerHTML = self.options.title;
			self.dialog.appendChild(title);
		}

		if (self.options.content){
			var content = document.createElement("div");
			content.className = 'dialog__content';
			content.innerHTML = self.options.content;
			self.dialog.appendChild(content);
		}

		var actions = document.createElement("div");
		actions.className = 'dialog__actions';

		if (self.options.options.cancel){
			self.btnCancel = document.createElement('button');
			self.btnCancel.className = 'btn btn--m btn--red btn--flat btn--ripple';
			self.btnCancel.innerHTML = self.options.options.cancel;
			actions.appendChild(self.btnCancel);
		}

		self.btnOk = document.createElement('button');
		self.btnOk.className = 'btn btn--m btn--blue btn--flat btn--ripple';
		self.btnOk.innerHTML = self.options.options.ok;
		actions.appendChild(self.btnOk);

		self.dialog.appendChild(actions);

		document.body.appendChild(self.overlay);
		document.body.appendChild(self.dialog);
	
		return self;
	}

	Dialog.prototype.show = function(confirmCallback, cancelCallback){

		var self = this;

		setTimeout(function(){ 
			this.overlay.classList.add('dialog-filter--is-shown');
			this.dialog.classList.add('dialog--is-shown');
		}.bind(self), 0);

		self.btnOk.addEventListener('click', function(){
			confirmCallback()
		});

		if (self.btnCancel){
			self.btnCancel.addEventListener('click', function(){
				cancelCallback();
			});
		}

		self.overlay.addEventListener('click', function(){
			self.hide();
		}, false);

		return self;

	}

	Dialog.prototype.hide = function(){

		var self = this;

		setTimeout(function(){ 
			var self = this;
			self.overlay.classList.remove('dialog-filter--is-shown');
			self.dialog.classList.remove('dialog--is-shown');

			
			self.overlay.addEventListener('webkitTransitionEnd', function(){
				self.overlay.remove()
			});
			
			self.overlay.addEventListener('transitionend', function(){
				self.overlay.remove()
			});

			self.dialog.addEventListener('webkitTransitionEnd', function(){
				self.dialog.remove()
			});			

			self.dialog.addEventListener('transitionend', function(){
				self.dialog.remove()
			});
			
		}.bind(self), 0);

		return self;
	}

	return Dialog;

})();

module.exports = Dialog;
},{"./utils":"/home/ubuntu/workspace/phonepack/src/js/utils.js"}],"/home/ubuntu/workspace/phonepack/src/js/dropdown-menu.js":[function(require,module,exports){
var utils = require('./utils');

var DropDownMenu = (function(){

	var removed = false;

	document.addEventListener('click', function(e){
			var _target = e.target;

			removed = false;

			var elements = document.getElementsByClassName('dropdown-menu');
			for (var i = 0; i < elements.length; i++){
				if (elements[i].classList.contains('visible')){
					elements[i].classList.remove('visible');
					removed = true;
				}
			}

	}, true);

	function DropDownMenu(element, elMenu){
		var self = this;

		self.element = element;
		self.elMenu = elMenu;

		if (self.elMenu.classList.contains('visible')) {
			self.elMenu.classList.remove('visible');
		} else if (!removed){
			var target = self.element.getBoundingClientRect();
			
			self.elMenu.style.top = target.top + 'px';
			self.elMenu.style.left = ((target.left - document.body.scrollLeft) - 150) + 'px';
			self.elMenu.classList.add('visible');
		}

		removed = false;

		return false;

		/*var bodyRect = document.body.getBoundingClientRect(),
    elemRect = element.getBoundingClientRect(),
    offset   = elemRect.top - bodyRect.top;

alert('Element is ' + offset + ' vertical pixels from <body>');
*/
	}

	return DropDownMenu;

})();

module.exports = DropDownMenu;
},{"./utils":"/home/ubuntu/workspace/phonepack/src/js/utils.js"}],"/home/ubuntu/workspace/phonepack/src/js/fastclick.js":[function(require,module,exports){
;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());

},{}],"/home/ubuntu/workspace/phonepack/src/js/index.js":[function(require,module,exports){
var utils = require('./utils');
var _FastClick = require('./fastclick');
var _SlideMenu = require('./slide-menu');
var _PullToRefresh = require('./pull-to-refresh');
var _Buttons = require('./buttons');
var _DropDownMenu = require('./dropdown-menu');
var _Pages = require('./navigation');
var _Dialog = require('./dialog');
var _Loading = require('./loading');
var _Notification = require('./notification');

var PhonePack = (function(){
	
	function PhonePack(settings) {

		var _config = {
			fastClick: true
		}

		if (settings){
			_config = utils.extend({}, _config, settings);
		}
		
		if (_config.fastClick){
			_FastClick(document.body);
		}
		
		_Buttons();
		
		return {
			SlideMenu: _SlideMenu,
			PullToRefresh: _PullToRefresh,
			Pages: _Pages,
			DropDownMenu: _DropDownMenu, 
			Dialog: _Dialog,
			Loading: _Loading,
			Notification: _Notification
			
		}


	}

	return PhonePack;
		
})();

window.PhonePack = PhonePack;




},{"./buttons":"/home/ubuntu/workspace/phonepack/src/js/buttons.js","./dialog":"/home/ubuntu/workspace/phonepack/src/js/dialog.js","./dropdown-menu":"/home/ubuntu/workspace/phonepack/src/js/dropdown-menu.js","./fastclick":"/home/ubuntu/workspace/phonepack/src/js/fastclick.js","./loading":"/home/ubuntu/workspace/phonepack/src/js/loading.js","./navigation":"/home/ubuntu/workspace/phonepack/src/js/navigation.js","./notification":"/home/ubuntu/workspace/phonepack/src/js/notification.js","./pull-to-refresh":"/home/ubuntu/workspace/phonepack/src/js/pull-to-refresh.js","./slide-menu":"/home/ubuntu/workspace/phonepack/src/js/slide-menu.js","./utils":"/home/ubuntu/workspace/phonepack/src/js/utils.js"}],"/home/ubuntu/workspace/phonepack/src/js/loading.js":[function(require,module,exports){
var utils = require('./utils');

var Loading = (function(){

	function Loading(params){

		var self = this;

		var options = {
			title: null,
			spinner: true
		}

		this.options = utils.extend({}, options, params);

		self.overlay = document.createElement("div");
		self.overlay.className = 'loading-filter';

		self.dialog = document.createElement("div");
		self.dialog.className = 'loading';

		var main = document.createElement("div");
		main.className = 'loading__main';

		if (this.options.spinner){
			var spinner = document.createElement("div");
			spinner.className = 'loading__spinner';

			var sp = '<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">'+
					 ' <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>'+
					 '</svg>';
			spinner.innerHTML = sp;
			main.appendChild(spinner);

		}

		if (self.options.title){
			var title = document.createElement("div");
			title.className = 'loading__title';
			title.innerHTML = self.options.title;
			main.appendChild(title);
		}

		self.dialog.appendChild(main);

		document.body.appendChild(self.overlay);
		document.body.appendChild(self.dialog);
	
		return self;
	}

	Loading.prototype.show = function(confirmCallback, cancelCallback){

		var self = this;

		setTimeout(function(){ 
			this.overlay.classList.add('loading-filter--is-shown');
			this.dialog.classList.add('loading--is-shown');
		}.bind(self), 0);

		return self;

	}

	Loading.prototype.hide = function(){

		var self = this;

		setTimeout(function(){ 
			var self = this;
			self.overlay.classList.remove('loading-filter--is-shown');
			self.dialog.classList.remove('loading--is-shown');

			
			self.overlay.addEventListener('webkitTransitionEnd', function(){
				self.overlay.remove()
			});
			
			self.overlay.addEventListener('transitionend', function(){
				self.overlay.remove()
			});

			self.dialog.addEventListener('webkitTransitionEnd', function(){
				self.dialog.remove()
			});			

			self.dialog.addEventListener('transitionend', function(){
				self.dialog.remove()
			});
			
		}.bind(self), 0);

		return self;
	}

	return Loading;

})();

module.exports = Loading;
},{"./utils":"/home/ubuntu/workspace/phonepack/src/js/utils.js"}],"/home/ubuntu/workspace/phonepack/src/js/navigation.js":[function(require,module,exports){
var Page = (function(){

	function Page(element){
		var self = this;
		self.element = element;
		self.currentPage = null;
		self.prevPage = null;
		element.classList.add('pages');
	}

	Page.prototype.changePage = function(page, callback){
		var self = this;
		var request = new XMLHttpRequest();
		request.onreadystatechange = function(){
			if (request.readyState === 4 && (request.status == 200 || request.status == 0 )){
				self.element.innerHTML = request.responseText;
				setTimeout(function() {
					self.element.classList.add('pages--visibility');
				}, 10);
				if (callback){
					callback();
				}
			}
		};
		request.open('GET', page, true);
		request.send();
	}

	Page.prototype.pushPage = function(page, callback){
		var request = new XMLHttpRequest();
		var self = this;

		request.onreadystatechange = function(){
			if (request.readyState === 4 && (request.status == 200 || request.status == 0 )){

				/*var prevPages = document.getElementsByClassName('pages');
		        for (var i = 0; i < prevPages.length; i++){
		            prevPages[i].classList.add('hidden');
		        }*/

				var nextPage = document.createElement("div");
				nextPage.className = 'pages pages--slide-up';
				nextPage.innerHTML = request.responseText;
				document.body.appendChild(nextPage);

				setTimeout(function() {
					nextPage.classList.add('pages--slide-up-show');
				}, 50);

				if (self.currentPage){
					self.prevPage = self.currentPage;
				}
				self.currentPage = nextPage; 

				if (callback){
					callback();
				}

			}
		}

		request.open('GET', page, true);
		request.send();
	}

	Page.prototype.closeCurrentPage = function(){
		var self = this;

		self.currentPage.classList.remove('pages--slide-up-show');
		self.currentPage.addEventListener('webkitTransitionEnd', function(){
				if (self.currentPage){
					self.currentPage.remove();
				}
				self.currentPage = self.prevPage;
		});
			
		self.currentPage.addEventListener('transitionend', function(){
			if (self.currentPage){
				self.currentPage.remove();
			}
			self.currentPage = self.prevPage;
		});

	}

	return Page;

})();

module.exports = Page;
},{}],"/home/ubuntu/workspace/phonepack/src/js/notification.js":[function(require,module,exports){
var utils = require('./utils');

var Notification = (function(){

	var instance = null;

	function Notification(text, options){

		if (instance){
			instance.hide();
		}

		var self = this;

		var _options = {
			type: 'simple',
			time: 3000
		}

		this.options = utils.extend({}, _options, options);

		self.notification = document.createElement('div');
		self.notification.className = 'notification';

		self.notification.addEventListener('click', function(){
			self.hide();
		}, false);

		if (self.options.type !== 'simple'){
			var icon = document.createElement('i');
			icon.className = 'material-icons notification__icon';

			switch (self.options.type){
				case 'info': 
					icon.innerHTML = 'info_outline';
					icon.classList.add('color-blue');
					break;

				case 'success':
					icon.innerHTML = 'check';
					icon.classList.add('color-green');
					break;

				case 'warning':
					icon.innerHTML = 'warning';
					icon.classList.add('color-yellow');
					break;

				case 'error':
					icon.innerHTML = 'info';
					icon.classList.add('color-red');
					break;

				default:
					icon.innerHTML = 'info_outline';
					icon.classList.add('color-blue');
			}

			self.notification.appendChild(icon);		
			
		}

		var notification_content = document.createElement('div'); 
		notification_content.className = 'notification__content';
		notification_content.innerHTML = text;

		self.notification.appendChild(notification_content);
		
		setTimeout(function() {
			self.notification.classList.add('notification--is-shown');
		}, 0);

		instance = self;

		return self;
	}

	Notification.prototype.show = function(){
		var self = this;

		document.body.appendChild(self.notification);

		if (self.options.time > 0){
			setTimeout(function() {
				self.hide();
			}, self.options.time);
		}

		return self;
	}

	Notification.prototype.hide = function(){
		var self = this;

		self.notification.classList.remove('notification--is-shown');
		self.notification.addEventListener('webkitTransitionEnd', function(){
				self.notification.remove();
		});
			
		self.notification.addEventListener('transitionend', function(){
			self.notification.remove();
		});

		return self;
	}

	return Notification;

})();

module.exports = Notification;
},{"./utils":"/home/ubuntu/workspace/phonepack/src/js/utils.js"}],"/home/ubuntu/workspace/phonepack/src/js/pull-to-refresh.js":[function(require,module,exports){
var pullToRefresh = function(element){

	var top, // left position of moving box
		starty, // starting x coordinate of touch point
		dist = 0, // distance traveled by touch point
		touchobj = null; // Touch object holder

		this.element = element;

		this.element.addEventListener('touchstart', function(e){
			        touchobj = e.changedTouches[0] 
			        top = parseInt(content.style.top) 
			        starty = parseInt(touchobj.clientY)
			        e.preventDefault()
		    }, false);

		this.element.addEventListener('touchmove', function(e){
			        touchobj = e.changedTouches[0] 
			        var dist = parseInt(touchobj.clientY) - starty;      
					content.style.top =  top + dist + 'px';
			        e.preventDefault()
		    }, false);

		this.element.addEventListener('touchend', function(e){     
			content.style.top = 56 + 'px';
			        e.preventDefault()
		    }, false);
	}

	module.exports = pullToRefresh;
},{}],"/home/ubuntu/workspace/phonepack/src/js/slide-menu.js":[function(require,module,exports){
var utils = require('./utils');

var SlideMenu = (function(){ 

	function SlideMenu(element, params) {

		var options = {
			overlay: true
		}

		this.element = element;
		this.options = utils.extend({}, options, params);
	}

	var listenCLoseSlideMenu = function(element) {
		var self = this;
		element.addEventListener('click', function(){
			self.toggle();
		});
	}

	var removeListenCLoseSlideMenu = function(element){
		element.removeEventListener("click");
	}

	SlideMenu.prototype.toggle = function(){

		if (!this.element.classList.contains('visible')) {

			var overlay = document.createElement("div");
			if (this.options.overlay){
				overlay.className = 'overlay';
			} else {
				overlay.className = 'overlay transparent';
			}
			document.body.appendChild(overlay);
			listenCLoseSlideMenu.call(this, overlay);

			this.element.classList.add('visible');

			
		} else {
			this.element.classList.remove('visible');

			var overlays = document.getElementsByClassName("overlay");
			removeListenCLoseSlideMenu.call(this, overlays[0]);
			document.body.removeChild(overlays[0]);
		}

	}

	return SlideMenu;

})();

module.exports = SlideMenu;
},{"./utils":"/home/ubuntu/workspace/phonepack/src/js/utils.js"}],"/home/ubuntu/workspace/phonepack/src/js/utils.js":[function(require,module,exports){
module.exports = {

	extend: function(a, b){
		for(var i=1; i<arguments.length; i++)
        for(var key in arguments[i])
            if(arguments[i].hasOwnProperty(key))
                arguments[0][key] = arguments[i][key];
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

}
},{}]},{},["/home/ubuntu/workspace/phonepack/src/js/index.js"]);
