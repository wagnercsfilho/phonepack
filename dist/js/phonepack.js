(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.phonepack = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/ubuntu/workspace/phonepack/src/js/components/button.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsDom = require('../utils/dom');

var _utilsDom2 = _interopRequireDefault(_utilsDom);

var Buttons = (function () {

    (0, _utilsDom2['default'])('.button--ripple').on('click', addRippleEffect);
    (0, _utilsDom2['default'])('.tab--ripple').on('click', addRippleEffect);

    function addRippleEffect(e) {
        var target = e.target;

        var rect = target.getBoundingClientRect();
        var ripple = target.querySelector('.button--ripple__animation');

        if (!ripple) {
            ripple = document.createElement('span');
            ripple.className = 'button--ripple__animation';
            ripple.style.height = ripple.style.width = Math.max(rect.width * 2, rect.height * 2) + 'px';
            target.appendChild(ripple);
        }

        ripple.classList.remove('show');
        var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
        var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
        ripple.style.top = top + 'px';
        ripple.style.left = left + 'px';
        ripple.classList.add('show');

        return false;
    }

    function floatButton(element) {
        var btn = document.querySelector('.button--fab-floating');
        var lastScrollTop = 0;

        element.addEventListener("scroll", hideShowOnScroll);

        function hideShowOnScroll(e) {
            var st = this.scrollTop;
            if (st > lastScrollTop) {
                btn.classList.add('hidden');
            } else {
                btn.classList.remove('hidden');
            }
            lastScrollTop = st;
        }
    }

    return {
        floatButton: floatButton
    };
})();

exports['default'] = Buttons;
module.exports = exports['default'];

},{"../utils/dom":"/home/ubuntu/workspace/phonepack/src/js/utils/dom.js"}],"/home/ubuntu/workspace/phonepack/src/js/components/dialog.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilsUtils = require('../utils/utils');

var _utilsUtils2 = _interopRequireDefault(_utilsUtils);

var Dialog = (function () {
	function Dialog(params) {
		_classCallCheck(this, Dialog);

		var self = this;

		var options = {
			title: null,
			content: null,
			options: {
				ok: 'OK',
				cancel: null
			}
		};

		this.options = _utilsUtils2['default'].extend({}, options, params);

		self.overlay = document.createElement("div");
		self.overlay.className = 'dialog-filter';

		self.dialog = document.createElement("div");
		self.dialog.className = 'dialog';

		if (self.options.title) {
			var title = document.createElement("div");
			title.className = 'dialog__title';
			title.innerHTML = self.options.title;
			self.dialog.appendChild(title);
		}

		if (self.options.content) {
			var content = document.createElement("div");
			content.className = 'dialog__content';
			content.innerHTML = self.options.content;
			self.dialog.appendChild(content);
		}

		var actions = document.createElement("div");
		actions.className = 'dialog__actions';

		if (self.options.options.cancel) {
			self.btnCancel = document.createElement('button');
			self.btnCancel.className = 'button button--flat btn--ripple text-red';
			self.btnCancel.innerHTML = self.options.options.cancel;
			actions.appendChild(self.btnCancel);
		}

		self.btnOk = document.createElement('button');
		self.btnOk.className = 'button button--flat button--ripple text-blue';
		self.btnOk.innerHTML = self.options.options.ok;
		actions.appendChild(self.btnOk);

		self.dialog.appendChild(actions);

		document.body.appendChild(self.overlay);
		document.body.appendChild(self.dialog);

		return self;
	}

	_createClass(Dialog, [{
		key: 'show',
		value: function show(confirmCallback, cancelCallback) {

			var self = this;

			setTimeout((function () {
				this.overlay.classList.add('dialog-filter--is-shown');
				this.dialog.classList.add('dialog--is-shown');
			}).bind(self), 0);

			self.btnOk.addEventListener('click', function () {
				confirmCallback();
			});

			if (self.btnCancel) {
				self.btnCancel.addEventListener('click', function () {
					cancelCallback();
				});
			}

			self.overlay.addEventListener('click', function () {
				self.hide();
			}, false);

			return self;
		}
	}, {
		key: 'hide',
		value: function hide() {

			var self = this;

			setTimeout((function () {
				var self = this;
				self.overlay.classList.remove('dialog-filter--is-shown');
				self.dialog.classList.remove('dialog--is-shown');

				self.overlay.addEventListener('webkitTransitionEnd', function () {
					self.overlay.remove();
				});

				self.overlay.addEventListener('transitionend', function () {
					self.overlay.remove();
				});

				self.dialog.addEventListener('webkitTransitionEnd', function () {
					self.dialog.remove();
				});

				self.dialog.addEventListener('transitionend', function () {
					self.dialog.remove();
				});
			}).bind(self), 0);

			return self;
		}
	}]);

	return Dialog;
})();

exports['default'] = Dialog;
module.exports = exports['default'];

},{"../utils/utils":"/home/ubuntu/workspace/phonepack/src/js/utils/utils.js"}],"/home/ubuntu/workspace/phonepack/src/js/components/dropdown-menu.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsUtils = require('../utils/utils');

var _utilsUtils2 = _interopRequireDefault(_utilsUtils);

var removed = false;

document.addEventListener('click', function (e) {
	var _target = e.target;

	removed = false;

	var elements = document.getElementsByClassName('dropdown-menu');
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].classList.contains('visible')) {
			elements[i].classList.remove('visible');
			removed = true;
		}
	}
}, true);

function DropDownMenu(element, elMenu) {
	var self = this;

	self.element = element;
	self.elMenu = elMenu;

	if (self.elMenu.classList.contains('visible')) {
		self.elMenu.classList.remove('visible');
	} else if (!removed) {
		var target = self.element.getBoundingClientRect();

		self.elMenu.style.top = target.top + 'px';
		self.elMenu.style.left = target.left - document.body.scrollLeft - 150 + 'px';
		self.elMenu.classList.add('visible');
	}

	removed = false;
}

exports['default'] = DropDownMenu;
module.exports = exports['default'];

},{"../utils/utils":"/home/ubuntu/workspace/phonepack/src/js/utils/utils.js"}],"/home/ubuntu/workspace/phonepack/src/js/components/loading.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilsUtils = require('../utils/utils');

var _utilsUtils2 = _interopRequireDefault(_utilsUtils);

var Loading = (function () {
	function Loading(params) {
		_classCallCheck(this, Loading);

		var self = this;

		var options = {
			title: null,
			spinner: true
		};

		this.options = _utilsUtils2['default'].extend({}, options, params);

		self.overlay = document.createElement("div");
		self.overlay.className = 'loading-filter';

		self.dialog = document.createElement("div");
		self.dialog.className = 'loading';

		var main = document.createElement("div");
		main.className = 'loading__main';

		if (this.options.spinner) {
			var spinner = document.createElement("div");
			spinner.className = 'loading__spinner';

			var sp = '<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' + ' <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>' + '</svg>';
			spinner.innerHTML = sp;
			main.appendChild(spinner);
		}

		if (self.options.title) {
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

	_createClass(Loading, [{
		key: 'show',
		value: function show(confirmCallback, cancelCallback) {
			var self = this;

			setTimeout(function () {
				self.overlay.classList.add('loading-filter--is-shown');
				self.dialog.classList.add('loading--is-shown');
			}, 0);

			return self;
		}
	}, {
		key: 'hide',
		value: function hide() {
			var self = this;

			setTimeout((function () {
				var self = this;
				self.overlay.classList.remove('loading-filter--is-shown');
				self.dialog.classList.remove('loading--is-shown');

				self.overlay.addEventListener('webkitTransitionEnd', function () {
					self.overlay.remove();
				});

				self.overlay.addEventListener('transitionend', function () {
					self.overlay.remove();
				});

				self.dialog.addEventListener('webkitTransitionEnd', function () {
					self.dialog.remove();
				});

				self.dialog.addEventListener('transitionend', function () {
					self.dialog.remove();
				});
			}).bind(self), 0);

			return self;
		}
	}]);

	return Loading;
})();

exports['default'] = Loading;
module.exports = exports['default'];

},{"../utils/utils":"/home/ubuntu/workspace/phonepack/src/js/utils/utils.js"}],"/home/ubuntu/workspace/phonepack/src/js/components/navigation.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function renderPage(element, callback) {
	var self = this;

	document.body.appendChild(element);
	setTimeout(function () {
		element.classList.add('pages--slide-up-show');
		if (self.currentPage) {
			self.prevPage = self.currentPage;
		}

		self.currentPage = element;

		if (callback) {
			callback();
		}
	}, 40);
}

var Navigation = (function () {
	function Navigation(element) {
		_classCallCheck(this, Navigation);

		var self = this;
		self.element = element;
		self.currentPage = null;
		self.prevPage = null;

		element.classList.add('pages');
	}

	_createClass(Navigation, [{
		key: 'replacePage',
		value: function replacePage(page, callback) {
			var self = this;
			var request = new XMLHttpRequest();
			request.onreadystatechange = function () {
				if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {
					self.element.innerHTML = request.responseText;
					setTimeout(function () {
						self.element.classList.add('pages--visibility');
					}, 10);
					if (callback) {
						callback();
					}
				}
			};
			request.open('GET', page, true);
			request.send();
		}
	}, {
		key: 'pushPage',
		value: function pushPage(page, cbAfter, callback) {
			var request = new XMLHttpRequest();
			var self = this;

			request.onreadystatechange = function () {
				if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {

					var nextPage = document.createElement("div");
					nextPage.className = 'pages pages--slide-up';
					nextPage.innerHTML = request.responseText;

					// send a callback with the element html created
					if (callback) {
						cbAfter(nextPage, function (el) {
							renderPage.call(self, nextPage, function () {
								callback(nextPage);
							});
						});
					} else {
						renderPage.call(self, nextPage, function () {
							cbAfter();
						});
					}
				}
			};

			request.open('GET', page, true);
			request.send();
		}
	}, {
		key: 'closeCurrentPage',
		value: function closeCurrentPage() {
			var self = this;

			self.currentPage.classList.remove('pages--slide-up-show');
			self.currentPage.addEventListener('webkitTransitionEnd', function () {
				if (self.currentPage) {
					self.currentPage.remove();
				}
				self.currentPage = self.prevPage;
			});

			self.currentPage.addEventListener('transitionend', function () {
				if (self.currentPage) {
					self.currentPage.remove();
				}
				self.currentPage = self.prevPage;
			});
		}
	}]);

	return Navigation;
})();

exports['default'] = Navigation;
module.exports = exports['default'];

},{}],"/home/ubuntu/workspace/phonepack/src/js/components/notification.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilsUtils = require('../utils/utils');

var _utilsUtils2 = _interopRequireDefault(_utilsUtils);

var instance = null;

var Notification = (function () {
	function Notification(text, options) {
		_classCallCheck(this, Notification);

		if (instance) {
			instance.hide();
		}

		var self = this;

		var _options = {
			type: 'simple',
			time: 3000
		};

		this.options = _utilsUtils2['default'].extend({}, _options, options);

		self.notification = document.createElement('div');
		self.notification.className = 'notification';

		self.notification.addEventListener('click', function () {
			self.hide();
		}, false);

		if (self.options.type !== 'simple') {
			var icon = document.createElement('i');
			icon.className = 'material-icons notification__icon';

			switch (self.options.type) {
				case 'info':
					icon.innerHTML = 'info_outline';
					icon.classList.add('text-blue');
					break;

				case 'success':
					icon.innerHTML = 'check';
					icon.classList.add('text-green');
					break;

				case 'warning':
					icon.innerHTML = 'warning';
					icon.classList.add('text-yellow');
					break;

				case 'error':
					icon.innerHTML = 'info';
					icon.classList.add('text-red');
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

		setTimeout(function () {
			self.notification.classList.add('notification--is-shown');
		}, 0);

		instance = self;

		return self;
	}

	_createClass(Notification, [{
		key: 'show',
		value: function show() {
			var self = this;

			document.body.appendChild(self.notification);

			if (self.options.time > 0) {
				setTimeout(function () {
					self.hide();
				}, self.options.time);
			}

			return self;
		}
	}, {
		key: 'hide',
		value: function hide() {
			var self = this;

			self.notification.classList.remove('notification--is-shown');
			self.notification.addEventListener('webkitTransitionEnd', function () {
				self.notification.remove();
			});

			self.notification.addEventListener('transitionend', function () {
				self.notification.remove();
			});

			return self;
		}
	}]);

	return Notification;
})();

exports['default'] = Notification;
module.exports = exports['default'];

},{"../utils/utils":"/home/ubuntu/workspace/phonepack/src/js/utils/utils.js"}],"/home/ubuntu/workspace/phonepack/src/js/components/pull-to-refresh.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var pullToRefresh = function pullToRefresh(element) {

	var top,
	    // left position of moving box
	starty,
	    // starting x coordinate of touch point
	dist = 0,
	    // distance traveled by touch point
	touchobj,
	    content = null; // Touch object holder

	this.element = element;

	this.element.addEventListener('touchstart', function (e) {
		touchobj = e.changedouches[0];
		top = parseInt(content.style.top);
		starty = parseInt(touchobj.clientY);
		e.preventDefault();
	}, false);

	this.element.addEventListener('touchmove', function (e) {
		touchobj = e.changedTouches[0];
		dist = parseInt(touchobj.clientY) - starty;
		content.style.top = top + dist + 'px';
		e.preventDefault();
	}, false);

	this.element.addEventListener('touchend', function (e) {
		content.style.top = 56 + 'px';
		e.preventDefault();
	}, false);
};

exports['default'] = pullToRefresh;
module.exports = exports['default'];

},{}],"/home/ubuntu/workspace/phonepack/src/js/components/side-menu.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilsUtils = require('../utils/utils');

var _utilsUtils2 = _interopRequireDefault(_utilsUtils);

var listenCLoseSlideMenu = function listenCLoseSlideMenu(element) {
	var self = this;
	element.addEventListener('click', function () {
		self.toggle();
	});
};

var removeListenCLoseSlideMenu = function removeListenCLoseSlideMenu(element) {
	element.removeEventListener("click");
};

var SideMenu = (function () {
	function SideMenu(element, options) {
		_classCallCheck(this, SideMenu);

		var _options = {
			overlay: true
		};

		this.element = element;
		this.options = _utilsUtils2['default'].extend({}, _options, options);
	}

	_createClass(SideMenu, [{
		key: 'toggle',
		value: function toggle() {

			if (!this.element.classList.contains('visible')) {

				var overlay = document.createElement("div");
				if (this.options.overlay) {
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
	}]);

	return SideMenu;
})();

exports['default'] = SideMenu;
module.exports = exports['default'];

},{"../utils/utils":"/home/ubuntu/workspace/phonepack/src/js/utils/utils.js"}],"/home/ubuntu/workspace/phonepack/src/js/index.js":[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsDom = require('./utils/dom');

var _utilsDom2 = _interopRequireDefault(_utilsDom);

var _componentsSideMenu = require('./components/side-menu');

var _componentsSideMenu2 = _interopRequireDefault(_componentsSideMenu);

var _componentsPullToRefresh = require('./components/pull-to-refresh');

var _componentsPullToRefresh2 = _interopRequireDefault(_componentsPullToRefresh);

var _componentsButton = require('./components/button');

var _componentsButton2 = _interopRequireDefault(_componentsButton);

var _componentsDropdownMenu = require('./components/dropdown-menu');

var _componentsDropdownMenu2 = _interopRequireDefault(_componentsDropdownMenu);

var _componentsNavigation = require('./components/navigation');

var _componentsNavigation2 = _interopRequireDefault(_componentsNavigation);

var _componentsDialog = require('./components/dialog');

var _componentsDialog2 = _interopRequireDefault(_componentsDialog);

var _componentsLoading = require('./components/loading');

var _componentsLoading2 = _interopRequireDefault(_componentsLoading);

var _componentsNotification = require('./components/notification');

var _componentsNotification2 = _interopRequireDefault(_componentsNotification);

var phonepack = function phonepack(selector) {
	return (0, _utilsDom2['default'])(selector);
};

phonepack.SideMenu = _componentsSideMenu2['default'];
phonepack.PullToRefresh = _componentsPullToRefresh2['default'];
phonepack.Navigation = _componentsNavigation2['default'];
phonepack.DropDownMenu = _componentsDropdownMenu2['default'];
phonepack.Dialog = _componentsDialog2['default'];
phonepack.Loading = _componentsLoading2['default'];
phonepack.Notification = _componentsNotification2['default'];

phonepack.ready = function (callback) {
	document.addEventListener('DOMContentLoaded', function () {
		callback();
	});
};

module.exports = phonepack;

},{"./components/button":"/home/ubuntu/workspace/phonepack/src/js/components/button.js","./components/dialog":"/home/ubuntu/workspace/phonepack/src/js/components/dialog.js","./components/dropdown-menu":"/home/ubuntu/workspace/phonepack/src/js/components/dropdown-menu.js","./components/loading":"/home/ubuntu/workspace/phonepack/src/js/components/loading.js","./components/navigation":"/home/ubuntu/workspace/phonepack/src/js/components/navigation.js","./components/notification":"/home/ubuntu/workspace/phonepack/src/js/components/notification.js","./components/pull-to-refresh":"/home/ubuntu/workspace/phonepack/src/js/components/pull-to-refresh.js","./components/side-menu":"/home/ubuntu/workspace/phonepack/src/js/components/side-menu.js","./utils/dom":"/home/ubuntu/workspace/phonepack/src/js/utils/dom.js"}],"/home/ubuntu/workspace/phonepack/src/js/utils/dom.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DOM = (function () {

	Element.prototype.matches = Element.prototype.matches || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.webkitMatchesSelector;

	var eventsListeners = {};

	document.addEventListener('click', handler, false);
	document.addEventListener('dblclick', handler, false);
	document.addEventListener('touchend', handler, false);
	document.addEventListener('touchstart', handler, false);

	function handler(e) {
		var element = e.target;

		if (eventsListeners[e.type]) {
			eventsListeners[e.type].forEach(function (ev) {
				if (_closest(element, ev.selector)) {
					ev.fn(e);
				}
			});
		}
	}

	function _closest(el, selector) {

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

	var DOM = (function () {
		function DOM(selector) {
			_classCallCheck(this, DOM);

			this.selector = selector;
			this.elements = document.querySelectorAll(selector);

			return this;
		}

		_createClass(DOM, [{
			key: 'on',
			value: function on(eventName, callback) {
				var obj = {
					selector: this.selector,
					element: this.elements,
					fn: callback
				};

				if (!eventsListeners[eventName]) {
					eventsListeners[eventName] = [obj];
				} else {
					eventsListeners[eventName].push(obj);
				}
			}
		}, {
			key: 'click',
			value: function click(callback) {
				[].forEach.call(this.elements, function (el) {
					el.addEventListener('click', callback);
				});
			}
		}, {
			key: 'dblclick',
			value: function dblclick(callback) {
				[].forEach.call(this.elements, function (el) {
					el.addEventListener('dblclick', callback);
				});
			}
		}, {
			key: 'ontouchend',
			value: function ontouchend(callback) {
				[].forEach.call(this.elements, function (el) {
					el.addEventListener('touchend', callback);
				});
			}
		}, {
			key: 'ontouchstart',
			value: function ontouchstart(callback) {
				[].forEach.call(this.elements, function (el) {
					el.addEventListener('touchstart', callback);
				});
			}
		}, {
			key: 'addClass',
			value: function addClass(className) {
				[].forEach.call(this.elements, function (el) {
					el.classList.add(className);
				});
			}
		}, {
			key: 'toggleClass',
			value: function toggleClass(className) {
				[].forEach.call(this.elements, function (el) {
					el.classList.toggle(className);
				});
			}
		}, {
			key: 'removeClass',
			value: function removeClass(className) {
				[].forEach.call(this.elements, function (el) {
					el.classList.remove(className);
				});
			}
		}, {
			key: 'append',
			value: function append(htmlContent) {
				[].forEach.call(this.elements, function (el) {
					return el.insertAdjacentHTML('beforeend', htmlContent);
				});
			}
		}, {
			key: 'prepend',
			value: function prepend(htmlContent) {
				[].forEach.call(this.elements, function (el) {
					return el.insertAdjacentHTML('afterbegin', htmlContent);
				});
			}
		}, {
			key: 'insertBefore',
			value: function insertBefore(htmlContent) {
				[].forEach.call(this.elements, function (el) {
					return el.insertAdjacentHTML('beforebegin', htmlContent);
				});
			}
		}, {
			key: 'insertAfter',
			value: function insertAfter(htmlContent) {
				[].forEach.call(this.elements, function (el) {
					return el.insertAdjacentHTML('afterend', htmlContent);
				});
			}
		}, {
			key: 'next',
			value: function next() {
				[].forEach.call(this.elements, function (el) {
					return el.nextElementSibling;
				});
			}
		}, {
			key: 'setAttribute',
			value: function setAttribute(attrName) {
				[].forEach.call(this.elements, function (el) {
					el.setAttribute("disabled", "disabled");
				});
			}
		}, {
			key: 'removeAttibute',
			value: function removeAttibute(attrName) {
				[].forEach.call(this.elements, function (el) {
					el.removeAttibute(attrName);
				});
			}
		}, {
			key: 'getAttribute',
			value: function getAttribute(attrName) {
				return this.element[0].getAttribute(attrName);
			}
		}, {
			key: 'hasAttribute',
			value: function hasAttribute(attrName) {
				return this.element[0].hasAttribute(attrName);
			}
		}, {
			key: 'html',
			value: function html(content) {
				[].forEach.call(this.elements, function (el) {
					el.innerHTML = content;
				});
			}
		}, {
			key: 'outerHTML',
			value: function outerHTML() {
				return this.element[0].outerHTML;
			}
		}, {
			key: 'closest',
			value: function closest(selector) {
				return _closest(this.element[0], selector);
			}
		}]);

		return DOM;
	})();

	function element(el) {
		return new DOM(el);
	}

	return element;
})();

exports['default'] = DOM;
module.exports = exports['default'];

},{}],"/home/ubuntu/workspace/phonepack/src/js/utils/utils.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = {

	extend: function extend(a, b) {
		for (var i = 1; i < arguments.length; i++) {
			for (var key in arguments[i]) {
				if (arguments[i].hasOwnProperty(key)) {
					arguments[0][key] = arguments[i][key];
				}
			}
		}
		return arguments[0];
	},

	clousestClass: function clousestClass(el, className) {

		while (el && el.parentNode) {
			el = el.parentNode;
			if (el.classList) if (el.classList.contains(className)) {
				return el;
			}
		}

		return null;
	}

};
module.exports = exports["default"];

},{}]},{},["/home/ubuntu/workspace/phonepack/src/js/index.js"])("/home/ubuntu/workspace/phonepack/src/js/index.js")
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL3Bob25lcGFjay9zcmMvanMvY29tcG9uZW50cy9idXR0b24uanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL3Bob25lcGFjay9zcmMvanMvY29tcG9uZW50cy9kaWFsb2cuanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL3Bob25lcGFjay9zcmMvanMvY29tcG9uZW50cy9kcm9wZG93bi1tZW51LmpzIiwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9waG9uZXBhY2svc3JjL2pzL2NvbXBvbmVudHMvbG9hZGluZy5qcyIsIi9ob21lL3VidW50dS93b3Jrc3BhY2UvcGhvbmVwYWNrL3NyYy9qcy9jb21wb25lbnRzL25hdmlnYXRpb24uanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL3Bob25lcGFjay9zcmMvanMvY29tcG9uZW50cy9ub3RpZmljYXRpb24uanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL3Bob25lcGFjay9zcmMvanMvY29tcG9uZW50cy9wdWxsLXRvLXJlZnJlc2guanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL3Bob25lcGFjay9zcmMvanMvY29tcG9uZW50cy9zaWRlLW1lbnUuanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL3Bob25lcGFjay9zcmMvanMvaW5kZXguanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL3Bob25lcGFjay9zcmMvanMvdXRpbHMvZG9tLmpzIiwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9waG9uZXBhY2svc3JjL2pzL3V0aWxzL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7d0JDQWMsY0FBYzs7OztBQUU1QixJQUFJLE9BQU8sR0FBRyxDQUFDLFlBQVc7O0FBRXRCLCtCQUFFLGlCQUFpQixDQUFDLENBQUMsRUFB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RUFBRSxDQUFDO0lBQ1Y7R0FDRjs7QUFFRCxTQUFPLElBQUksQ0FBQztFQUNaOztDQUVEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCAkIGZyb20gJy4uL3V0aWxzL2RvbSc7XG5cbnZhciBCdXR0b25zID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgJCgnLmJ1dHRvbi0tcmlwcGxlJykub24oJ2NsaWNrJywgYWRkUmlwcGxlRWZmZWN0KTtcbiAgICAkKCcudGFiLS1yaXBwbGUnKS5vbignY2xpY2snLCBhZGRSaXBwbGVFZmZlY3QpO1xuXG5cbiAgICBmdW5jdGlvbiBhZGRSaXBwbGVFZmZlY3QoZSkge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG5cbiAgICAgICAgdmFyIHJlY3QgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciByaXBwbGUgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi0tcmlwcGxlX19hbmltYXRpb24nKTtcblxuICAgICAgICBpZiAoIXJpcHBsZSkge1xuICAgICAgICAgICAgcmlwcGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgcmlwcGxlLmNsYXNzTmFtZSA9ICdidXR0b24tLXJpcHBsZV9fYW5pbWF0aW9uJztcbiAgICAgICAgICAgIHJpcHBsZS5zdHlsZS5oZWlnaHQgPSByaXBwbGUuc3R5bGUud2lkdGggPSBNYXRoLm1heChyZWN0LndpZHRoICogMiwgcmVjdC5oZWlnaHQgKiAyKSArICdweCc7XG4gICAgICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQocmlwcGxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJpcHBsZS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gICAgICAgIHZhciB0b3AgPSBlLnBhZ2VZIC0gcmVjdC50b3AgLSByaXBwbGUub2Zmc2V0SGVpZ2h0IC8gMiAtIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgICAgICB2YXIgbGVmdCA9IGUucGFnZVggLSByZWN0LmxlZnQgLSByaXBwbGUub2Zmc2V0V2lkdGggLyAyIC0gZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0O1xuICAgICAgICByaXBwbGUuc3R5bGUudG9wID0gdG9wICsgJ3B4JztcbiAgICAgICAgcmlwcGxlLnN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcbiAgICAgICAgcmlwcGxlLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmxvYXRCdXR0b24oZWxlbWVudCkge1xuICAgICAgICB2YXIgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi0tZmFiLWZsb2F0aW5nJyk7XG4gICAgICAgIHZhciBsYXN0U2Nyb2xsVG9wID0gMDtcblxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGlkZVNob3dPblNjcm9sbCk7XG5cbiAgICAgICAgZnVuY3Rpb24gaGlkZVNob3dPblNjcm9sbChlKSB7XG4gICAgICAgICAgICB2YXIgc3QgPSB0aGlzLnNjcm9sbFRvcDtcbiAgICAgICAgICAgIGlmIChzdCA+IGxhc3RTY3JvbGxUb3ApIHtcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0U2Nyb2xsVG9wID0gc3Q7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmbG9hdEJ1dHRvbjogZmxvYXRCdXR0b25cbiAgICB9O1xuXG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25zOyIsImltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy91dGlscyc7XG5cbmNsYXNzIERpYWxvZyB7XG5cblx0Y29uc3RydWN0b3IocGFyYW1zKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0dmFyIG9wdGlvbnMgPSB7XG5cdFx0XHR0aXRsZTogbnVsbCxcblx0XHRcdGNvbnRlbnQ6IG51bGwsXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdG9rOiAnT0snLFxuXHRcdFx0XHRjYW5jZWw6IG51bGxcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dGhpcy5vcHRpb25zID0gdXRpbHMuZXh0ZW5kKHt9LCBvcHRpb25zLCBwYXJhbXMpO1xuXG5cdFx0c2VsZi5vdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRzZWxmLm92ZXJsYXkuY2xhc3NOYW1lID0gJ2RpYWxvZy1maWx0ZXInO1xuXG5cdFx0c2VsZi5kaWFsb2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHNlbGYuZGlhbG9nLmNsYXNzTmFtZSA9ICdkaWFsb2cnO1xuXG5cdFx0aWYgKHNlbGYub3B0aW9ucy50aXRsZSkge1xuXHRcdFx0dmFyIHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdHRpdGxlLmNsYXNzTmFtZSA9ICdkaWFsb2dfX3RpdGxlJztcblx0XHRcdHRpdGxlLmlubmVySFRNTCA9IHNlbGYub3B0aW9ucy50aXRsZTtcblx0XHRcdHNlbGYuZGlhbG9nLmFwcGVuZENoaWxkKHRpdGxlKTtcblx0XHR9XG5cblx0XHRpZiAoc2VsZi5vcHRpb25zLmNvbnRlbnQpIHtcblx0XHRcdHZhciBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdGNvbnRlbnQuY2xhc3NOYW1lID0gJ2RpYWxvZ19fY29udGVudCc7XG5cdFx0XHRjb250ZW50LmlubmVySFRNTCA9IHNlbGYub3B0aW9ucy5jb250ZW50O1xuXHRcdFx0c2VsZi5kaWFsb2cuYXBwZW5kQ2hpbGQoY29udGVudCk7XG5cdFx0fVxuXG5cdFx0dmFyIGFjdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGFjdGlvbnMuY2xhc3NOYW1lID0gJ2RpYWxvZ19fYWN0aW9ucyc7XG5cblx0XHRpZiAoc2VsZi5vcHRpb25zLm9wdGlvbnMuY2FuY2VsKSB7XG5cdFx0XHRzZWxmLmJ0bkNhbmNlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdFx0c2VsZi5idG5DYW5jZWwuY2xhc3NOYW1lID0gJ2J1dHRvbiBidXR0b24tLWZsYXQgYnRuLS1yaXBwbGUgdGV4dC1yZWQnO1xuXHRcdFx0c2VsZi5idG5DYW5jZWwuaW5uZXJIVE1MID0gc2VsZi5vcHRpb25zLm9wdGlvbnMuY2FuY2VsO1xuXHRcdFx0YWN0aW9ucy5hcHBlbmRDaGlsZChzZWxmLmJ0bkNhbmNlbCk7XG5cdFx0fVxuXG5cdFx0c2VsZi5idG5PayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdHNlbGYuYnRuT2suY2xhc3NOYW1lID0gJ2J1dHRvbiBidXR0b24tLWZsYXQgYnV0dG9uLS1yaXBwbGUgdGV4dC1ibHVlJztcblx0XHRzZWxmLmJ0bk9rLmlubmVySFRNTCA9IHNlbGYub3B0aW9ucy5vcHRpb25zLm9rO1xuXHRcdGFjdGlvbnMuYXBwZW5kQ2hpbGQoc2VsZi5idG5Payk7XG5cblx0XHRzZWxmLmRpYWxvZy5hcHBlbmRDaGlsZChhY3Rpb25zKTtcblxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VsZi5vdmVybGF5KTtcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNlbGYuZGlhbG9nKTtcblxuXHRcdHJldHVybiBzZWxmO1xuXHR9XG5cblx0c2hvdyhjb25maXJtQ2FsbGJhY2ssIGNhbmNlbENhbGxiYWNrKSB7XG5cblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5vdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2RpYWxvZy1maWx0ZXItLWlzLXNob3duJyk7XG5cdFx0XHR0aGlzLmRpYWxvZy5jbGFzc0xpc3QuYWRkKCdkaWFsb2ctLWlzLXNob3duJyk7XG5cdFx0fS5iaW5kKHNlbGYpLCAwKTtcblxuXHRcdHNlbGYuYnRuT2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdGNvbmZpcm1DYWxsYmFjaygpO1xuXHRcdH0pO1xuXG5cdFx0aWYgKHNlbGYuYnRuQ2FuY2VsKSB7XG5cdFx0XHRzZWxmLmJ0bkNhbmNlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjYW5jZWxDYWxsYmFjaygpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0c2VsZi5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRzZWxmLmhpZGUoKTtcblx0XHR9LCBmYWxzZSk7XG5cblx0XHRyZXR1cm4gc2VsZjtcblxuXHR9XG5cblx0aGlkZSgpIHtcblxuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHRzZWxmLm92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnZGlhbG9nLWZpbHRlci0taXMtc2hvd24nKTtcblx0XHRcdHNlbGYuZGlhbG9nLmNsYXNzTGlzdC5yZW1vdmUoJ2RpYWxvZy0taXMtc2hvd24nKTtcblxuXG5cdFx0XHRzZWxmLm92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzZWxmLm92ZXJsYXkucmVtb3ZlKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0c2VsZi5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5vdmVybGF5LnJlbW92ZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHNlbGYuZGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5kaWFsb2cucmVtb3ZlKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0c2VsZi5kaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzZWxmLmRpYWxvZy5yZW1vdmUoKTtcblx0XHRcdH0pO1xuXG5cdFx0fS5iaW5kKHNlbGYpLCAwKTtcblxuXHRcdHJldHVybiBzZWxmO1xuXHR9XG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBEaWFsb2c7IiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzL3V0aWxzJztcblxudmFyIHJlbW92ZWQgPSBmYWxzZTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdHZhciBfdGFyZ2V0ID0gZS50YXJnZXQ7XG5cblx0cmVtb3ZlZCA9IGZhbHNlO1xuXG5cdHZhciBlbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Ryb3Bkb3duLW1lbnUnKTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdGlmIChlbGVtZW50c1tpXS5jbGFzc0xpc3QuY29udGFpbnMoJ3Zpc2libGUnKSkge1xuXHRcdFx0ZWxlbWVudHNbaV0uY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpO1xuXHRcdFx0cmVtb3ZlZCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cbn0sIHRydWUpO1xuXG5mdW5jdGlvbiBEcm9wRG93bk1lbnUoZWxlbWVudCwgZWxNZW51KSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0c2VsZi5lbGVtZW50ID0gZWxlbWVudDtcblx0XHRzZWxmLmVsTWVudSA9IGVsTWVudTtcblxuXHRcdGlmIChzZWxmLmVsTWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ3Zpc2libGUnKSkge1xuXHRcdFx0c2VsZi5lbE1lbnUuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpO1xuXHRcdH1cblx0XHRlbHNlIGlmICghcmVtb3ZlZCkge1xuXHRcdFx0dmFyIHRhcmdldCA9IHNlbGYuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdFx0c2VsZi5lbE1lbnUuc3R5bGUudG9wID0gdGFyZ2V0LnRvcCArICdweCc7XG5cdFx0XHRzZWxmLmVsTWVudS5zdHlsZS5sZWZ0ID0gKCh0YXJnZXQubGVmdCAtIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCkgLSAxNTApICsgJ3B4Jztcblx0XHRcdHNlbGYuZWxNZW51LmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTtcblx0XHR9XG5cblx0XHRyZW1vdmVkID0gZmFsc2U7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJvcERvd25NZW51OyIsImltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy91dGlscyc7XG5cbmNsYXNzIExvYWRpbmcge1xuXG5cdGNvbnN0cnVjdG9yKHBhcmFtcykge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdHZhciBvcHRpb25zID0ge1xuXHRcdFx0dGl0bGU6IG51bGwsXG5cdFx0XHRzcGlubmVyOiB0cnVlXG5cdFx0fTtcblxuXHRcdHRoaXMub3B0aW9ucyA9IHV0aWxzLmV4dGVuZCh7fSwgb3B0aW9ucywgcGFyYW1zKTtcblxuXHRcdHNlbGYub3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0c2VsZi5vdmVybGF5LmNsYXNzTmFtZSA9ICdsb2FkaW5nLWZpbHRlcic7XG5cblx0XHRzZWxmLmRpYWxvZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0c2VsZi5kaWFsb2cuY2xhc3NOYW1lID0gJ2xvYWRpbmcnO1xuXG5cdFx0dmFyIG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdG1haW4uY2xhc3NOYW1lID0gJ2xvYWRpbmdfX21haW4nO1xuXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5zcGlubmVyKSB7XG5cdFx0XHR2YXIgc3Bpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRzcGlubmVyLmNsYXNzTmFtZSA9ICdsb2FkaW5nX19zcGlubmVyJztcblxuXHRcdFx0dmFyIHNwID0gJzxzdmcgY2xhc3M9XCJzcGlubmVyXCIgd2lkdGg9XCI2NXB4XCIgaGVpZ2h0PVwiNjVweFwiIHZpZXdCb3g9XCIwIDAgNjYgNjZcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+JyArXG5cdFx0XHRcdCcgPGNpcmNsZSBjbGFzcz1cInBhdGhcIiBmaWxsPVwibm9uZVwiIHN0cm9rZS13aWR0aD1cIjZcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgY3g9XCIzM1wiIGN5PVwiMzNcIiByPVwiMzBcIj48L2NpcmNsZT4nICtcblx0XHRcdFx0Jzwvc3ZnPic7XG5cdFx0XHRzcGlubmVyLmlubmVySFRNTCA9IHNwO1xuXHRcdFx0bWFpbi5hcHBlbmRDaGlsZChzcGlubmVyKTtcblxuXHRcdH1cblxuXHRcdGlmIChzZWxmLm9wdGlvbnMudGl0bGUpIHtcblx0XHRcdHZhciB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHR0aXRsZS5jbGFzc05hbWUgPSAnbG9hZGluZ19fdGl0bGUnO1xuXHRcdFx0dGl0bGUuaW5uZXJIVE1MID0gc2VsZi5vcHRpb25zLnRpdGxlO1xuXHRcdFx0bWFpbi5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cdFx0fVxuXG5cdFx0c2VsZi5kaWFsb2cuYXBwZW5kQ2hpbGQobWFpbik7XG5cblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNlbGYub3ZlcmxheSk7XG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWxmLmRpYWxvZyk7XG5cblx0XHRyZXR1cm4gc2VsZjtcblx0fVxuXG5cdHNob3coY29uZmlybUNhbGxiYWNrLCBjYW5jZWxDYWxsYmFjaykge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRzZWxmLm92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnbG9hZGluZy1maWx0ZXItLWlzLXNob3duJyk7XG5cdFx0XHRzZWxmLmRpYWxvZy5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nLS1pcy1zaG93bicpO1xuXHRcdH0sIDApO1xuXG5cdFx0cmV0dXJuIHNlbGY7XG5cblx0fVxuXG5cdGhpZGUoKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRcdHNlbGYub3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkaW5nLWZpbHRlci0taXMtc2hvd24nKTtcblx0XHRcdHNlbGYuZGlhbG9nLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRpbmctLWlzLXNob3duJyk7XG5cblxuXHRcdFx0c2VsZi5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5vdmVybGF5LnJlbW92ZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHNlbGYub3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYub3ZlcmxheS5yZW1vdmUoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRzZWxmLmRpYWxvZy5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYuZGlhbG9nLnJlbW92ZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHNlbGYuZGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5kaWFsb2cucmVtb3ZlKCk7XG5cdFx0XHR9KTtcblxuXHRcdH0uYmluZChzZWxmKSwgMCk7XG5cblx0XHRyZXR1cm4gc2VsZjtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IExvYWRpbmc7IiwiZnVuY3Rpb24gcmVuZGVyUGFnZShlbGVtZW50LCBjYWxsYmFjaykge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BhZ2VzLS1zbGlkZS11cC1zaG93Jyk7XG5cdFx0aWYgKHNlbGYuY3VycmVudFBhZ2UpIHtcblx0XHRcdHNlbGYucHJldlBhZ2UgPSBzZWxmLmN1cnJlbnRQYWdlO1xuXHRcdH1cblxuXHRcdHNlbGYuY3VycmVudFBhZ2UgPSBlbGVtZW50O1xuXG5cdFx0aWYgKGNhbGxiYWNrKSB7XG5cdFx0XHRjYWxsYmFjaygpO1xuXHRcdH1cblxuXHR9LCA0MCk7XG59XG5cbmNsYXNzIE5hdmlnYXRpb24ge1xuXG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0c2VsZi5lbGVtZW50ID0gZWxlbWVudDtcblx0XHRzZWxmLmN1cnJlbnRQYWdlID0gbnVsbDtcblx0XHRzZWxmLnByZXZQYWdlID0gbnVsbDtcblxuXHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGFnZXMnKTtcblx0fVxuXG5cdHJlcGxhY2VQYWdlKHBhZ2UsIGNhbGxiYWNrKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQgJiYgKHJlcXVlc3Quc3RhdHVzID09PSAyMDAgfHwgcmVxdWVzdC5zdGF0dXMgPT09IDApKSB7XG5cdFx0XHRcdHNlbGYuZWxlbWVudC5pbm5lckhUTUwgPSByZXF1ZXN0LnJlc3BvbnNlVGV4dDtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRzZWxmLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGFnZXMtLXZpc2liaWxpdHknKTtcblx0XHRcdFx0fSwgMTApO1xuXHRcdFx0XHRpZiAoY2FsbGJhY2spIHtcblx0XHRcdFx0XHRjYWxsYmFjaygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRyZXF1ZXN0Lm9wZW4oJ0dFVCcsIHBhZ2UsIHRydWUpO1xuXHRcdHJlcXVlc3Quc2VuZCgpO1xuXHR9XG5cblx0cHVzaFBhZ2UocGFnZSwgY2JBZnRlciwgY2FsbGJhY2spIHtcblx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09PSA0ICYmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMjAwIHx8IHJlcXVlc3Quc3RhdHVzID09PSAwKSkge1xuXG5cdFx0XHRcdHZhciBuZXh0UGFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRcdG5leHRQYWdlLmNsYXNzTmFtZSA9ICdwYWdlcyBwYWdlcy0tc2xpZGUtdXAnO1xuXHRcdFx0XHRuZXh0UGFnZS5pbm5lckhUTUwgPSByZXF1ZXN0LnJlc3BvbnNlVGV4dDtcblxuXHRcdFx0XHQvLyBzZW5kIGEgY2FsbGJhY2sgd2l0aCB0aGUgZWxlbWVudCBodG1sIGNyZWF0ZWRcblx0XHRcdFx0aWYgKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0Y2JBZnRlcihuZXh0UGFnZSwgZnVuY3Rpb24oZWwpIHtcblx0XHRcdFx0XHRcdHJlbmRlclBhZ2UuY2FsbChzZWxmLCBuZXh0UGFnZSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdGNhbGxiYWNrKG5leHRQYWdlKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHJlbmRlclBhZ2UuY2FsbChzZWxmLCBuZXh0UGFnZSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRjYkFmdGVyKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXF1ZXN0Lm9wZW4oJ0dFVCcsIHBhZ2UsIHRydWUpO1xuXHRcdHJlcXVlc3Quc2VuZCgpO1xuXHR9XG5cblx0Y2xvc2VDdXJyZW50UGFnZSgpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRzZWxmLmN1cnJlbnRQYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ3BhZ2VzLS1zbGlkZS11cC1zaG93Jyk7XG5cdFx0c2VsZi5jdXJyZW50UGFnZS5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoc2VsZi5jdXJyZW50UGFnZSkge1xuXHRcdFx0XHRzZWxmLmN1cnJlbnRQYWdlLnJlbW92ZSgpO1xuXHRcdFx0fVxuXHRcdFx0c2VsZi5jdXJyZW50UGFnZSA9IHNlbGYucHJldlBhZ2U7XG5cdFx0fSk7XG5cblx0XHRzZWxmLmN1cnJlbnRQYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpIHtcblx0XHRcdGlmIChzZWxmLmN1cnJlbnRQYWdlKSB7XG5cdFx0XHRcdHNlbGYuY3VycmVudFBhZ2UucmVtb3ZlKCk7XG5cdFx0XHR9XG5cdFx0XHRzZWxmLmN1cnJlbnRQYWdlID0gc2VsZi5wcmV2UGFnZTtcblx0XHR9KTtcblxuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTmF2aWdhdGlvbjsiLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xuXG52YXIgaW5zdGFuY2UgPSBudWxsO1xuXG5jbGFzcyBOb3RpZmljYXRpb24ge1xuXG5cdGNvbnN0cnVjdG9yKHRleHQsIG9wdGlvbnMpIHtcblxuXHRcdGlmIChpbnN0YW5jZSkge1xuXHRcdFx0aW5zdGFuY2UuaGlkZSgpO1xuXHRcdH1cblxuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdHZhciBfb3B0aW9ucyA9IHtcblx0XHRcdHR5cGU6ICdzaW1wbGUnLFxuXHRcdFx0dGltZTogMzAwMFxuXHRcdH07XG5cblx0XHR0aGlzLm9wdGlvbnMgPSB1dGlscy5leHRlbmQoe30sIF9vcHRpb25zLCBvcHRpb25zKTtcblxuXHRcdHNlbGYubm90aWZpY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0c2VsZi5ub3RpZmljYXRpb24uY2xhc3NOYW1lID0gJ25vdGlmaWNhdGlvbic7XG5cblx0XHRzZWxmLm5vdGlmaWNhdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0c2VsZi5oaWRlKCk7XG5cdFx0fSwgZmFsc2UpO1xuXG5cdFx0aWYgKHNlbGYub3B0aW9ucy50eXBlICE9PSAnc2ltcGxlJykge1xuXHRcdFx0dmFyIGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG5cdFx0XHRpY29uLmNsYXNzTmFtZSA9ICdtYXRlcmlhbC1pY29ucyBub3RpZmljYXRpb25fX2ljb24nO1xuXG5cdFx0XHRzd2l0Y2ggKHNlbGYub3B0aW9ucy50eXBlKSB7XG5cdFx0XHRcdGNhc2UgJ2luZm8nOlxuXHRcdFx0XHRcdGljb24uaW5uZXJIVE1MID0gJ2luZm9fb3V0bGluZSc7XG5cdFx0XHRcdFx0aWNvbi5jbGFzc0xpc3QuYWRkKCd0ZXh0LWJsdWUnKTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlICdzdWNjZXNzJzpcblx0XHRcdFx0XHRpY29uLmlubmVySFRNTCA9ICdjaGVjayc7XG5cdFx0XHRcdFx0aWNvbi5jbGFzc0xpc3QuYWRkKCd0ZXh0LWdyZWVuJyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAnd2FybmluZyc6XG5cdFx0XHRcdFx0aWNvbi5pbm5lckhUTUwgPSAnd2FybmluZyc7XG5cdFx0XHRcdFx0aWNvbi5jbGFzc0xpc3QuYWRkKCd0ZXh0LXllbGxvdycpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgJ2Vycm9yJzpcblx0XHRcdFx0XHRpY29uLmlubmVySFRNTCA9ICdpbmZvJztcblx0XHRcdFx0XHRpY29uLmNsYXNzTGlzdC5hZGQoJ3RleHQtcmVkJyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRpY29uLmlubmVySFRNTCA9ICdpbmZvX291dGxpbmUnO1xuXHRcdFx0XHRcdGljb24uY2xhc3NMaXN0LmFkZCgnY29sb3ItYmx1ZScpO1xuXHRcdFx0fVxuXG5cdFx0XHRzZWxmLm5vdGlmaWNhdGlvbi5hcHBlbmRDaGlsZChpY29uKTtcblxuXHRcdH1cblxuXHRcdHZhciBub3RpZmljYXRpb25fY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdG5vdGlmaWNhdGlvbl9jb250ZW50LmNsYXNzTmFtZSA9ICdub3RpZmljYXRpb25fX2NvbnRlbnQnO1xuXHRcdG5vdGlmaWNhdGlvbl9jb250ZW50LmlubmVySFRNTCA9IHRleHQ7XG5cblx0XHRzZWxmLm5vdGlmaWNhdGlvbi5hcHBlbmRDaGlsZChub3RpZmljYXRpb25fY29udGVudCk7XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0c2VsZi5ub3RpZmljYXRpb24uY2xhc3NMaXN0LmFkZCgnbm90aWZpY2F0aW9uLS1pcy1zaG93bicpO1xuXHRcdH0sIDApO1xuXG5cdFx0aW5zdGFuY2UgPSBzZWxmO1xuXG5cdFx0cmV0dXJuIHNlbGY7XG5cdH1cblxuXHRzaG93KCkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VsZi5ub3RpZmljYXRpb24pO1xuXG5cdFx0aWYgKHNlbGYub3B0aW9ucy50aW1lID4gMCkge1xuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5oaWRlKCk7XG5cdFx0XHR9LCBzZWxmLm9wdGlvbnMudGltZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHNlbGY7XG5cdH1cblxuXHRoaWRlKCkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdHNlbGYubm90aWZpY2F0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ25vdGlmaWNhdGlvbi0taXMtc2hvd24nKTtcblx0XHRzZWxmLm5vdGlmaWNhdGlvbi5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRzZWxmLm5vdGlmaWNhdGlvbi5yZW1vdmUoKTtcblx0XHR9KTtcblxuXHRcdHNlbGYubm90aWZpY2F0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpIHtcblx0XHRcdHNlbGYubm90aWZpY2F0aW9uLnJlbW92ZSgpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHNlbGY7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBOb3RpZmljYXRpb247IiwidmFyIHB1bGxUb1JlZnJlc2ggPSBmdW5jdGlvbihlbGVtZW50KSB7XG5cblx0dmFyIHRvcCwgLy8gbGVmdCBwb3NpdGlvbiBvZiBtb3ZpbmcgYm94XG5cdFx0c3RhcnR5LCAvLyBzdGFydGluZyB4IGNvb3JkaW5hdGUgb2YgdG91Y2ggcG9pbnRcblx0XHRkaXN0ID0gMCwgLy8gZGlzdGFuY2UgdHJhdmVsZWQgYnkgdG91Y2ggcG9pbnRcblx0XHR0b3VjaG9iaixcblx0XHRjb250ZW50ID0gbnVsbDsgLy8gVG91Y2ggb2JqZWN0IGhvbGRlclxuXG5cdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cblx0dGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XG5cdFx0dG91Y2hvYmogPSBlLmNoYW5nZWRvdWNoZXNbMF07XG5cdFx0dG9wID0gcGFyc2VJbnQoY29udGVudC5zdHlsZS50b3ApO1xuXHRcdHN0YXJ0eSA9IHBhcnNlSW50KHRvdWNob2JqLmNsaWVudFkpO1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0fSwgZmFsc2UpO1xuXG5cdHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKSB7XG5cdFx0dG91Y2hvYmogPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuXHRcdGRpc3QgPSBwYXJzZUludCh0b3VjaG9iai5jbGllbnRZKSAtIHN0YXJ0eTtcblx0XHRjb250ZW50LnN0eWxlLnRvcCA9IHRvcCArIGRpc3QgKyAncHgnO1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0fSwgZmFsc2UpO1xuXG5cdHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKGUpIHtcblx0XHRjb250ZW50LnN0eWxlLnRvcCA9IDU2ICsgJ3B4Jztcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdH0sIGZhbHNlKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHB1bGxUb1JlZnJlc2g7IiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzL3V0aWxzJztcblxudmFyIGxpc3RlbkNMb3NlU2xpZGVNZW51ID0gZnVuY3Rpb24oZWxlbWVudCkge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRzZWxmLnRvZ2dsZSgpO1xuXHR9KTtcbn07XG5cbnZhciByZW1vdmVMaXN0ZW5DTG9zZVNsaWRlTWVudSA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0ZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIik7XG59O1xuXG5jbGFzcyBTaWRlTWVudSB7XG5cblx0Y29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucykge1xuXG5cdFx0dmFyIF9vcHRpb25zID0ge1xuXHRcdFx0b3ZlcmxheTogdHJ1ZVxuXHRcdH07XG5cblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXHRcdHRoaXMub3B0aW9ucyA9IHV0aWxzLmV4dGVuZCh7fSwgX29wdGlvbnMsIG9wdGlvbnMpO1xuXHR9XG5cblx0dG9nZ2xlKCkge1xuXG5cdFx0aWYgKCF0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCd2aXNpYmxlJykpIHtcblxuXHRcdFx0dmFyIG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5vdmVybGF5KSB7XG5cdFx0XHRcdG92ZXJsYXkuY2xhc3NOYW1lID0gJ292ZXJsYXknO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdG92ZXJsYXkuY2xhc3NOYW1lID0gJ292ZXJsYXkgdHJhbnNwYXJlbnQnO1xuXHRcdFx0fVxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5KTtcblx0XHRcdGxpc3RlbkNMb3NlU2xpZGVNZW51LmNhbGwodGhpcywgb3ZlcmxheSk7XG5cblx0XHRcdHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XG5cblxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJyk7XG5cblx0XHRcdHZhciBvdmVybGF5cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJvdmVybGF5XCIpO1xuXHRcdFx0cmVtb3ZlTGlzdGVuQ0xvc2VTbGlkZU1lbnUuY2FsbCh0aGlzLCBvdmVybGF5c1swXSk7XG5cdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKG92ZXJsYXlzWzBdKTtcblx0XHR9XG5cblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNpZGVNZW51OyIsImltcG9ydCBET00gZnJvbSAnLi91dGlscy9kb20nO1xuaW1wb3J0IFNpZGVNZW51IGZyb20gJy4vY29tcG9uZW50cy9zaWRlLW1lbnUnO1xuaW1wb3J0IFB1bGxUb1JlZnJlc2ggZnJvbSAnLi9jb21wb25lbnRzL3B1bGwtdG8tcmVmcmVzaCc7XG5pbXBvcnQgQnV0dG9ucyBmcm9tICcuL2NvbXBvbmVudHMvYnV0dG9uJztcbmltcG9ydCBEcm9wRG93bk1lbnUgZnJvbSAnLi9jb21wb25lbnRzL2Ryb3Bkb3duLW1lbnUnO1xuaW1wb3J0IE5hdmlnYXRpb24gZnJvbSAnLi9jb21wb25lbnRzL25hdmlnYXRpb24nO1xuaW1wb3J0IERpYWxvZyBmcm9tICcuL2NvbXBvbmVudHMvZGlhbG9nJztcbmltcG9ydCBMb2FkaW5nIGZyb20gJy4vY29tcG9uZW50cy9sb2FkaW5nJztcbmltcG9ydCBOb3RpZmljYXRpb24gZnJvbSAnLi9jb21wb25lbnRzL25vdGlmaWNhdGlvbic7XG5cbnZhciBwaG9uZXBhY2sgPSBmdW5jdGlvbihzZWxlY3Rvcikge1xuXHRyZXR1cm4gRE9NKHNlbGVjdG9yKTtcbn07XG5cbnBob25lcGFjay5TaWRlTWVudSA9IFNpZGVNZW51O1xucGhvbmVwYWNrLlB1bGxUb1JlZnJlc2ggPSBQdWxsVG9SZWZyZXNoO1xucGhvbmVwYWNrLk5hdmlnYXRpb24gPSBOYXZpZ2F0aW9uO1xucGhvbmVwYWNrLkRyb3BEb3duTWVudSA9IERyb3BEb3duTWVudTtcbnBob25lcGFjay5EaWFsb2cgPSBEaWFsb2c7XG5waG9uZXBhY2suTG9hZGluZyA9IExvYWRpbmc7XG5waG9uZXBhY2suTm90aWZpY2F0aW9uID0gTm90aWZpY2F0aW9uO1xuXG5waG9uZXBhY2sucmVhZHkgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG5cdFx0Y2FsbGJhY2soKTtcblx0fSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBob25lcGFjaztcbiIsInZhciBET00gPSAoZnVuY3Rpb24oKSB7XG5cblx0RWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9IChFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzIHx8IEVsZW1lbnQucHJvdG90eXBlLm1vek1hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS5vTWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IpO1xuXG5cdHZhciBldmVudHNMaXN0ZW5lcnMgPSB7fTtcblxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIsIGZhbHNlKTtcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCBoYW5kbGVyLCBmYWxzZSk7XG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgaGFuZGxlciwgZmFsc2UpO1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgaGFuZGxlciwgZmFsc2UpO1xuXG5cblx0ZnVuY3Rpb24gaGFuZGxlcihlKSB7XG5cdFx0dmFyIGVsZW1lbnQgPSBlLnRhcmdldDtcblxuXHRcdGlmIChldmVudHNMaXN0ZW5lcnNbZS50eXBlXSkge1xuXHRcdFx0ZXZlbnRzTGlzdGVuZXJzW2UudHlwZV0uZm9yRWFjaChmdW5jdGlvbihldikge1xuXHRcdFx0XHRpZiAoY2xvc2VzdChlbGVtZW50LCBldi5zZWxlY3RvcikpIHtcblx0XHRcdFx0XHRldi5mbihlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gY2xvc2VzdChlbCwgc2VsZWN0b3IpIHtcblxuXHRcdGlmIChFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0KSB7XG5cdFx0XHRyZXR1cm4gZWwuY2xvc2VzdChzZWxlY3Rvcik7XG5cdFx0fVxuXG5cdFx0d2hpbGUgKGVsICYmIGVsLnBhcmVudE5vZGUpIHtcblx0XHRcdGlmIChlbC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuXHRcdFx0XHRyZXR1cm4gZWw7XG5cdFx0XHR9XG5cblx0XHRcdGVsID0gZWwucGFyZW50Tm9kZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGNsYXNzIERPTSB7XG5cblx0XHRjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xuXHRcdFx0dGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuXHRcdFx0dGhpcy5lbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHRvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgb2JqID0ge1xuXHRcdFx0XHRzZWxlY3RvcjogdGhpcy5zZWxlY3Rvcixcblx0XHRcdFx0ZWxlbWVudDogdGhpcy5lbGVtZW50cyxcblx0XHRcdFx0Zm46IGNhbGxiYWNrXG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAoIWV2ZW50c0xpc3RlbmVyc1tldmVudE5hbWVdKSB7XG5cdFx0XHRcdGV2ZW50c0xpc3RlbmVyc1tldmVudE5hbWVdID0gW29ial07XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0ZXZlbnRzTGlzdGVuZXJzW2V2ZW50TmFtZV0ucHVzaChvYmopO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNsaWNrKGNhbGxiYWNrKSB7XG5cdFx0XHRbXS5mb3JFYWNoLmNhbGwodGhpcy5lbGVtZW50cywgZnVuY3Rpb24oZWwpIHtcblx0XHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjYWxsYmFjayk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0XG5cdFx0ZGJsY2xpY2soY2FsbGJhY2spIHtcblx0XHRcdFtdLmZvckVhY2guY2FsbCh0aGlzLmVsZW1lbnRzLCBmdW5jdGlvbihlbCkge1xuXHRcdFx0XHRlbC5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIGNhbGxiYWNrKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRcblx0XHRvbnRvdWNoZW5kKGNhbGxiYWNrKSB7XG5cdFx0XHRbXS5mb3JFYWNoLmNhbGwodGhpcy5lbGVtZW50cywgZnVuY3Rpb24oZWwpIHtcblx0XHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBjYWxsYmFjayk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0XG5cdFx0b250b3VjaHN0YXJ0KGNhbGxiYWNrKSB7XG5cdFx0XHRbXS5mb3JFYWNoLmNhbGwodGhpcy5lbGVtZW50cywgZnVuY3Rpb24oZWwpIHtcblx0XHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGNhbGxiYWNrKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGFkZENsYXNzKGNsYXNzTmFtZSkge1xuXHRcdFx0W10uZm9yRWFjaC5jYWxsKHRoaXMuZWxlbWVudHMsIGZ1bmN0aW9uKGVsKSB7XG5cdFx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHRvZ2dsZUNsYXNzKGNsYXNzTmFtZSkge1xuXHRcdFx0W10uZm9yRWFjaC5jYWxsKHRoaXMuZWxlbWVudHMsIGZ1bmN0aW9uKGVsKSB7XG5cdFx0XHRcdGVsLmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuXHRcdFx0W10uZm9yRWFjaC5jYWxsKHRoaXMuZWxlbWVudHMsIGZ1bmN0aW9uKGVsKSB7XG5cdFx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGFwcGVuZChodG1sQ29udGVudCkge1xuXHRcdFx0W10uZm9yRWFjaC5jYWxsKHRoaXMuZWxlbWVudHMsIGZ1bmN0aW9uKGVsKSB7XG5cdFx0XHRcdHJldHVybiBlbC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGh0bWxDb250ZW50KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHByZXBlbmQoaHRtbENvbnRlbnQpIHtcblx0XHRcdFtdLmZvckVhY2guY2FsbCh0aGlzLmVsZW1lbnRzLCBmdW5jdGlvbihlbCkge1xuXHRcdFx0XHRyZXR1cm4gZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgaHRtbENvbnRlbnQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aW5zZXJ0QmVmb3JlKGh0bWxDb250ZW50KSB7XG5cdFx0XHRbXS5mb3JFYWNoLmNhbGwodGhpcy5lbGVtZW50cywgZnVuY3Rpb24oZWwpIHtcblx0XHRcdFx0cmV0dXJuIGVsLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlYmVnaW4nLCBodG1sQ29udGVudCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpbnNlcnRBZnRlcihodG1sQ29udGVudCkge1xuXHRcdFx0W10uZm9yRWFjaC5jYWxsKHRoaXMuZWxlbWVudHMsIGZ1bmN0aW9uKGVsKSB7XG5cdFx0XHRcdHJldHVybiBlbC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgaHRtbENvbnRlbnQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0bmV4dCgpIHtcblx0XHRcdFtdLmZvckVhY2guY2FsbCh0aGlzLmVsZW1lbnRzLCBmdW5jdGlvbihlbCkge1xuXHRcdFx0XHRyZXR1cm4gZWwubmV4dEVsZW1lbnRTaWJsaW5nO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0c2V0QXR0cmlidXRlKGF0dHJOYW1lKSB7XG5cdFx0XHRbXS5mb3JFYWNoLmNhbGwodGhpcy5lbGVtZW50cywgZnVuY3Rpb24oZWwpIHtcblx0XHRcdFx0ZWwuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJlbW92ZUF0dGlidXRlKGF0dHJOYW1lKSB7XG5cdFx0XHRbXS5mb3JFYWNoLmNhbGwodGhpcy5lbGVtZW50cywgZnVuY3Rpb24oZWwpIHtcblx0XHRcdFx0ZWwucmVtb3ZlQXR0aWJ1dGUoYXR0ck5hbWUpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Z2V0QXR0cmlidXRlKGF0dHJOYW1lKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lbGVtZW50WzBdLmdldEF0dHJpYnV0ZShhdHRyTmFtZSk7XG5cdFx0fVxuXG5cdFx0aGFzQXR0cmlidXRlKGF0dHJOYW1lKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lbGVtZW50WzBdLmhhc0F0dHJpYnV0ZShhdHRyTmFtZSk7XG5cdFx0fVxuXG5cdFx0aHRtbChjb250ZW50KSB7XG5cdFx0XHRbXS5mb3JFYWNoLmNhbGwodGhpcy5lbGVtZW50cywgZnVuY3Rpb24oZWwpIHtcblx0XHRcdFx0ZWwuaW5uZXJIVE1MID0gY29udGVudDtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdG91dGVySFRNTCgpIHtcblx0XHRcdHJldHVybiB0aGlzLmVsZW1lbnRbMF0ub3V0ZXJIVE1MO1xuXHRcdH1cblxuXHRcdGNsb3Nlc3Qoc2VsZWN0b3IpIHtcblx0XHRcdHJldHVybiBjbG9zZXN0KHRoaXMuZWxlbWVudFswXSwgc2VsZWN0b3IpO1xuXHRcdH1cblxuXHR9XG5cblx0ZnVuY3Rpb24gZWxlbWVudChlbCkge1xuXHRcdHJldHVybiBuZXcgRE9NKGVsKTtcblx0fVxuXG5cdHJldHVybiBlbGVtZW50O1xuXG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBET007IiwiZXhwb3J0IGRlZmF1bHQge1xuXG5cdGV4dGVuZDogZnVuY3Rpb24oYSwgYikge1xuXHRcdGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRmb3IgKGxldCBrZXkgaW4gYXJndW1lbnRzW2ldKSB7XG5cdFx0XHRcdGlmIChhcmd1bWVudHNbaV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdGFyZ3VtZW50c1swXVtrZXldID0gYXJndW1lbnRzW2ldW2tleV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGFyZ3VtZW50c1swXTtcblx0fSxcblxuXHRjbG91c2VzdENsYXNzOiBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG5cblx0XHR3aGlsZSAoZWwgJiYgZWwucGFyZW50Tm9kZSkge1xuXHRcdFx0ZWwgPSBlbC5wYXJlbnROb2RlO1xuXHRcdFx0aWYgKGVsLmNsYXNzTGlzdClcblx0XHRcdFx0aWYgKGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVsO1xuXHRcdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxufTsiXX0=
