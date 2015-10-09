/**
 * phonepack - CSS & JS Mobile Framework
 * @version v0.0.3
 * @link 
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.phonepack = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsDom = require('../utils/dom');

var _utilsDom2 = _interopRequireDefault(_utilsDom);

var Buttons = (function () {

    (0, _utilsDom2['default'])('.ripple').on('click', addRippleEffect);
    (0, _utilsDom2['default'])('.button--ripple').on('click', addRippleEffect);

    function addRippleEffect(e, target) {

        var rect = target.getBoundingClientRect();
        var ripple = target.querySelector('.ripple-animation');

        if (!ripple) {
            ripple = document.createElement('span');
            ripple.className = 'ripple-animation';
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

},{"../utils/dom":13}],2:[function(require,module,exports){
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

},{"../utils/utils":14}],3:[function(require,module,exports){
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

},{"../utils/utils":14}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilsUtils = require('../utils/utils');

var _utilsUtils2 = _interopRequireDefault(_utilsUtils);

var InfiniteScroll = (function () {
    function InfiniteScroll(element, options, callback) {
        _classCallCheck(this, InfiniteScroll);

        var self = this;
        var _options = {
            distance: 0
        };

        self.options = _utilsUtils2['default'].extend({}, _options, options);
        self.isShown = false;

        self.loadEl = document.createElement('div');
        self.loadEl.className = 'infinite-scroll-loading';
        self.loadEl.innerHTML = '<div class="spinner--infinite-scroll"></div>';
        element.appendChild(self.loadEl);

        element.addEventListener('scroll', function (e) {

            if (element.scrollTop + element.offsetHeight >= element.scrollHeight - self.options.distance && !self.isShown) {
                self.loadEl.classList.add('is-shown');
                self.isShown = true;
                callback();
            }
        }, false);
    }

    _createClass(InfiniteScroll, [{
        key: 'hide',
        value: function hide() {
            this.loadEl.classList.remove('is-shown');
            this.isShown = false;
        }
    }]);

    return InfiniteScroll;
})();

exports['default'] = InfiniteScroll;
module.exports = exports['default'];

},{"../utils/utils":14}],5:[function(require,module,exports){
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

},{"../utils/utils":14}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilsUtils = require('../utils/utils');

var _utilsUtils2 = _interopRequireDefault(_utilsUtils);

var eventEmitter = {
	'beforePush': null,
	'afterPush': null
};

function renderPage(template, callback) {
	var self = this;

	self.element.appendChild(template);
	setTimeout(function () {
		template.classList.add('pages--slide-up-show');
		self.prevPage = self.currentPage;
		self.currentPage = template;

		if (eventEmitter.afterPush) eventEmitter.afterPush(template);

		if (callback) callback();
	}, 50);
}

var Navigation = (function () {
	function Navigation(element, options) {
		_classCallCheck(this, Navigation);

		var self = this;
		self.element = element;
		self.currentPage = null;
		self.prevPage = null;
		self._params = null;

		var _options = {
			page: null
		};

		self.options = _utilsUtils2['default'].extend({}, _options, options);

		if (self.options.page) {
			self.pushPage(self.options.page);
		}
	}

	_createClass(Navigation, [{
		key: 'on',
		value: function on(event, fn) {
			eventEmitter[event] = fn;
		}
	}, {
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
		value: function pushPage(page, params, callback) {
			var self = this;
			self.params = params;
			var request = new XMLHttpRequest();

			request.onreadystatechange = function () {
				if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {
					(function () {

						var temp = document.createElement("div");
						temp.innerHTML = request.responseText;

						var template = temp.querySelector('.pages');
						template.classList.add('pages--slide-up');
						if (eventEmitter.beforePush) {
							eventEmitter.beforePush(template, function () {
								renderPage.call(self, template, function () {
									if (callback) callback(template);
								});
							});
						} else {
							renderPage.call(self, template, function () {
								if (callback) callback(template);
							});
						}
					})();
				}
			};

			request.open('GET', page, true);
			request.send();
		}
	}, {
		key: 'closeCurrentPage',
		value: function closeCurrentPage() {
			var self = this;

			var removeDomPage = function removeDomPage() {
				self.currentPage.removeEventListener('webkitTransitionEnd', removeDomPage);
				self.currentPage.removeEventListener('transitionend', removeDomPage);

				if (self.currentPage) {
					self.currentPage.remove();
				}

				self.currentPage = self.prevPage;
			};

			self.currentPage.classList.remove('pages--slide-up-show');
			self.currentPage.addEventListener('webkitTransitionEnd', removeDomPage);
			self.currentPage.addEventListener('transitionend', removeDomPage);
		}
	}, {
		key: 'params',
		get: function get() {
			var params = this._params;
			this._params = null;
			return params;
		},
		set: function set(value) {
			this._params = value;
		}
	}]);

	return Navigation;
})();

exports['default'] = Navigation;
module.exports = exports['default'];

},{"../utils/utils":14}],7:[function(require,module,exports){
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

function _show(text) {
	var self = this;

	var notification_content = document.createElement('div');
	notification_content.className = 'notification__content';
	notification_content.innerHTML = text;

	self.notification.appendChild(notification_content);
	setTimeout(function () {
		self.notification.classList.add('notification--is-shown');
	}, 0);

	document.body.appendChild(self.notification);

	if (self.options.time > 0) {
		setTimeout(function () {
			self.hide();
		}, self.options.time);
	}

	return self;
}

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

		return self;
	}

	_createClass(Notification, [{
		key: 'simple',
		value: function simple(text) {
			_show.call(this, text);

			instance = this;
			return this;
		}
	}, {
		key: 'info',
		value: function info(text) {
			var icon = document.createElement('i');
			icon.className = 'notification__icon text-blue mdi mdi-information-outline ';
			this.notification.appendChild(icon);

			_show.call(this, text);

			instance = this;
			return this;
		}
	}, {
		key: 'success',
		value: function success(text) {
			var icon = document.createElement('i');
			icon.className = 'notification__icon text-green mdi mdi-check';
			this.notification.appendChild(icon);

			_show.call(this, text);

			instance = this;
			return this;
		}
	}, {
		key: 'warning',
		value: function warning(text) {
			var icon = document.createElement('i');
			icon.className = 'notification__icon text-yellow mdi mdi-alert';
			this.notification.appendChild(icon);

			_show.call(this, text);

			instance = this;
			return this;
		}
	}, {
		key: 'error',
		value: function error(text) {
			var icon = document.createElement('i');
			icon.className = 'notification__icon text-red mdi mdi-alert-circle';
			this.notification.appendChild(icon);

			_show.call(this, text);

			instance = this;
			return this;
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

},{"../utils/utils":14}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilsDom = require('../utils/dom');

var _utilsDom2 = _interopRequireDefault(_utilsDom);

var _utilsUtils = require('../utils/utils');

var _utilsUtils2 = _interopRequireDefault(_utilsUtils);

function setTransform(element, value) {
	element.style.webkitTransform = value;
	element.style.MozTransform = value;
	element.style.msTransform = value;
	element.style.OTransform = value;
	element.style.transform = value;
}

function setAnimation(element, value) {
	element.style.webkitAnimation = value;
	element.style.MozAnimation = value;
	element.style.msAnimation = value;
	element.style.OAnimation = value;
	element.style.animation = value;
}

function createLoading() {
	var self = this;

	self.loading = document.createElement('div');
	self.loading.style.position = 'absolute';
	self.loading.style.top = self.top;
	self.loading.zIndex = -1;

	if (self.options.type === 'snake') {
		self.loading.style.left = '47%';
		self.loading.className = 'snake--pull-to-refresh';
	} else if (self.options.type === 'material') {
		self.loading.className = 'material--pull-to-refresh';
		var child = document.createElement('div');
		child.className = 'bar';
		self.loading.appendChild(child);
	}

	self.element.parentNode.insertBefore(self.loading, self.element);
}

var pullToRefresh = (function () {
	function pullToRefresh(element, options, callback) {
		_classCallCheck(this, pullToRefresh);

		var self = this;
		var moveDistance = 0;
		var scale = 0;
		var _options = {
			type: 'snake'
		};

		self.loading = null;
		self.element = element;
		self.element.classList.add('pull-to-refresh');
		self.top = (0, _utilsDom2['default'])(element).style('padding-top');

		self.options = _utilsUtils2['default'].extend({}, _options, options);

		createLoading.call(self, self.type);

		(0, _utilsDom2['default'])(self.element).touch(function (evt, dir, phase, swipetype, distance) {

			if (dir === 'down' && self.element.scrollTop === 0) {
				if (!moveDistance) moveDistance = distance;

				if (self.options.type === 'snake') {
					setTransform(self.element, 'translateY(' + (distance - moveDistance) + 'px)');
					self.loading.classList.add('is-shown');
					setTransform(self.loading, 'rotate(' + distance * 2 + 'deg)');
				} else if (self.options.type === 'material') {
					self.loading.classList.remove('not-loading');
					self.loading.classList.remove('is-loading');

					scale = (distance / 200).toFixed(1);
					if (scale >= 1) scale = 1;
					setTransform(self.loading.firstChild, 'scale(' + scale + ')');
				}

				evt.preventDefault();
			}

			if (dir === 'down' && phase === 'end' && self.element.scrollTop === 0) {

				if (self.options.type === 'snake') {
					if (distance >= 50) {
						setTransform(self.element, 'translateY(50px)');
						setAnimation(self.loading, 'rotate 0.8s infinite linear');
						callback();
					} else {
						setTransform(self.element, 'translateY(0)');
						setAnimation(self.loading, null);
						self.loading.classList.remove('is-shown');
					}

					moveDistance = null;
				} else if (self.options.type === 'material') {
					if (scale >= 1) {
						self.loading.classList.remove('not-loading');
						self.loading.classList.add('is-loading');
						callback();
					} else {
						self.loading.classList.remove('is-loading');
						self.loading.classList.add('not-loading');
					}

					scale = 0;
				}
			}

			if (phase === 'cancel' && self.element.scrollTop === 0) {
				if (self.options.type === 'snake') {
					setTransform(self.element, 'translateY(0)');
					setAnimation(self.loading, null);
					self.loading.classList.remove('is-shown');
					moveDistance = null;
				} else if (self.options.type === 'material') {
					self.loading.classList.remove('is-loading');
					self.loading.classList.add('not-loading');
					scale = 0;
				}
			}
		});
	}

	_createClass(pullToRefresh, [{
		key: 'hide',
		value: function hide() {
			var self = this;

			if (self.options.type === 'snake') {
				self.element.style.transform = 'translateY(0)';
				self.loading.classList.remove('is-shown');
				self.loading.style.animation = null;
			} else if (self.options.type === 'material') {
				self.loading.classList.remove('is-loading');
				self.loading.classList.add('not-loading');
			}
		}
	}]);

	return pullToRefresh;
})();

exports['default'] = pullToRefresh;
module.exports = exports['default'];

},{"../utils/dom":13,"../utils/utils":14}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = shrinkHeader;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsDom = require('../utils/dom');

var _utilsDom2 = _interopRequireDefault(_utilsDom);

function shrinkHeader(element) {
    var _content = document.querySelectorAll('.content');
    var _lastScrollTop = 0;

    element.classList.add('header--shrink');

    [].forEach.call(_content, function (el) {
        el.addEventListener('scroll', handlerScroll);
    });

    function handlerScroll(e) {
        var _el = e.target;
        var _st = _el.scrollTop;
        var _top = (0, _utilsDom2['default'])(_el).style('padding-top').replace('px', '');

        if (_el.scrollTop >= _top) {
            if (_st > _lastScrollTop) {
                _el.classList.add('is-shrink');
                element.classList.add('header--shrink-hide');
            } else {
                element.classList.remove('header--shrink-hide');
                _el.classList.remove('is-shrink');
            }
        }
        _lastScrollTop = _st;
    }
}

module.exports = exports['default'];

},{"../utils/dom":13}],10:[function(require,module,exports){
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

},{"../utils/utils":14}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilsDom = require('../utils/dom');

var _utilsDom2 = _interopRequireDefault(_utilsDom);

var TabBar = function TabBar(element) {
    _classCallCheck(this, TabBar);

    var contentsEl = (0, _utilsDom2['default'])('.content');
    contentsEl.addClass('tab-hide').addClass('content--tab');

    var activeTab = element.querySelector('.active');
    if (activeTab) {
        var selectorContent = activeTab.getAttribute('ref');
        var content = (0, _utilsDom2['default'])(selectorContent).removeClass('tab-hide').addClass('tab-show');
    }

    (0, _utilsDom2['default'])('.tab-bar__item').on('click', function (e, target) {
        var element = target;
        var selectorContent = element.getAttribute('ref');
        var content = (0, _utilsDom2['default'])(selectorContent);
        contentsEl.removeClass('tab-show').addClass('tab-hide');
        content.removeClass('tab-hide').addClass('tab-show');

        (0, _utilsDom2['default'])('.tab-bar__item').removeClass('active');
        element.classList.add('active');
    });
};

exports['default'] = TabBar;
module.exports = exports['default'];

},{"../utils/dom":13}],12:[function(require,module,exports){
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

var _componentsTabBarJs = require('./components/tab-bar.js');

var _componentsTabBarJs2 = _interopRequireDefault(_componentsTabBarJs);

var _componentsInfiniteScrollJs = require('./components/infinite-scroll.js');

var _componentsInfiniteScrollJs2 = _interopRequireDefault(_componentsInfiniteScrollJs);

var _componentsShrinkHeaderJs = require('./components/shrink-header.js');

var _componentsShrinkHeaderJs2 = _interopRequireDefault(_componentsShrinkHeaderJs);

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
phonepack.TabBar = _componentsTabBarJs2['default'];
phonepack.InfiniteScroll = _componentsInfiniteScrollJs2['default'];
phonepack.shrinkHeader = _componentsShrinkHeaderJs2['default'];

phonepack.ready = function (callback) {
	document.addEventListener('DOMContentLoaded', function () {
		callback();
	});
};

module.exports = phonepack;

},{"./components/button":1,"./components/dialog":2,"./components/dropdown-menu":3,"./components/infinite-scroll.js":4,"./components/loading":5,"./components/navigation":6,"./components/notification":7,"./components/pull-to-refresh":8,"./components/shrink-header.js":9,"./components/side-menu":10,"./components/tab-bar.js":11,"./utils/dom":13}],13:[function(require,module,exports){
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
				var _elementTarget = _closest(element, ev.selector);
				if (_elementTarget) {
					ev.fn(e, _elementTarget);
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

	function isArray(value) {
		if (Object.prototype.toString.call(value) === '[object Array]') {
			return true;
		}

		return false;
	}

	var DOM = (function () {
		function DOM(selector) {
			_classCallCheck(this, DOM);

			if (typeof selector === 'object') {
				this.selector = selector.selector;
				this.elements = selector;
			} else {
				this.selector = selector;
				this.elements = document.querySelectorAll(selector);
			}

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
				return this;
			}
		}, {
			key: 'toggleClass',
			value: function toggleClass(className) {
				[].forEach.call(this.elements, function (el) {
					el.classList.toggle(className);
				});
				return this;
			}
		}, {
			key: 'removeClass',
			value: function removeClass(className) {
				[].forEach.call(this.elements, function (el) {
					el.classList.remove(className);
				});
				return this;
			}
		}, {
			key: 'hasClass',
			value: function hasClass(className) {
				return this.elements[0].classList.contains(className);
			}
		}, {
			key: 'append',
			value: function append(htmlContent) {
				[].forEach.call(this.elements, function (el) {
					return el.insertAdjacentHTML('beforeend', htmlContent);
				});
				return this;
			}
		}, {
			key: 'prepend',
			value: function prepend(htmlContent) {
				[].forEach.call(this.elements, function (el) {
					return el.insertAdjacentHTML('afterbegin', htmlContent);
				});
				return this;
			}
		}, {
			key: 'insertBefore',
			value: function insertBefore(htmlContent) {
				[].forEach.call(this.elements, function (el) {
					return el.insertAdjacentHTML('beforebegin', htmlContent);
				});
				return this;
			}
		}, {
			key: 'insertAfter',
			value: function insertAfter(htmlContent) {
				[].forEach.call(this.elements, function (el) {
					return el.insertAdjacentHTML('afterend', htmlContent);
				});
				return this;
			}
		}, {
			key: 'next',
			value: function next() {
				[].forEach.call(this.elements, function (el) {
					return el.nextElementSibling;
				});
				return this;
			}
		}, {
			key: 'setAttribute',
			value: function setAttribute(attrName) {
				[].forEach.call(this.elements, function (el) {
					el.setAttribute("disabled", "disabled");
				});
				return this;
			}
		}, {
			key: 'removeAttibute',
			value: function removeAttibute(attrName) {
				[].forEach.call(this.elements, function (el) {
					el.removeAttibute(attrName);
				});
				return this;
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
		}, {
			key: 'touch',
			value: function touch(callback) {
				if (isArray(this.elements)) {
					[].forEach.call(this.elements, function (el) {
						handlerTouch(el);
					});
				} else {
					handlerTouch(this.elements);
				}

				function handlerTouch(el) {
					var touchsurface = el,
					    dir,
					    swipeType,
					    startX,
					    startY,
					    distX,
					    distY,
					    dist,
					    threshold = 150,
					    //required min distance traveled to be considered swipe
					restraint = 100,
					    // maximum distance allowed at the same time in perpendicular direction
					allowedTime = 500,
					    // maximum time allowed to travel that distance
					elapsedTime,
					    startTime,
					    handletouch = callback || function (evt, dir, phase, swipetype, distance) {};

					touchsurface.addEventListener('touchstart', function (e) {
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

					touchsurface.addEventListener('touchmove', function (e) {
						var touchobj = e.changedTouches[0];
						distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
						distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
						if (Math.abs(distX) > Math.abs(distY)) {
							// if distance traveled horizontally is greater than vertically, consider this a horizontal movement
							dir = distX < 0 ? 'left' : 'right';
							handletouch(e, dir, 'move', swipeType, distX); // fire callback function with params dir="left|right", phase="move", swipetype="none" etc
						} else {
								// else consider this a vertical movement
								dir = distY < 0 ? 'up' : 'down';
								handletouch(e, dir, 'move', swipeType, distY); // fire callback function with params dir="up|down", phase="move", swipetype="none" etc
							}
						// e.preventDefault(); // prevent scrolling when inside DIV
					}, false);

					touchsurface.addEventListener('touchend', function (e) {
						var touchobj = e.changedTouches[0];
						elapsedTime = new Date().getTime() - startTime; // get time elapsed
						if (elapsedTime <= allowedTime) {
							// first condition for awipe met
							if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
								// 2nd condition for horizontal swipe met
								swipeType = dir; // set swipeType to either "left" or "right"
							} else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
									// 2nd condition for vertical swipe met
									swipeType = dir; // set swipeType to either "top" or "down"
								}
						}
						// Fire callback function with params dir="left|right|up|down", phase="end", swipetype=dir etc:
						handletouch(e, dir, 'end', swipeType, dir == 'left' || dir == 'right' ? distX : distY);
						//e.preventDefault();
					}, false);

					touchsurface.addEventListener('touchcancel', function (e) {
						var touchobj = e.changedTouches[0];
						dir = 'none';
						swipeType = 'none';
						handletouch(e, 'none', 'cancel', swipeType, 0); // fire callback function with params dir="none", phase="start", swipetype="none" etc
					}, false);

					touchsurface.addEventListener('touchleave', function (e) {
						var touchobj = e.changedTouches[0];
						dir = 'none';
						swipeType = 'none';
						handletouch(e, 'none', 'leave', swipeType, 0); // fire callback function with params dir="none", phase="start", swipetype="none" etc
					}, false);
				}
			}
		}, {
			key: 'style',
			value: function style(styleProp) {
				var el = this.elements[0] || this.elements;
				var value,
				    defaultView = (el.ownerDocument || document).defaultView;
				// W3C standard way:
				if (defaultView && defaultView.getComputedStyle) {
					// sanitize property name to css notation
					// (hypen separated words eg. font-Size)
					styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
					return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
				} else if (el.currentStyle) {
					// IE
					// sanitize property name to camelCase
					styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
						return letter.toUpperCase();
					});
					value = el.currentStyle[styleProp];
					// convert other units to pixels on IE
					if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
						return (function (value) {
							var oldLeft = el.style.left,
							    oldRsLeft = el.runtimeStyle.left;
							el.runtimeStyle.left = el.currentStyle.left;
							el.style.left = value || 0;
							value = el.style.pixelLeft + "px";
							el.style.left = oldLeft;
							el.runtimeStyle.left = oldRsLeft;
							return value;
						})(value);
					}
					return value;
				}
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

},{}],14:[function(require,module,exports){
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

},{}]},{},[12])(12)
});