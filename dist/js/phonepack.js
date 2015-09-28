(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.phonepack = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/ubuntu/workspace/phonepack/src/js/components/button.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsUtils = require('../utils/utils');

var _utilsUtils2 = _interopRequireDefault(_utilsUtils);

var _utilsDom = require('../utils/dom');

var _utilsDom2 = _interopRequireDefault(_utilsDom);

var Buttons = (function () {

    (0, _utilsDom2['default'])('button--ripple').click(addRippleEffect);
    (0, _utilsDom2['default'])('tab--ripple').click(addRippleEffect);

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

},{"../utils/dom":"/home/ubuntu/workspace/phonepack/src/js/utils/dom.js","../utils/utils":"/home/ubuntu/workspace/phonepack/src/js/utils/utils.js"}],"/home/ubuntu/workspace/phonepack/src/js/components/dialog.js":[function(require,module,exports){
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

var DropDownMenu = function DropDownMenu(element, elMenu) {
	_classCallCheck(this, DropDownMenu);

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
};

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

var phonepack = (function () {

	return {
		SideMenu: _componentsSideMenu2['default'],
		PullToRefresh: _componentsPullToRefresh2['default'],
		Navigation: _componentsNavigation2['default'],
		DropDownMenu: _componentsDropdownMenu2['default'],
		Dialog: _componentsDialog2['default'],
		Loading: _componentsLoading2['default'],
		Notification: _componentsNotification2['default']
	};
})();

module.exports = phonepack;

},{"./components/button":"/home/ubuntu/workspace/phonepack/src/js/components/button.js","./components/dialog":"/home/ubuntu/workspace/phonepack/src/js/components/dialog.js","./components/dropdown-menu":"/home/ubuntu/workspace/phonepack/src/js/components/dropdown-menu.js","./components/loading":"/home/ubuntu/workspace/phonepack/src/js/components/loading.js","./components/navigation":"/home/ubuntu/workspace/phonepack/src/js/components/navigation.js","./components/notification":"/home/ubuntu/workspace/phonepack/src/js/components/notification.js","./components/pull-to-refresh":"/home/ubuntu/workspace/phonepack/src/js/components/pull-to-refresh.js","./components/side-menu":"/home/ubuntu/workspace/phonepack/src/js/components/side-menu.js"}],"/home/ubuntu/workspace/phonepack/src/js/utils/dom.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DOM = (function () {

	var eventsListeners = [];

	document.addEventListener('click', handler, false);

	function handler(e) {
		var element = e.target;

		console.log(e);

		eventsListeners.forEach(function (ev) {
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

	var DOM = (function () {
		function DOM(element) {
			_classCallCheck(this, DOM);

			this.element = document.querySelectorAll(element);
			return this;
		}

		_createClass(DOM, [{
			key: 'on',
			value: function on(eventName, callback) {
				eventsListeners.push({
					eventName: eventName,
					element: this.getElement(),
					fn: callback
				});
			}
		}, {
			key: 'click',
			value: function click(callback) {
				eventsListeners.push({
					element: this.element,
					fn: callback
				});
			}
		}, {
			key: 'getElement',
			value: function getElement() {
				return this.element;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL3Bob25lcGFjay9zcmMvanMvY29tcG9uZW50cy9idXR0b24uanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL3Bob25lcGFjay9zcmMvanMvY29tcG9uZW50cy9kaWFsb2cuanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL3Bob25lcGFjay9zcmMvanMvY29tcG9uZW50cy9kcm9wZG93bi1tZW51LmpzIiwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9waG9uZXBhY2svc3JjL2pzL2NvbXBvbmVudHMvbG9hZGluZy5qcyIsIi9ob21lL3VidW50dS93b3Jrc3BhY2UvcGhvbmVwYWNrL3NyYy9qcy9jb21wb25lbnRzL25hdmlnYXRpb24uanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL3Bob25lcGFjay9zcmMvanMvY29tcG9uZW50cy9ub3RpZmljYXRpb24uanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL3Bob25lcGFjay9zcmMvanMvY29tcG9uZW50cy9wdWxsLXRvLXJlZnJlc2guanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL3Bob25lcGFjay9zcmMvanMvY29tcG9uZW50cy9zaWRlLW1lbnUuanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL3Bob25lcGFjay9zcmMvanMvaW5kZXguanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL3Bob25lcGFjay9zcmMvanMvdXRpbHMvZG9tLmpzIiwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9waG9uZXBhY2svc3JjL2pzL3V0aWxzL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7MEJDQWtCLGdCQUFnQjs7Ozt3QkFDcEIsY0FBYzs7OztBQUU1QixJQUFJLE9BQU8sR0FBRyxDQUFDLFlBQVc7O0FBRXRCLCtCQUFFLGdC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QUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7QUFDckMsV0FBTyxFQUFFLENBQUM7SUFDVjtHQUNGOztBQUVELFNBQU8sSUFBSSxDQUFDO0VBQ1o7O0NBRUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzL3V0aWxzJztcbmltcG9ydCAkIGZyb20gJy4uL3V0aWxzL2RvbSc7XG5cbnZhciBCdXR0b25zID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgJCgnYnV0dG9uLS1yaXBwbGUnKS5jbGljayhhZGRSaXBwbGVFZmZlY3QpO1xuICAgICQoJ3RhYi0tcmlwcGxlJykuY2xpY2soYWRkUmlwcGxlRWZmZWN0KTtcblxuXG4gICAgZnVuY3Rpb24gYWRkUmlwcGxlRWZmZWN0KGUpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuXG4gICAgICAgIHZhciByZWN0ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgcmlwcGxlID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tLXJpcHBsZV9fYW5pbWF0aW9uJyk7XG5cbiAgICAgICAgaWYgKCFyaXBwbGUpIHtcbiAgICAgICAgICAgIHJpcHBsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHJpcHBsZS5jbGFzc05hbWUgPSAnYnV0dG9uLS1yaXBwbGVfX2FuaW1hdGlvbic7XG4gICAgICAgICAgICByaXBwbGUuc3R5bGUuaGVpZ2h0ID0gcmlwcGxlLnN0eWxlLndpZHRoID0gTWF0aC5tYXgocmVjdC53aWR0aCAqIDIsIHJlY3QuaGVpZ2h0ICogMikgKyAncHgnO1xuICAgICAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKHJpcHBsZSk7XG4gICAgICAgIH1cblxuICAgICAgICByaXBwbGUuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICAgICAgICB2YXIgdG9wID0gZS5wYWdlWSAtIHJlY3QudG9wIC0gcmlwcGxlLm9mZnNldEhlaWdodCAvIDIgLSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcbiAgICAgICAgdmFyIGxlZnQgPSBlLnBhZ2VYIC0gcmVjdC5sZWZ0IC0gcmlwcGxlLm9mZnNldFdpZHRoIC8gMiAtIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdDtcbiAgICAgICAgcmlwcGxlLnN0eWxlLnRvcCA9IHRvcCArICdweCc7XG4gICAgICAgIHJpcHBsZS5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG4gICAgICAgIHJpcHBsZS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZsb2F0QnV0dG9uKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tLWZhYi1mbG9hdGluZycpO1xuICAgICAgICB2YXIgbGFzdFNjcm9sbFRvcCA9IDA7XG5cbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhpZGVTaG93T25TY3JvbGwpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGhpZGVTaG93T25TY3JvbGwoZSkge1xuICAgICAgICAgICAgdmFyIHN0ID0gdGhpcy5zY3JvbGxUb3A7XG4gICAgICAgICAgICBpZiAoc3QgPiBsYXN0U2Nyb2xsVG9wKSB7XG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdFNjcm9sbFRvcCA9IHN0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmxvYXRCdXR0b246IGZsb2F0QnV0dG9uXG4gICAgfTtcblxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uczsiLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xuXG5jbGFzcyBEaWFsb2cge1xuXG5cdGNvbnN0cnVjdG9yKHBhcmFtcykge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdHZhciBvcHRpb25zID0ge1xuXHRcdFx0dGl0bGU6IG51bGwsXG5cdFx0XHRjb250ZW50OiBudWxsLFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRvazogJ09LJyxcblx0XHRcdFx0Y2FuY2VsOiBudWxsXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHRoaXMub3B0aW9ucyA9IHV0aWxzLmV4dGVuZCh7fSwgb3B0aW9ucywgcGFyYW1zKTtcblxuXHRcdHNlbGYub3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0c2VsZi5vdmVybGF5LmNsYXNzTmFtZSA9ICdkaWFsb2ctZmlsdGVyJztcblxuXHRcdHNlbGYuZGlhbG9nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRzZWxmLmRpYWxvZy5jbGFzc05hbWUgPSAnZGlhbG9nJztcblxuXHRcdGlmIChzZWxmLm9wdGlvbnMudGl0bGUpIHtcblx0XHRcdHZhciB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHR0aXRsZS5jbGFzc05hbWUgPSAnZGlhbG9nX190aXRsZSc7XG5cdFx0XHR0aXRsZS5pbm5lckhUTUwgPSBzZWxmLm9wdGlvbnMudGl0bGU7XG5cdFx0XHRzZWxmLmRpYWxvZy5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cdFx0fVxuXG5cdFx0aWYgKHNlbGYub3B0aW9ucy5jb250ZW50KSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRjb250ZW50LmNsYXNzTmFtZSA9ICdkaWFsb2dfX2NvbnRlbnQnO1xuXHRcdFx0Y29udGVudC5pbm5lckhUTUwgPSBzZWxmLm9wdGlvbnMuY29udGVudDtcblx0XHRcdHNlbGYuZGlhbG9nLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuXHRcdH1cblxuXHRcdHZhciBhY3Rpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRhY3Rpb25zLmNsYXNzTmFtZSA9ICdkaWFsb2dfX2FjdGlvbnMnO1xuXG5cdFx0aWYgKHNlbGYub3B0aW9ucy5vcHRpb25zLmNhbmNlbCkge1xuXHRcdFx0c2VsZi5idG5DYW5jZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHRcdHNlbGYuYnRuQ2FuY2VsLmNsYXNzTmFtZSA9ICdidXR0b24gYnV0dG9uLS1mbGF0IGJ0bi0tcmlwcGxlIHRleHQtcmVkJztcblx0XHRcdHNlbGYuYnRuQ2FuY2VsLmlubmVySFRNTCA9IHNlbGYub3B0aW9ucy5vcHRpb25zLmNhbmNlbDtcblx0XHRcdGFjdGlvbnMuYXBwZW5kQ2hpbGQoc2VsZi5idG5DYW5jZWwpO1xuXHRcdH1cblxuXHRcdHNlbGYuYnRuT2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHRzZWxmLmJ0bk9rLmNsYXNzTmFtZSA9ICdidXR0b24gYnV0dG9uLS1mbGF0IGJ1dHRvbi0tcmlwcGxlIHRleHQtYmx1ZSc7XG5cdFx0c2VsZi5idG5Pay5pbm5lckhUTUwgPSBzZWxmLm9wdGlvbnMub3B0aW9ucy5vaztcblx0XHRhY3Rpb25zLmFwcGVuZENoaWxkKHNlbGYuYnRuT2spO1xuXG5cdFx0c2VsZi5kaWFsb2cuYXBwZW5kQ2hpbGQoYWN0aW9ucyk7XG5cblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNlbGYub3ZlcmxheSk7XG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWxmLmRpYWxvZyk7XG5cblx0XHRyZXR1cm4gc2VsZjtcblx0fVxuXG5cdHNob3coY29uZmlybUNhbGxiYWNrLCBjYW5jZWxDYWxsYmFjaykge1xuXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMub3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdkaWFsb2ctZmlsdGVyLS1pcy1zaG93bicpO1xuXHRcdFx0dGhpcy5kaWFsb2cuY2xhc3NMaXN0LmFkZCgnZGlhbG9nLS1pcy1zaG93bicpO1xuXHRcdH0uYmluZChzZWxmKSwgMCk7XG5cblx0XHRzZWxmLmJ0bk9rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRjb25maXJtQ2FsbGJhY2soKTtcblx0XHR9KTtcblxuXHRcdGlmIChzZWxmLmJ0bkNhbmNlbCkge1xuXHRcdFx0c2VsZi5idG5DYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y2FuY2VsQ2FsbGJhY2soKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHNlbGYub3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0c2VsZi5oaWRlKCk7XG5cdFx0fSwgZmFsc2UpO1xuXG5cdFx0cmV0dXJuIHNlbGY7XG5cblx0fVxuXG5cdGhpZGUoKSB7XG5cblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdFx0c2VsZi5vdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2RpYWxvZy1maWx0ZXItLWlzLXNob3duJyk7XG5cdFx0XHRzZWxmLmRpYWxvZy5jbGFzc0xpc3QucmVtb3ZlKCdkaWFsb2ctLWlzLXNob3duJyk7XG5cblxuXHRcdFx0c2VsZi5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5vdmVybGF5LnJlbW92ZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHNlbGYub3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYub3ZlcmxheS5yZW1vdmUoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRzZWxmLmRpYWxvZy5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYuZGlhbG9nLnJlbW92ZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHNlbGYuZGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5kaWFsb2cucmVtb3ZlKCk7XG5cdFx0XHR9KTtcblxuXHRcdH0uYmluZChzZWxmKSwgMCk7XG5cblx0XHRyZXR1cm4gc2VsZjtcblx0fVxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgRGlhbG9nOyIsImltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy91dGlscyc7XG5cbnZhciByZW1vdmVkID0gZmFsc2U7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHR2YXIgX3RhcmdldCA9IGUudGFyZ2V0O1xuXG5cdHJlbW92ZWQgPSBmYWxzZTtcblxuXHR2YXIgZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkcm9wZG93bi1tZW51Jyk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRpZiAoZWxlbWVudHNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCd2aXNpYmxlJykpIHtcblx0XHRcdGVsZW1lbnRzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3Zpc2libGUnKTtcblx0XHRcdHJlbW92ZWQgPSB0cnVlO1xuXHRcdH1cblx0fVxuXG59LCB0cnVlKTtcblxuY2xhc3MgRHJvcERvd25NZW51IHtcblxuXHRjb25zdHJ1Y3RvcihlbGVtZW50LCBlbE1lbnUpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRzZWxmLmVsZW1lbnQgPSBlbGVtZW50O1xuXHRcdHNlbGYuZWxNZW51ID0gZWxNZW51O1xuXG5cdFx0aWYgKHNlbGYuZWxNZW51LmNsYXNzTGlzdC5jb250YWlucygndmlzaWJsZScpKSB7XG5cdFx0XHRzZWxmLmVsTWVudS5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJyk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCFyZW1vdmVkKSB7XG5cdFx0XHR2YXIgdGFyZ2V0ID0gc2VsZi5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0XHRzZWxmLmVsTWVudS5zdHlsZS50b3AgPSB0YXJnZXQudG9wICsgJ3B4Jztcblx0XHRcdHNlbGYuZWxNZW51LnN0eWxlLmxlZnQgPSAoKHRhcmdldC5sZWZ0IC0gZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0KSAtIDE1MCkgKyAncHgnO1xuXHRcdFx0c2VsZi5lbE1lbnUuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xuXHRcdH1cblxuXHRcdHJlbW92ZWQgPSBmYWxzZTtcblxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERyb3BEb3duTWVudTsiLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xuXG5jbGFzcyBMb2FkaW5nIHtcblxuXHRjb25zdHJ1Y3RvcihwYXJhbXMpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHR2YXIgb3B0aW9ucyA9IHtcblx0XHRcdHRpdGxlOiBudWxsLFxuXHRcdFx0c3Bpbm5lcjogdHJ1ZVxuXHRcdH07XG5cblx0XHR0aGlzLm9wdGlvbnMgPSB1dGlscy5leHRlbmQoe30sIG9wdGlvbnMsIHBhcmFtcyk7XG5cblx0XHRzZWxmLm92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHNlbGYub3ZlcmxheS5jbGFzc05hbWUgPSAnbG9hZGluZy1maWx0ZXInO1xuXG5cdFx0c2VsZi5kaWFsb2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHNlbGYuZGlhbG9nLmNsYXNzTmFtZSA9ICdsb2FkaW5nJztcblxuXHRcdHZhciBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRtYWluLmNsYXNzTmFtZSA9ICdsb2FkaW5nX19tYWluJztcblxuXHRcdGlmICh0aGlzLm9wdGlvbnMuc3Bpbm5lcikge1xuXHRcdFx0dmFyIHNwaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0c3Bpbm5lci5jbGFzc05hbWUgPSAnbG9hZGluZ19fc3Bpbm5lcic7XG5cblx0XHRcdHZhciBzcCA9ICc8c3ZnIGNsYXNzPVwic3Bpbm5lclwiIHdpZHRoPVwiNjVweFwiIGhlaWdodD1cIjY1cHhcIiB2aWV3Qm94PVwiMCAwIDY2IDY2XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPicgK1xuXHRcdFx0XHQnIDxjaXJjbGUgY2xhc3M9XCJwYXRoXCIgZmlsbD1cIm5vbmVcIiBzdHJva2Utd2lkdGg9XCI2XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIGN4PVwiMzNcIiBjeT1cIjMzXCIgcj1cIjMwXCI+PC9jaXJjbGU+JyArXG5cdFx0XHRcdCc8L3N2Zz4nO1xuXHRcdFx0c3Bpbm5lci5pbm5lckhUTUwgPSBzcDtcblx0XHRcdG1haW4uYXBwZW5kQ2hpbGQoc3Bpbm5lcik7XG5cblx0XHR9XG5cblx0XHRpZiAoc2VsZi5vcHRpb25zLnRpdGxlKSB7XG5cdFx0XHR2YXIgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0dGl0bGUuY2xhc3NOYW1lID0gJ2xvYWRpbmdfX3RpdGxlJztcblx0XHRcdHRpdGxlLmlubmVySFRNTCA9IHNlbGYub3B0aW9ucy50aXRsZTtcblx0XHRcdG1haW4uYXBwZW5kQ2hpbGQodGl0bGUpO1xuXHRcdH1cblxuXHRcdHNlbGYuZGlhbG9nLmFwcGVuZENoaWxkKG1haW4pO1xuXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWxmLm92ZXJsYXkpO1xuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VsZi5kaWFsb2cpO1xuXG5cdFx0cmV0dXJuIHNlbGY7XG5cdH1cblxuXHRzaG93KGNvbmZpcm1DYWxsYmFjaywgY2FuY2VsQ2FsbGJhY2spIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0c2VsZi5vdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2xvYWRpbmctZmlsdGVyLS1pcy1zaG93bicpO1xuXHRcdFx0c2VsZi5kaWFsb2cuY2xhc3NMaXN0LmFkZCgnbG9hZGluZy0taXMtc2hvd24nKTtcblx0XHR9LCAwKTtcblxuXHRcdHJldHVybiBzZWxmO1xuXG5cdH1cblxuXHRoaWRlKCkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHRzZWxmLm92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGluZy1maWx0ZXItLWlzLXNob3duJyk7XG5cdFx0XHRzZWxmLmRpYWxvZy5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkaW5nLS1pcy1zaG93bicpO1xuXG5cblx0XHRcdHNlbGYub3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYub3ZlcmxheS5yZW1vdmUoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRzZWxmLm92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzZWxmLm92ZXJsYXkucmVtb3ZlKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0c2VsZi5kaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzZWxmLmRpYWxvZy5yZW1vdmUoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRzZWxmLmRpYWxvZy5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYuZGlhbG9nLnJlbW92ZSgpO1xuXHRcdFx0fSk7XG5cblx0XHR9LmJpbmQoc2VsZiksIDApO1xuXG5cdFx0cmV0dXJuIHNlbGY7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2FkaW5nOyIsImZ1bmN0aW9uIHJlbmRlclBhZ2UoZWxlbWVudCwgY2FsbGJhY2spIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwYWdlcy0tc2xpZGUtdXAtc2hvdycpO1xuXHRcdGlmIChzZWxmLmN1cnJlbnRQYWdlKSB7XG5cdFx0XHRzZWxmLnByZXZQYWdlID0gc2VsZi5jdXJyZW50UGFnZTtcblx0XHR9XG5cblx0XHRzZWxmLmN1cnJlbnRQYWdlID0gZWxlbWVudDtcblxuXHRcdGlmIChjYWxsYmFjaykge1xuXHRcdFx0Y2FsbGJhY2soKTtcblx0XHR9XG5cblx0fSwgNDApO1xufVxuXG5jbGFzcyBOYXZpZ2F0aW9uIHtcblxuXHRjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHNlbGYuZWxlbWVudCA9IGVsZW1lbnQ7XG5cdFx0c2VsZi5jdXJyZW50UGFnZSA9IG51bGw7XG5cdFx0c2VsZi5wcmV2UGFnZSA9IG51bGw7XG5cblx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BhZ2VzJyk7XG5cdH1cblxuXHRyZXBsYWNlUGFnZShwYWdlLCBjYWxsYmFjaykge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09PSA0ICYmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMjAwIHx8IHJlcXVlc3Quc3RhdHVzID09PSAwKSkge1xuXHRcdFx0XHRzZWxmLmVsZW1lbnQuaW5uZXJIVE1MID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0c2VsZi5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BhZ2VzLS12aXNpYmlsaXR5Jyk7XG5cdFx0XHRcdH0sIDEwKTtcblx0XHRcdFx0aWYgKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2soKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdFx0cmVxdWVzdC5vcGVuKCdHRVQnLCBwYWdlLCB0cnVlKTtcblx0XHRyZXF1ZXN0LnNlbmQoKTtcblx0fVxuXG5cdHB1c2hQYWdlKHBhZ2UsIGNiQWZ0ZXIsIGNhbGxiYWNrKSB7XG5cdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA9PT0gNCAmJiAocmVxdWVzdC5zdGF0dXMgPT09IDIwMCB8fCByZXF1ZXN0LnN0YXR1cyA9PT0gMCkpIHtcblxuXHRcdFx0XHR2YXIgbmV4dFBhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0XHRuZXh0UGFnZS5jbGFzc05hbWUgPSAncGFnZXMgcGFnZXMtLXNsaWRlLXVwJztcblx0XHRcdFx0bmV4dFBhZ2UuaW5uZXJIVE1MID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG5cblx0XHRcdFx0Ly8gc2VuZCBhIGNhbGxiYWNrIHdpdGggdGhlIGVsZW1lbnQgaHRtbCBjcmVhdGVkXG5cdFx0XHRcdGlmIChjYWxsYmFjaykge1xuXHRcdFx0XHRcdGNiQWZ0ZXIobmV4dFBhZ2UsIGZ1bmN0aW9uKGVsKSB7XG5cdFx0XHRcdFx0XHRyZW5kZXJQYWdlLmNhbGwoc2VsZiwgbmV4dFBhZ2UsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayhuZXh0UGFnZSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRyZW5kZXJQYWdlLmNhbGwoc2VsZiwgbmV4dFBhZ2UsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0Y2JBZnRlcigpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmVxdWVzdC5vcGVuKCdHRVQnLCBwYWdlLCB0cnVlKTtcblx0XHRyZXF1ZXN0LnNlbmQoKTtcblx0fVxuXG5cdGNsb3NlQ3VycmVudFBhZ2UoKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0c2VsZi5jdXJyZW50UGFnZS5jbGFzc0xpc3QucmVtb3ZlKCdwYWdlcy0tc2xpZGUtdXAtc2hvdycpO1xuXHRcdHNlbGYuY3VycmVudFBhZ2UuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKHNlbGYuY3VycmVudFBhZ2UpIHtcblx0XHRcdFx0c2VsZi5jdXJyZW50UGFnZS5yZW1vdmUoKTtcblx0XHRcdH1cblx0XHRcdHNlbGYuY3VycmVudFBhZ2UgPSBzZWxmLnByZXZQYWdlO1xuXHRcdH0pO1xuXG5cdFx0c2VsZi5jdXJyZW50UGFnZS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoc2VsZi5jdXJyZW50UGFnZSkge1xuXHRcdFx0XHRzZWxmLmN1cnJlbnRQYWdlLnJlbW92ZSgpO1xuXHRcdFx0fVxuXHRcdFx0c2VsZi5jdXJyZW50UGFnZSA9IHNlbGYucHJldlBhZ2U7XG5cdFx0fSk7XG5cblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE5hdmlnYXRpb247IiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzL3V0aWxzJztcblxudmFyIGluc3RhbmNlID0gbnVsbDtcblxuY2xhc3MgTm90aWZpY2F0aW9uIHtcblxuXHRjb25zdHJ1Y3Rvcih0ZXh0LCBvcHRpb25zKSB7XG5cblx0XHRpZiAoaW5zdGFuY2UpIHtcblx0XHRcdGluc3RhbmNlLmhpZGUoKTtcblx0XHR9XG5cblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHR2YXIgX29wdGlvbnMgPSB7XG5cdFx0XHR0eXBlOiAnc2ltcGxlJyxcblx0XHRcdHRpbWU6IDMwMDBcblx0XHR9O1xuXG5cdFx0dGhpcy5vcHRpb25zID0gdXRpbHMuZXh0ZW5kKHt9LCBfb3B0aW9ucywgb3B0aW9ucyk7XG5cblx0XHRzZWxmLm5vdGlmaWNhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdHNlbGYubm90aWZpY2F0aW9uLmNsYXNzTmFtZSA9ICdub3RpZmljYXRpb24nO1xuXG5cdFx0c2VsZi5ub3RpZmljYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdHNlbGYuaGlkZSgpO1xuXHRcdH0sIGZhbHNlKTtcblxuXHRcdGlmIChzZWxmLm9wdGlvbnMudHlwZSAhPT0gJ3NpbXBsZScpIHtcblx0XHRcdHZhciBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuXHRcdFx0aWNvbi5jbGFzc05hbWUgPSAnbWF0ZXJpYWwtaWNvbnMgbm90aWZpY2F0aW9uX19pY29uJztcblxuXHRcdFx0c3dpdGNoIChzZWxmLm9wdGlvbnMudHlwZSkge1xuXHRcdFx0XHRjYXNlICdpbmZvJzpcblx0XHRcdFx0XHRpY29uLmlubmVySFRNTCA9ICdpbmZvX291dGxpbmUnO1xuXHRcdFx0XHRcdGljb24uY2xhc3NMaXN0LmFkZCgndGV4dC1ibHVlJyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAnc3VjY2Vzcyc6XG5cdFx0XHRcdFx0aWNvbi5pbm5lckhUTUwgPSAnY2hlY2snO1xuXHRcdFx0XHRcdGljb24uY2xhc3NMaXN0LmFkZCgndGV4dC1ncmVlbicpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgJ3dhcm5pbmcnOlxuXHRcdFx0XHRcdGljb24uaW5uZXJIVE1MID0gJ3dhcm5pbmcnO1xuXHRcdFx0XHRcdGljb24uY2xhc3NMaXN0LmFkZCgndGV4dC15ZWxsb3cnKTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlICdlcnJvcic6XG5cdFx0XHRcdFx0aWNvbi5pbm5lckhUTUwgPSAnaW5mbyc7XG5cdFx0XHRcdFx0aWNvbi5jbGFzc0xpc3QuYWRkKCd0ZXh0LXJlZCcpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0aWNvbi5pbm5lckhUTUwgPSAnaW5mb19vdXRsaW5lJztcblx0XHRcdFx0XHRpY29uLmNsYXNzTGlzdC5hZGQoJ2NvbG9yLWJsdWUnKTtcblx0XHRcdH1cblxuXHRcdFx0c2VsZi5ub3RpZmljYXRpb24uYXBwZW5kQ2hpbGQoaWNvbik7XG5cblx0XHR9XG5cblx0XHR2YXIgbm90aWZpY2F0aW9uX2NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRub3RpZmljYXRpb25fY29udGVudC5jbGFzc05hbWUgPSAnbm90aWZpY2F0aW9uX19jb250ZW50Jztcblx0XHRub3RpZmljYXRpb25fY29udGVudC5pbm5lckhUTUwgPSB0ZXh0O1xuXG5cdFx0c2VsZi5ub3RpZmljYXRpb24uYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uX2NvbnRlbnQpO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdHNlbGYubm90aWZpY2F0aW9uLmNsYXNzTGlzdC5hZGQoJ25vdGlmaWNhdGlvbi0taXMtc2hvd24nKTtcblx0XHR9LCAwKTtcblxuXHRcdGluc3RhbmNlID0gc2VsZjtcblxuXHRcdHJldHVybiBzZWxmO1xuXHR9XG5cblx0c2hvdygpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNlbGYubm90aWZpY2F0aW9uKTtcblxuXHRcdGlmIChzZWxmLm9wdGlvbnMudGltZSA+IDApIHtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYuaGlkZSgpO1xuXHRcdFx0fSwgc2VsZi5vcHRpb25zLnRpbWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBzZWxmO1xuXHR9XG5cblx0aGlkZSgpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRzZWxmLm5vdGlmaWNhdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdub3RpZmljYXRpb24tLWlzLXNob3duJyk7XG5cdFx0c2VsZi5ub3RpZmljYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0c2VsZi5ub3RpZmljYXRpb24ucmVtb3ZlKCk7XG5cdFx0fSk7XG5cblx0XHRzZWxmLm5vdGlmaWNhdGlvbi5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRzZWxmLm5vdGlmaWNhdGlvbi5yZW1vdmUoKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBzZWxmO1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTm90aWZpY2F0aW9uOyIsInZhciBwdWxsVG9SZWZyZXNoID0gZnVuY3Rpb24oZWxlbWVudCkge1xuXG5cdHZhciB0b3AsIC8vIGxlZnQgcG9zaXRpb24gb2YgbW92aW5nIGJveFxuXHRcdHN0YXJ0eSwgLy8gc3RhcnRpbmcgeCBjb29yZGluYXRlIG9mIHRvdWNoIHBvaW50XG5cdFx0ZGlzdCA9IDAsIC8vIGRpc3RhbmNlIHRyYXZlbGVkIGJ5IHRvdWNoIHBvaW50XG5cdFx0dG91Y2hvYmosXG5cdFx0Y29udGVudCA9IG51bGw7IC8vIFRvdWNoIG9iamVjdCBob2xkZXJcblxuXHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG5cdHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xuXHRcdHRvdWNob2JqID0gZS5jaGFuZ2Vkb3VjaGVzWzBdO1xuXHRcdHRvcCA9IHBhcnNlSW50KGNvbnRlbnQuc3R5bGUudG9wKTtcblx0XHRzdGFydHkgPSBwYXJzZUludCh0b3VjaG9iai5jbGllbnRZKTtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdH0sIGZhbHNlKTtcblxuXHR0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24oZSkge1xuXHRcdHRvdWNob2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcblx0XHRkaXN0ID0gcGFyc2VJbnQodG91Y2hvYmouY2xpZW50WSkgLSBzdGFydHk7XG5cdFx0Y29udGVudC5zdHlsZS50b3AgPSB0b3AgKyBkaXN0ICsgJ3B4Jztcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdH0sIGZhbHNlKTtcblxuXHR0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jdGlvbihlKSB7XG5cdFx0Y29udGVudC5zdHlsZS50b3AgPSA1NiArICdweCc7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHR9LCBmYWxzZSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwdWxsVG9SZWZyZXNoOyIsImltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy91dGlscyc7XG5cbnZhciBsaXN0ZW5DTG9zZVNsaWRlTWVudSA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0c2VsZi50b2dnbGUoKTtcblx0fSk7XG59O1xuXG52YXIgcmVtb3ZlTGlzdGVuQ0xvc2VTbGlkZU1lbnUgPSBmdW5jdGlvbihlbGVtZW50KSB7XG5cdGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIpO1xufTtcblxuY2xhc3MgU2lkZU1lbnUge1xuXG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuXHRcdHZhciBfb3B0aW9ucyA9IHtcblx0XHRcdG92ZXJsYXk6IHRydWVcblx0XHR9O1xuXG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblx0XHR0aGlzLm9wdGlvbnMgPSB1dGlscy5leHRlbmQoe30sIF9vcHRpb25zLCBvcHRpb25zKTtcblx0fVxuXG5cdHRvZ2dsZSgpIHtcblxuXHRcdGlmICghdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygndmlzaWJsZScpKSB7XG5cblx0XHRcdHZhciBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMub3ZlcmxheSkge1xuXHRcdFx0XHRvdmVybGF5LmNsYXNzTmFtZSA9ICdvdmVybGF5Jztcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRvdmVybGF5LmNsYXNzTmFtZSA9ICdvdmVybGF5IHRyYW5zcGFyZW50Jztcblx0XHRcdH1cblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XG5cdFx0XHRsaXN0ZW5DTG9zZVNsaWRlTWVudS5jYWxsKHRoaXMsIG92ZXJsYXkpO1xuXG5cdFx0XHR0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xuXG5cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpO1xuXG5cdFx0XHR2YXIgb3ZlcmxheXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwib3ZlcmxheVwiKTtcblx0XHRcdHJlbW92ZUxpc3RlbkNMb3NlU2xpZGVNZW51LmNhbGwodGhpcywgb3ZlcmxheXNbMF0pO1xuXHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChvdmVybGF5c1swXSk7XG5cdFx0fVxuXG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTaWRlTWVudTsiLCJpbXBvcnQgU2lkZU1lbnUgZnJvbSAnLi9jb21wb25lbnRzL3NpZGUtbWVudSc7XG5pbXBvcnQgUHVsbFRvUmVmcmVzaCBmcm9tICcuL2NvbXBvbmVudHMvcHVsbC10by1yZWZyZXNoJztcbmltcG9ydCBCdXR0b25zIGZyb20gJy4vY29tcG9uZW50cy9idXR0b24nO1xuaW1wb3J0IERyb3BEb3duTWVudSBmcm9tICcuL2NvbXBvbmVudHMvZHJvcGRvd24tbWVudSc7XG5pbXBvcnQgTmF2aWdhdGlvbiBmcm9tICcuL2NvbXBvbmVudHMvbmF2aWdhdGlvbic7XG5pbXBvcnQgRGlhbG9nIGZyb20gJy4vY29tcG9uZW50cy9kaWFsb2cnO1xuaW1wb3J0IExvYWRpbmcgZnJvbSAnLi9jb21wb25lbnRzL2xvYWRpbmcnO1xuaW1wb3J0IE5vdGlmaWNhdGlvbiBmcm9tICcuL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uJztcblxudmFyIHBob25lcGFjayA9IChmdW5jdGlvbigpIHtcblxuXHRyZXR1cm4ge1xuXHRcdFNpZGVNZW51OiBTaWRlTWVudSxcblx0XHRQdWxsVG9SZWZyZXNoOiBQdWxsVG9SZWZyZXNoLFxuXHRcdE5hdmlnYXRpb246IE5hdmlnYXRpb24sXG5cdFx0RHJvcERvd25NZW51OiBEcm9wRG93bk1lbnUsXG5cdFx0RGlhbG9nOiBEaWFsb2csXG5cdFx0TG9hZGluZzogTG9hZGluZyxcblx0XHROb3RpZmljYXRpb246IE5vdGlmaWNhdGlvblxuXHR9O1xuXG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBob25lcGFjaztcbiIsInZhciBET00gPSAoZnVuY3Rpb24oKSB7XG5cblx0dmFyIGV2ZW50c0xpc3RlbmVycyA9IFtdO1xuXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlciwgZmFsc2UpO1xuXHRcblx0ZnVuY3Rpb24gaGFuZGxlcihlKSB7XG5cdFx0dmFyIGVsZW1lbnQgPSBlLnRhcmdldDtcblx0XHRcblx0XHRjb25zb2xlLmxvZyhlKTtcblxuXHRcdGV2ZW50c0xpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uKGV2KSB7XG5cdFx0XHQvL1RPRE9cblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNsb3VzZXN0Q2xhc3MoZWwsIGNsYXNzTmFtZSkge1xuXG5cdFx0aWYgKHZlcmlmeUNsYXNzKGVsLCBjbGFzc05hbWUpKSB7XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdmVyaWZ5Q2xhc3MoZWwpIHtcblx0XHRcdGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xuXHRcdFx0XHRyZXR1cm4gZWw7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0d2hpbGUgKGVsICYmIGVsLnBhcmVudE5vZGUpIHtcblx0XHRcdGVsID0gZWwucGFyZW50Tm9kZTtcblx0XHRcdGlmIChlbC5jbGFzc0xpc3QpIHtcblx0XHRcdFx0cmV0dXJuIHZlcmlmeUNsYXNzKGVsLCBjbGFzc05hbWUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0XG5cblx0Y2xhc3MgRE9NIHtcblxuXHRcdGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcblx0XHRcdHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHRvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG5cdFx0XHRldmVudHNMaXN0ZW5lcnMucHVzaCh7XG5cdFx0XHRcdGV2ZW50TmFtZTogZXZlbnROYW1lLFxuXHRcdFx0XHRlbGVtZW50OiB0aGlzLmdldEVsZW1lbnQoKSxcblx0XHRcdFx0Zm46IGNhbGxiYWNrXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRjbGljayhjYWxsYmFjaykge1xuXHRcdFx0ZXZlbnRzTGlzdGVuZXJzLnB1c2goe1xuXHRcdFx0XHRlbGVtZW50OiB0aGlzLmVsZW1lbnQsXG5cdFx0XHRcdGZuOiBjYWxsYmFja1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Z2V0RWxlbWVudCgpIHtcblx0XHRcdHJldHVybiB0aGlzLmVsZW1lbnQ7XG5cdFx0fVxuXG5cdH1cblxuXG5cdGZ1bmN0aW9uIGVsZW1lbnQoZWwpIHtcblx0XHRyZXR1cm4gbmV3IERPTShlbCk7XG5cdH1cblxuXHRyZXR1cm4gZWxlbWVudDtcblxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgRE9NOyIsImV4cG9ydCBkZWZhdWx0IHtcblxuXHRleHRlbmQ6IGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRmb3IgKGxldCBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Zm9yIChsZXQga2V5IGluIGFyZ3VtZW50c1tpXSkge1xuXHRcdFx0XHRpZiAoYXJndW1lbnRzW2ldLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRhcmd1bWVudHNbMF1ba2V5XSA9IGFyZ3VtZW50c1tpXVtrZXldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBhcmd1bWVudHNbMF07XG5cdH0sXG5cblx0Y2xvdXNlc3RDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuXG5cdFx0d2hpbGUgKGVsICYmIGVsLnBhcmVudE5vZGUpIHtcblx0XHRcdGVsID0gZWwucGFyZW50Tm9kZTtcblx0XHRcdGlmIChlbC5jbGFzc0xpc3QpXG5cdFx0XHRcdGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xuXHRcdFx0XHRcdHJldHVybiBlbDtcblx0XHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cbn07Il19
