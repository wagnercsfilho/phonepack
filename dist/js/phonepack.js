/**
 * phonepack - CSS & JS Mobile Framework
 * @version v0.1.9
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
        var ripple = target.querySelector('.ripple-animation:first-child');

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

},{"../utils/dom":14}],2:[function(require,module,exports){
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

},{"../utils/utils":15}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var removed = false;

document.addEventListener('click', function (e) {
	removed = false;

	var elements = document.getElementsByClassName('dropdown-menu');
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].classList.contains('dropdown-menu--is-shown')) {
			elements[i].classList.remove('dropdown-menu--is-shown');
			removed = true;
		}
	}
}, true);

function DropDownMenu(element, elMenu, position) {
	var self = this;

	self.element = element;
	self.elMenu = elMenu;
	self.position = position || 'left';

	self.element.addEventListener('click', function () {

		if (self.elMenu.classList.contains('dropdown-menu--is-shown')) {
			self.elMenu.classList.remove('dropdown-menu--is-shown');
		} else if (!removed) {
			var target = self.element.getBoundingClientRect();

			self.elMenu.style.top = target.top + 'px';
			if (self.position === 'left') {
				self.elMenu.style.left = target.left - document.body.scrollLeft - 150 + 'px';
			} else if (self.position === 'right') {
				self.elMenu.style.left = target.left - document.body.scrollLeft + 100 + 'px';
			}
			self.elMenu.classList.add('dropdown-menu--is-shown');
		}

		removed = false;
	}, false);
}

exports['default'] = DropDownMenu;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
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
        var lastScrollTop;

        self.options = _utilsUtils2['default'].extend({}, _options, options);
        self.isShown = false;

        self.loadEl = document.createElement('div');
        self.loadEl.className = 'infinite-scroll-loading';
        self.loadEl.innerHTML = '<div class="spinner--infinite-scroll"></div>';
        element.appendChild(self.loadEl);

        element.addEventListener('scroll', function (e) {

            var st = element.scrollTop;
            if (st > lastScrollTop) {
                if (element.scrollTop + element.offsetHeight >= element.scrollHeight - self.options.distance && !self.isShown) {
                    self.loadEl.classList.add('is-shown');
                    self.isShown = true;
                    callback();
                }
            }
            lastScrollTop = st;
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

},{"../utils/utils":15}],5:[function(require,module,exports){
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

		var that = this;

		var options = {
			title: null,
			spinner: true,
			overlay: true
		};

		this.options = _utilsUtils2['default'].extend({}, options, params);

		that.overlay = document.createElement("div");
		that.overlay.className = 'loading-filter';

		that.dialog = document.createElement("div");
		that.dialog.className = 'loading';

		var main = document.createElement("div");
		main.className = 'loading__main';

		if (this.options.spinner) {
			var spinner = document.createElement("div");
			spinner.className = 'loading__spinner';

			var sp = '<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' + ' <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>' + '</svg>';
			spinner.innerHTML = sp;
			main.appendChild(spinner);

			if (!that.options.title) {
				spinner.style.padding = 0;
			}
		}

		if (that.options.title) {
			var title = document.createElement("div");
			title.className = 'loading__title';
			title.innerHTML = that.options.title;
			main.appendChild(title);
		}

		that.dialog.appendChild(main);

		document.body.appendChild(that.overlay);
		document.body.appendChild(that.dialog);

		return that;
	}

	_createClass(Loading, [{
		key: 'show',
		value: function show(confirmCallback, cancelCallback) {
			var that = this;

			setTimeout(function () {
				if (that.options.overlay) {
					that.overlay.classList.add('loading-filter--is-shown');
				} else {
					that.dialog.classList.add('loading--no-box-shadow');
				}
				that.dialog.classList.add('loading--is-shown');
			}, 0);

			return that;
		}
	}, {
		key: 'hide',
		value: function hide() {
			var that = this;

			that.overlay.addEventListener('webkitTransitionEnd', function () {
				that.overlay.remove();
			});

			that.overlay.addEventListener('transitionend', function () {
				that.overlay.remove();
			});

			that.dialog.addEventListener('webkitTransitionEnd', function () {
				that.dialog.remove();
			});

			that.dialog.addEventListener('transitionend', function () {
				that.dialog.remove();
			});

			setTimeout(function () {

				if (that.options.overlay) {
					that.overlay.classList.remove('loading-filter--is-shown');
				} else {
					that.overlay.remove();
				}

				that.dialog.classList.remove('loading--is-shown');
			}, 0);

			return that;
		}
	}]);

	return Loading;
})();

exports['default'] = Loading;
module.exports = exports['default'];

},{"../utils/utils":15}],6:[function(require,module,exports){
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
	'afterPush': null,
	'beforeChange': null,
	'afterChange': null,
	'onClose': null
};

function _changePage(template, callback) {
	var that = this;
	that.element.appendChild(template);
	setTimeout(function () {
		if (that.currentPage) {
			that.prevPage = that.currentPage;
			that.currentPage.remove();
		}
		that.currentPage = template;

		if (eventEmitter.afterChange) eventEmitter.afterChange(template);

		if (callback) callback();
	}, 40);
}

function _pushPage(template, callback) {
	var that = this;

	that.element.appendChild(template);
	setTimeout(function () {
		template.classList.add(that.animation + '-show');
		that.prevPage = that.currentPage;
		that.currentPage = template;

		if (eventEmitter.afterPush) eventEmitter.afterPush(template);

		if (callback) callback();
	}, 40);
}

var Navigation = (function () {
	function Navigation(element, options, cb) {
		_classCallCheck(this, Navigation);

		var that = this;
		that.pages = {};
		that.element = element;
		that.currentPage = null;
		that.prevPage = null;
		that._params = null;

		var _options = {
			otherwise: null,
			pages: null
		};

		that.options = _utilsUtils2['default'].extend({}, _options, options);

		if (that.options.pages) {
			for (var c in that.options.pages) {
				that.pages[c] = that.options.pages[c];
			}
		}

		if (that.options.otherwise) {
			that.change(that.options.otherwise, {});
		}

		document.addEventListener('backbutton', function (e) {
			that.closeCurrentPage();
		}, false);
	}

	_createClass(Navigation, [{
		key: 'on',
		value: function on(event, fn) {
			eventEmitter[event] = fn;
		}
	}, {
		key: 'changePage',
		value: function changePage(page, params, callback, animation) {
			var that = this;
			that.params = params;

			if (typeof page == 'string') {
				var request = new XMLHttpRequest();
				request.onreadystatechange = function () {
					if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {

						var temp = document.createElement("div");
						temp.innerHTML = request.responseText;

						var template = temp.querySelector('.pages');
						render(template);
					}
				};
				request.open('GET', page, true);
				request.send();
			} else {
				render(page);
			}

			function render(template) {
				if (eventEmitter.beforeChange) {
					eventEmitter.beforeChange(template, function () {
						_changePage.call(that, template, function () {
							if (callback) callback.call(template);
						});
					});
				} else {
					_changePage.call(that, template, function () {
						if (callback) callback.call(template);
					});
				}
			}
		}
	}, {
		key: 'pushPage',
		value: function pushPage(page, params, callback, animation) {
			var that = this;
			that.params = params;
			that.animation = 'pages--normal';

			if (animation) {
				that.animation = animation;
			}

			if (typeof page == 'string') {
				var request = new XMLHttpRequest();
				request.onreadystatechange = function () {
					if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {
						var temp = document.createElement("div");
						temp.innerHTML = request.responseText;
						var template = temp.querySelector('.pages');
						render(template);
					}
				};

				request.open('GET', page, true);
				request.send();
			} else {
				render(page);
			}

			function render(template) {

				template.classList.add(that.animation);

				if (eventEmitter.beforePush) {
					eventEmitter.beforePush(template, function () {
						_pushPage.call(that, template, function () {
							if (callback) callback.call(template);
						});
					});
				} else {
					_pushPage.call(that, template, function () {
						if (callback) callback.call(template);
					});
				}
			}
		}
	}, {
		key: 'closeCurrentPage',
		value: function closeCurrentPage() {
			var that = this;

			var removeDomPage = function removeDomPage() {
				that.currentPage.removeEventListener('webkitTransitionEnd', removeDomPage);
				that.currentPage.removeEventListener('transitionend', removeDomPage);

				if (that.currentPage) {
					that.currentPage.remove();

					if (eventEmitter.onClose) {
						eventEmitter.onClose();
					}
				}

				that.currentPage = that.prevPage;
			};

			if (that.prevPage) {
				that.currentPage.classList.remove(that.animation + '-show');
				if (that.animation == 'pages--normal') {
					removeDomPage();
				} else {
					that.currentPage.addEventListener('webkitTransitionEnd', removeDomPage);
					that.currentPage.addEventListener('transitionend', removeDomPage);
				}
			} else {
				return;
			}
		}
	}, {
		key: 'insert',
		value: function insert(name, params, animation) {
			if (this.pages[name]) {
				if (this.pages[name].component) {
					this.pages[name].component(params, (function (element) {
						this.pushPage(element, params, null, animation);
					}).bind(this));
				} else {
					this.pushPage(this.pages[name].template, params, this.pages[name].controller, animation);
				}
			}
		}
	}, {
		key: 'change',
		value: function change(name, params, animation) {
			if (this.pages[name]) {
				if (this.pages[name].component) {
					this.pages[name].component(params, (function (element) {
						this.changePage(element, params, null, animation);
					}).bind(this));
				} else {
					this.changePage(this.pages[name].template, params, this.pages[name].controller, animation);
				}
			}
		}
	}, {
		key: 'params',
		get: function get() {
			var params = this._params;
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

},{"../utils/utils":15}],7:[function(require,module,exports){
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

},{"../utils/utils":15}],8:[function(require,module,exports){
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

var _libsHammer = require('../libs/hammer');

var _libsHammer2 = _interopRequireDefault(_libsHammer);

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
	var that = this;
	that.loading = document.createElement('div');
	that.loading.style.position = 'absolute';
	that.loading.style.top = parseInt(that.top.replace('px', '')) + 5 + 'px';
	that.loading.zIndex = -1;

	if (that.options.type === 'snake') {
		that.loading.style.left = '47%';
		that.loading.className = 'snake--pull-to-refresh';
	} else if (that.options.type === 'material') {
		that.loading.className = 'material--pull-to-refresh';
		var child = document.createElement('div');
		child.className = 'bar';
		that.loading.appendChild(child);
	}

	that.element.parentNode.insertBefore(that.loading, that.element);
}

var pullToRefresh = (function () {
	function pullToRefresh(element, options, callback) {
		_classCallCheck(this, pullToRefresh);

		var that = this,
		    moveDistance = 0,
		    scale = 0,
		    distY,
		    startY,
		    touchobj,
		    _options = {
			type: 'snake'
		};

		that.loading = null;
		that.element = element;
		that.element.classList.add('pull-to-refresh');
		that.top = (0, _utilsDom2['default'])(element).style('padding-top');
		that.options = _utilsUtils2['default'].extend({}, _options, options);
		createLoading.call(that, that.type);

		that.element.addEventListener('touchstart', function (e) {
			touchobj = e.changedTouches[0];
			startY = touchobj.pageY;
		}, false);
		that.element.addEventListener('touchmove', function (e) {
			touchobj = e.changedTouches[0];
			distY = touchobj.pageY - startY;

			if (distY > 0 && that.element.scrollTop === 0) {
				if (!moveDistance) moveDistance = distY;

				if (that.options.type === 'snake') {
					setTransform(that.element, 'translateY(' + (distY - moveDistance) + 'px)');
					that.loading.classList.add('is-shown');
					setTransform(that.loading, 'rotate(' + distY * 2 + 'deg)');
				} else if (that.options.type === 'material') {
					that.loading.classList.remove('not-loading');
					that.loading.classList.remove('is-loading');

					scale = (distY / 200).toFixed(1);
					if (scale >= 1) scale = 1;
					setTransform(that.loading.firstChild, 'scale(' + scale + ')');
				}

				e.preventDefault();
			}
		});
		that.element.addEventListener('touchend', function (e) {
			if (distY > 0 && that.element.scrollTop === 0) {
				if (that.options.type === 'snake') {
					if (distY >= 50) {
						setTransform(that.element, 'translateY(50px)');
						setAnimation(that.loading, 'rotate 0.8s infinite linear');
						callback();
					} else {
						setTransform(that.element, 'translateY(0)');
						setAnimation(that.loading, null);
						that.loading.classList.remove('is-shown');
					}

					moveDistance = null;
				} else if (that.options.type === 'material') {
					if (scale >= 1) {
						that.loading.classList.remove('not-loading');
						that.loading.classList.add('is-loading');
						callback();
					} else {
						that.loading.classList.remove('is-loading');
						that.loading.classList.add('not-loading');
					}

					scale = 0;
				}
			}

			distY = 0;
		}, false);
	}

	_createClass(pullToRefresh, [{
		key: 'hide',
		value: function hide() {
			var that = this;

			function handlerEndTranition() {
				that.element.style.webkitTransitionDuration = '0s';
				that.element.style.transitionDuration = '0s';
			}

			that.element.addEventListener('webkitTransitionEnd', handlerEndTranition);
			that.element.addEventListener('transitionend', handlerEndTranition);

			if (that.options.type === 'snake') {
				that.element.style.webkitTransitionDuration = '0.4s';
				that.element.style.transitionDuration = '0.4s';
				setTransform(that.element, 'translateY(0)');

				that.loading.classList.remove('is-shown');
				setAnimation(that.loading, null);
			} else if (that.options.type === 'material') {
				that.loading.classList.remove('is-loading');
				that.loading.classList.add('not-loading');
			}
		}
	}]);

	return pullToRefresh;
})();

exports['default'] = pullToRefresh;
module.exports = exports['default'];

},{"../libs/hammer":13,"../utils/dom":14,"../utils/utils":15}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = shrinkHeader;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsDom = require('../utils/dom');

var _utilsDom2 = _interopRequireDefault(_utilsDom);

function shrinkHeader(element) {
    var pages = element.parentElement;
    var _content = pages.querySelectorAll('.content');
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

},{"../utils/dom":14}],10:[function(require,module,exports){
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
	var that = this;
	element.addEventListener('click', that.toggle.bind(that));
};

var removeListenCLoseSlideMenu = function removeListenCLoseSlideMenu(element) {
	var that = this;
	element.removeEventListener("click", that.toggle.bind(that));
};

var createOverlayElement = function createOverlayElement() {
	var overlay = document.createElement("div");
	if (this.options.overlay) {
		overlay.className = 'overlay';
	} else {
		overlay.className = 'overlay transparent';
	}
	document.body.appendChild(overlay);
	return overlay;
};

function setTransform(element, value) {
	element.style.webkitTransform = value;
	element.style.MozTransform = value;
	element.style.msTransform = value;
	element.style.OTransform = value;
	element.style.transform = value;
}

var SideMenu = (function () {
	function SideMenu(element, options) {
		_classCallCheck(this, SideMenu);

		var that = this,
		    startX,
		    startTouchPosition,
		    distX,
		    transitionDuration,
		    clientWidth,
		    touchobj,
		    isMoved,
		    _options = {
			type: 'overlap', // overlap or elastic
			overlay: true, // true or false,
			swipe: false // true or false
		};

		that.element = element;
		that.options = _utilsUtils2['default'].extend({}, _options, options);
		that.overlayEl = null;
		that.page = document.querySelector('.navigation');

		transitionDuration = '0.2s';
		startTouchPosition = 30;
		isMoved = false;

		if (that.options.swipe) {
			document.addEventListener('touchstart', function (e) {
				touchobj = e.changedTouches[0];
				startX = touchobj.pageX;
				if (startX <= startTouchPosition && !that.element.classList.contains('side-menu--visible') && that.options.overlay) {
					clientWidth = that.element.clientWidth;
					that.overlayEl = createOverlayElement.call(that);
					listenCLoseSlideMenu.call(that, that.overlayEl);
				}
			}, false);

			document.addEventListener('touchmove', function (e) {
				touchobj = e.changedTouches[0];
				distX = touchobj.pageX - startX;
				isMoved = true;

				if (startX <= startTouchPosition) {
					that.element.style.webkitTransitionDuration = '0s';
					that.element.style.transitionDuration = '0s';
					if (distX >= clientWidth) {
						return;
					} else {
						if (that.options.overlay) that.overlayEl.style.opacity = (distX * 0.002).toFixed(1);
						setTransform(that.element, 'translateX(' + distX + 'px)');
						if (that.options.type === 'elastic') {
							setTransform(that.page, 'translateX(' + distX + 'px)');
						}
					}
				} else if (that.element.classList.contains('side-menu--visible') && distX <= 0) {
					that.element.style.webkitTransitionDuration = '0s';
					that.element.style.transitionDuration = '0s';
					setTransform(that.element, 'translateX(' + (clientWidth + distX) + 'px)');
					if (that.options.overlay) that.overlayEl.style.opacity = ((clientWidth + distX) * 0.002).toFixed(1);

					if (that.options.type === 'elastic') {
						setTransform(that.page, 'translateX(' + (clientWidth + distX) + 'px)');
					}
				}
			}, false);

			document.addEventListener('touchend', function (e) {
				if (isMoved) {
					if (startX <= startTouchPosition) {
						that.element.style.webkitTransitionDuration = transitionDuration;
						that.element.style.transitionDuration = transitionDuration;
						if (distX > 100) {
							that.overlayEl.removeAttribute('style');
							that.element.removeAttribute('style');
							that.element.classList.add('side-menu--visible');
							if (that.options.type === 'elastic') {
								that.page.classList.add('side-menu--elastic');
							}
						} else {
							that.overlayEl.remove();
							that.overlayEl = null;
							setTransform(that.element, 'translateX(0)');
							if (that.options.type === 'elastic') {
								setTransform(that.page, 'translateX(0)');
							}
						}
						if (that.options.type === 'elastic') {
							that.element.removeAttribute('style');
							that.page.removeAttribute('style');
						}
					} else if (that.element.classList.contains('side-menu--visible')) {
						that.element.style.webkitTransitionDuration = transitionDuration;
						that.element.style.transitionDuration = transitionDuration;
						if (distX < -100) {
							if (that.options.overlay) {
								that.overlayEl.remove();
								that.overlayEl = null;
							}
							that.element.removeAttribute('style');
							that.element.classList.remove('side-menu--visible');

							if (that.options.type === 'elastic') {
								that.page.removeAttribute('style');
								that.page.classList.remove('side-menu--elastic');
							}
						} else {
							that.element.removeAttribute('style');
							that.element.classList.add('side-menu--visible');

							if (that.options.type === 'elastic') {
								that.page.removeAttribute('style');
								that.page.classList.add('side-menu--elastic');
							}
						}

						distX = 0;
					}

					isMoved = false;
				}
			}, false);
		}
	}

	_createClass(SideMenu, [{
		key: 'toggle',
		value: function toggle() {

			if (!this.element.classList.contains('side-menu--visible')) {
				if (!this.overlayEl) {
					this.overlayEl = createOverlayElement.call(this);
					listenCLoseSlideMenu.call(this, this.overlayEl);
				}

				if (this.options.type === 'elastic') {
					this.page.classList.add('side-menu--elastic');
				}

				this.element.classList.add('side-menu--visible');
			} else {

				if (this.options.type === 'elastic') {
					this.page.classList.remove('side-menu--elastic');
				}
				this.element.classList.remove('side-menu--visible');
				removeListenCLoseSlideMenu.call(this, this.overlayEl);
				this.overlayEl.remove();
				this.overlayEl = null;
			}
		}
	}]);

	return SideMenu;
})();

exports['default'] = SideMenu;
module.exports = exports['default'];

},{"../utils/utils":15}],11:[function(require,module,exports){
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

    var contentsTabs = element.querySelectorAll('.content');
    if (contentsTabs) {
        (0, _utilsDom2['default'])(contentsTabs).addClass('tab-hide').addClass('content--tab');

        var activeTab = element.querySelector('.active');
        if (activeTab) {
            var contentId = activeTab.getAttribute('ref') || activeTab.getAttribute('data-tab');
            (0, _utilsDom2['default'])(element.querySelectorAll(contentId)).removeClass('tab-hide').addClass('tab-show');
        }
    }

    (0, _utilsDom2['default'])('.tab-bar__item', element).on('click', function (e, el) {
        var contentId = el.getAttribute('ref') || el.getAttribute('data-tab');
        var content = (0, _utilsDom2['default'])(element.querySelectorAll(contentId));
        (0, _utilsDom2['default'])(contentsTabs).removeClass('tab-show').addClass('tab-hide');
        content.removeClass('tab-hide').addClass('tab-show');
        (0, _utilsDom2['default'])(element.querySelectorAll('.tab-bar__item')).removeClass('active');
        el.classList.add('active');
    });
};

exports['default'] = TabBar;
module.exports = exports['default'];

},{"../utils/dom":14}],12:[function(require,module,exports){
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

},{"./components/button":1,"./components/dialog":2,"./components/dropdown-menu":3,"./components/infinite-scroll.js":4,"./components/loading":5,"./components/navigation":6,"./components/notification":7,"./components/pull-to-refresh":8,"./components/shrink-header.js":9,"./components/side-menu":10,"./components/tab-bar.js":11,"./utils/dom":14}],13:[function(require,module,exports){
/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */
'use strict';

(function (window, document, exportName, undefined) {
    'use strict';

    var VENDOR_PREFIXES = ['', 'webkit', 'moz', 'MS', 'ms', 'o'];
    var TEST_ELEMENT = document.createElement('div');

    var TYPE_FUNCTION = 'function';

    var round = Math.round;
    var abs = Math.abs;
    var now = Date.now;

    /**
     * set a timeout with a given scope
     * @param {Function} fn
     * @param {Number} timeout
     * @param {Object} context
     * @returns {number}
     */
    function setTimeoutContext(fn, timeout, context) {
        return setTimeout(bindFn(fn, context), timeout);
    }

    /**
     * if the argument is an array, we want to execute the fn on each entry
     * if it aint an array we don't want to do a thing.
     * this is used by all the methods that accept a single and array argument.
     * @param {*|Array} arg
     * @param {String} fn
     * @param {Object} [context]
     * @returns {Boolean}
     */
    function invokeArrayArg(arg, fn, context) {
        if (Array.isArray(arg)) {
            each(arg, context[fn], context);
            return true;
        }
        return false;
    }

    /**
     * walk objects and arrays
     * @param {Object} obj
     * @param {Function} iterator
     * @param {Object} context
     */
    function each(obj, iterator, context) {
        var i;

        if (!obj) {
            return;
        }

        if (obj.forEach) {
            obj.forEach(iterator, context);
        } else if (obj.length !== undefined) {
            i = 0;
            while (i < obj.length) {
                iterator.call(context, obj[i], i, obj);
                i++;
            }
        } else {
            for (i in obj) {
                obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
            }
        }
    }

    /**
     * extend object.
     * means that properties in dest will be overwritten by the ones in src.
     * @param {Object} dest
     * @param {Object} src
     * @param {Boolean} [merge]
     * @returns {Object} dest
     */
    function extend(dest, src, merge) {
        var keys = Object.keys(src);
        var i = 0;
        while (i < keys.length) {
            if (!merge || merge && dest[keys[i]] === undefined) {
                dest[keys[i]] = src[keys[i]];
            }
            i++;
        }
        return dest;
    }

    /**
     * merge the values from src in the dest.
     * means that properties that exist in dest will not be overwritten by src
     * @param {Object} dest
     * @param {Object} src
     * @returns {Object} dest
     */
    function merge(dest, src) {
        return extend(dest, src, true);
    }

    /**
     * simple class inheritance
     * @param {Function} child
     * @param {Function} base
     * @param {Object} [properties]
     */
    function inherit(child, base, properties) {
        var baseP = base.prototype,
            childP;

        childP = child.prototype = Object.create(baseP);
        childP.constructor = child;
        childP._super = baseP;

        if (properties) {
            extend(childP, properties);
        }
    }

    /**
     * simple function bind
     * @param {Function} fn
     * @param {Object} context
     * @returns {Function}
     */
    function bindFn(fn, context) {
        return function boundFn() {
            return fn.apply(context, arguments);
        };
    }

    /**
     * let a boolean value also be a function that must return a boolean
     * this first item in args will be used as the context
     * @param {Boolean|Function} val
     * @param {Array} [args]
     * @returns {Boolean}
     */
    function boolOrFn(val, args) {
        if (typeof val == TYPE_FUNCTION) {
            return val.apply(args ? args[0] || undefined : undefined, args);
        }
        return val;
    }

    /**
     * use the val2 when val1 is undefined
     * @param {*} val1
     * @param {*} val2
     * @returns {*}
     */
    function ifUndefined(val1, val2) {
        return val1 === undefined ? val2 : val1;
    }

    /**
     * addEventListener with multiple events at once
     * @param {EventTarget} target
     * @param {String} types
     * @param {Function} handler
     */
    function addEventListeners(target, types, handler) {
        each(splitStr(types), function (type) {
            target.addEventListener(type, handler, false);
        });
    }

    /**
     * removeEventListener with multiple events at once
     * @param {EventTarget} target
     * @param {String} types
     * @param {Function} handler
     */
    function removeEventListeners(target, types, handler) {
        each(splitStr(types), function (type) {
            target.removeEventListener(type, handler, false);
        });
    }

    /**
     * find if a node is in the given parent
     * @method hasParent
     * @param {HTMLElement} node
     * @param {HTMLElement} parent
     * @return {Boolean} found
     */
    function hasParent(node, parent) {
        while (node) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    /**
     * small indexOf wrapper
     * @param {String} str
     * @param {String} find
     * @returns {Boolean} found
     */
    function inStr(str, find) {
        return str.indexOf(find) > -1;
    }

    /**
     * split string on whitespace
     * @param {String} str
     * @returns {Array} words
     */
    function splitStr(str) {
        return str.trim().split(/\s+/g);
    }

    /**
     * find if a array contains the object using indexOf or a simple polyFill
     * @param {Array} src
     * @param {String} find
     * @param {String} [findByKey]
     * @return {Boolean|Number} false when not found, or the index
     */
    function inArray(src, find, findByKey) {
        if (src.indexOf && !findByKey) {
            return src.indexOf(find);
        } else {
            var i = 0;
            while (i < src.length) {
                if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
                    return i;
                }
                i++;
            }
            return -1;
        }
    }

    /**
     * convert array-like objects to real arrays
     * @param {Object} obj
     * @returns {Array}
     */
    function toArray(obj) {
        return Array.prototype.slice.call(obj, 0);
    }

    /**
     * unique array with objects based on a key (like 'id') or just by the array's value
     * @param {Array} src [{id:1},{id:2},{id:1}]
     * @param {String} [key]
     * @param {Boolean} [sort=False]
     * @returns {Array} [{id:1},{id:2}]
     */
    function uniqueArray(src, key, sort) {
        var results = [];
        var values = [];
        var i = 0;

        while (i < src.length) {
            var val = key ? src[i][key] : src[i];
            if (inArray(values, val) < 0) {
                results.push(src[i]);
            }
            values[i] = val;
            i++;
        }

        if (sort) {
            if (!key) {
                results = results.sort();
            } else {
                results = results.sort(function sortUniqueArray(a, b) {
                    return a[key] > b[key];
                });
            }
        }

        return results;
    }

    /**
     * get the prefixed property
     * @param {Object} obj
     * @param {String} property
     * @returns {String|Undefined} prefixed
     */
    function prefixed(obj, property) {
        var prefix, prop;
        var camelProp = property[0].toUpperCase() + property.slice(1);

        var i = 0;
        while (i < VENDOR_PREFIXES.length) {
            prefix = VENDOR_PREFIXES[i];
            prop = prefix ? prefix + camelProp : property;

            if (prop in obj) {
                return prop;
            }
            i++;
        }
        return undefined;
    }

    /**
     * get a unique id
     * @returns {number} uniqueId
     */
    var _uniqueId = 1;
    function uniqueId() {
        return _uniqueId++;
    }

    /**
     * get the window object of an element
     * @param {HTMLElement} element
     * @returns {DocumentView|Window}
     */
    function getWindowForElement(element) {
        var doc = element.ownerDocument;
        return doc.defaultView || doc.parentWindow;
    }

    var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

    var SUPPORT_TOUCH = ('ontouchstart' in window);
    var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
    var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

    var INPUT_TYPE_TOUCH = 'touch';
    var INPUT_TYPE_PEN = 'pen';
    var INPUT_TYPE_MOUSE = 'mouse';
    var INPUT_TYPE_KINECT = 'kinect';

    var COMPUTE_INTERVAL = 25;

    var INPUT_START = 1;
    var INPUT_MOVE = 2;
    var INPUT_END = 4;
    var INPUT_CANCEL = 8;

    var DIRECTION_NONE = 1;
    var DIRECTION_LEFT = 2;
    var DIRECTION_RIGHT = 4;
    var DIRECTION_UP = 8;
    var DIRECTION_DOWN = 16;

    var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
    var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
    var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

    var PROPS_XY = ['x', 'y'];
    var PROPS_CLIENT_XY = ['clientX', 'clientY'];

    /**
     * create new input type manager
     * @param {Manager} manager
     * @param {Function} callback
     * @returns {Input}
     * @constructor
     */
    function Input(manager, callback) {
        var self = this;
        this.manager = manager;
        this.callback = callback;
        this.element = manager.element;
        this.target = manager.options.inputTarget;

        // smaller wrapper around the handler, for the scope and the enabled state of the manager,
        // so when disabled the input events are completely bypassed.
        this.domHandler = function (ev) {
            if (boolOrFn(manager.options.enable, [manager])) {
                self.handler(ev);
            }
        };

        this.init();
    }

    Input.prototype = {
        /**
         * should handle the inputEvent data and trigger the callback
         * @virtual
         */
        handler: function handler() {},

        /**
         * bind the events
         */
        init: function init() {
            this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
            this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
            this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
        },

        /**
         * unbind the events
         */
        destroy: function destroy() {
            this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
            this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
            this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
        }
    };

    /**
     * create new input type manager
     * called by the Manager constructor
     * @param {Hammer} manager
     * @returns {Input}
     */
    function createInputInstance(manager) {
        var Type;
        var inputClass = manager.options.inputClass;

        if (inputClass) {
            Type = inputClass;
        } else if (SUPPORT_POINTER_EVENTS) {
            Type = PointerEventInput;
        } else if (SUPPORT_ONLY_TOUCH) {
            Type = TouchInput;
        } else if (!SUPPORT_TOUCH) {
            Type = MouseInput;
        } else {
            Type = TouchMouseInput;
        }
        return new Type(manager, inputHandler);
    }

    /**
     * handle input events
     * @param {Manager} manager
     * @param {String} eventType
     * @param {Object} input
     */
    function inputHandler(manager, eventType, input) {
        var pointersLen = input.pointers.length;
        var changedPointersLen = input.changedPointers.length;
        var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
        var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;

        input.isFirst = !!isFirst;
        input.isFinal = !!isFinal;

        if (isFirst) {
            manager.session = {};
        }

        // source event is the normalized value of the domEvents
        // like 'touchstart, mouseup, pointerdown'
        input.eventType = eventType;

        // compute scale, rotation etc
        computeInputData(manager, input);

        // emit secret event
        manager.emit('hammer.input', input);

        manager.recognize(input);
        manager.session.prevInput = input;
    }

    /**
     * extend the data with some usable properties like scale, rotate, velocity etc
     * @param {Object} manager
     * @param {Object} input
     */
    function computeInputData(manager, input) {
        var session = manager.session;
        var pointers = input.pointers;
        var pointersLength = pointers.length;

        // store the first input to calculate the distance and direction
        if (!session.firstInput) {
            session.firstInput = simpleCloneInputData(input);
        }

        // to compute scale and rotation we need to store the multiple touches
        if (pointersLength > 1 && !session.firstMultiple) {
            session.firstMultiple = simpleCloneInputData(input);
        } else if (pointersLength === 1) {
            session.firstMultiple = false;
        }

        var firstInput = session.firstInput;
        var firstMultiple = session.firstMultiple;
        var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

        var center = input.center = getCenter(pointers);
        input.timeStamp = now();
        input.deltaTime = input.timeStamp - firstInput.timeStamp;

        input.angle = getAngle(offsetCenter, center);
        input.distance = getDistance(offsetCenter, center);

        computeDeltaXY(session, input);
        input.offsetDirection = getDirection(input.deltaX, input.deltaY);

        input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
        input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

        computeIntervalInputData(session, input);

        // find the correct target
        var target = manager.element;
        if (hasParent(input.srcEvent.target, target)) {
            target = input.srcEvent.target;
        }
        input.target = target;
    }

    function computeDeltaXY(session, input) {
        var center = input.center;
        var offset = session.offsetDelta || {};
        var prevDelta = session.prevDelta || {};
        var prevInput = session.prevInput || {};

        if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
            prevDelta = session.prevDelta = {
                x: prevInput.deltaX || 0,
                y: prevInput.deltaY || 0
            };

            offset = session.offsetDelta = {
                x: center.x,
                y: center.y
            };
        }

        input.deltaX = prevDelta.x + (center.x - offset.x);
        input.deltaY = prevDelta.y + (center.y - offset.y);
    }

    /**
     * velocity is calculated every x ms
     * @param {Object} session
     * @param {Object} input
     */
    function computeIntervalInputData(session, input) {
        var last = session.lastInterval || input,
            deltaTime = input.timeStamp - last.timeStamp,
            velocity,
            velocityX,
            velocityY,
            direction;

        if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
            var deltaX = last.deltaX - input.deltaX;
            var deltaY = last.deltaY - input.deltaY;

            var v = getVelocity(deltaTime, deltaX, deltaY);
            velocityX = v.x;
            velocityY = v.y;
            velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
            direction = getDirection(deltaX, deltaY);

            session.lastInterval = input;
        } else {
            // use latest velocity info if it doesn't overtake a minimum period
            velocity = last.velocity;
            velocityX = last.velocityX;
            velocityY = last.velocityY;
            direction = last.direction;
        }

        input.velocity = velocity;
        input.velocityX = velocityX;
        input.velocityY = velocityY;
        input.direction = direction;
    }

    /**
     * create a simple clone from the input used for storage of firstInput and firstMultiple
     * @param {Object} input
     * @returns {Object} clonedInputData
     */
    function simpleCloneInputData(input) {
        // make a simple copy of the pointers because we will get a reference if we don't
        // we only need clientXY for the calculations
        var pointers = [];
        var i = 0;
        while (i < input.pointers.length) {
            pointers[i] = {
                clientX: round(input.pointers[i].clientX),
                clientY: round(input.pointers[i].clientY)
            };
            i++;
        }

        return {
            timeStamp: now(),
            pointers: pointers,
            center: getCenter(pointers),
            deltaX: input.deltaX,
            deltaY: input.deltaY
        };
    }

    /**
     * get the center of all the pointers
     * @param {Array} pointers
     * @return {Object} center contains `x` and `y` properties
     */
    function getCenter(pointers) {
        var pointersLength = pointers.length;

        // no need to loop when only one touch
        if (pointersLength === 1) {
            return {
                x: round(pointers[0].clientX),
                y: round(pointers[0].clientY)
            };
        }

        var x = 0,
            y = 0,
            i = 0;
        while (i < pointersLength) {
            x += pointers[i].clientX;
            y += pointers[i].clientY;
            i++;
        }

        return {
            x: round(x / pointersLength),
            y: round(y / pointersLength)
        };
    }

    /**
     * calculate the velocity between two points. unit is in px per ms.
     * @param {Number} deltaTime
     * @param {Number} x
     * @param {Number} y
     * @return {Object} velocity `x` and `y`
     */
    function getVelocity(deltaTime, x, y) {
        return {
            x: x / deltaTime || 0,
            y: y / deltaTime || 0
        };
    }

    /**
     * get the direction between two points
     * @param {Number} x
     * @param {Number} y
     * @return {Number} direction
     */
    function getDirection(x, y) {
        if (x === y) {
            return DIRECTION_NONE;
        }

        if (abs(x) >= abs(y)) {
            return x > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
        }
        return y > 0 ? DIRECTION_UP : DIRECTION_DOWN;
    }

    /**
     * calculate the absolute distance between two points
     * @param {Object} p1 {x, y}
     * @param {Object} p2 {x, y}
     * @param {Array} [props] containing x and y keys
     * @return {Number} distance
     */
    function getDistance(p1, p2, props) {
        if (!props) {
            props = PROPS_XY;
        }
        var x = p2[props[0]] - p1[props[0]],
            y = p2[props[1]] - p1[props[1]];

        return Math.sqrt(x * x + y * y);
    }

    /**
     * calculate the angle between two coordinates
     * @param {Object} p1
     * @param {Object} p2
     * @param {Array} [props] containing x and y keys
     * @return {Number} angle
     */
    function getAngle(p1, p2, props) {
        if (!props) {
            props = PROPS_XY;
        }
        var x = p2[props[0]] - p1[props[0]],
            y = p2[props[1]] - p1[props[1]];
        return Math.atan2(y, x) * 180 / Math.PI;
    }

    /**
     * calculate the rotation degrees between two pointersets
     * @param {Array} start array of pointers
     * @param {Array} end array of pointers
     * @return {Number} rotation
     */
    function getRotation(start, end) {
        return getAngle(end[1], end[0], PROPS_CLIENT_XY) - getAngle(start[1], start[0], PROPS_CLIENT_XY);
    }

    /**
     * calculate the scale factor between two pointersets
     * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
     * @param {Array} start array of pointers
     * @param {Array} end array of pointers
     * @return {Number} scale
     */
    function getScale(start, end) {
        return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
    }

    var MOUSE_INPUT_MAP = {
        mousedown: INPUT_START,
        mousemove: INPUT_MOVE,
        mouseup: INPUT_END
    };

    var MOUSE_ELEMENT_EVENTS = 'mousedown';
    var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

    /**
     * Mouse events input
     * @constructor
     * @extends Input
     */
    function MouseInput() {
        this.evEl = MOUSE_ELEMENT_EVENTS;
        this.evWin = MOUSE_WINDOW_EVENTS;

        this.allow = true; // used by Input.TouchMouse to disable mouse events
        this.pressed = false; // mousedown state

        Input.apply(this, arguments);
    }

    inherit(MouseInput, Input, {
        /**
         * handle mouse events
         * @param {Object} ev
         */
        handler: function MEhandler(ev) {
            var eventType = MOUSE_INPUT_MAP[ev.type];

            // on start we want to have the left mouse button down
            if (eventType & INPUT_START && ev.button === 0) {
                this.pressed = true;
            }

            if (eventType & INPUT_MOVE && ev.which !== 1) {
                eventType = INPUT_END;
            }

            // mouse must be down, and mouse events are allowed (see the TouchMouse input)
            if (!this.pressed || !this.allow) {
                return;
            }

            if (eventType & INPUT_END) {
                this.pressed = false;
            }

            this.callback(this.manager, eventType, {
                pointers: [ev],
                changedPointers: [ev],
                pointerType: INPUT_TYPE_MOUSE,
                srcEvent: ev
            });
        }
    });

    var POINTER_INPUT_MAP = {
        pointerdown: INPUT_START,
        pointermove: INPUT_MOVE,
        pointerup: INPUT_END,
        pointercancel: INPUT_CANCEL,
        pointerout: INPUT_CANCEL
    };

    // in IE10 the pointer types is defined as an enum
    var IE10_POINTER_TYPE_ENUM = {
        2: INPUT_TYPE_TOUCH,
        3: INPUT_TYPE_PEN,
        4: INPUT_TYPE_MOUSE,
        5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
    };

    var POINTER_ELEMENT_EVENTS = 'pointerdown';
    var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

    // IE10 has prefixed support, and case-sensitive
    if (window.MSPointerEvent) {
        POINTER_ELEMENT_EVENTS = 'MSPointerDown';
        POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
    }

    /**
     * Pointer events input
     * @constructor
     * @extends Input
     */
    function PointerEventInput() {
        this.evEl = POINTER_ELEMENT_EVENTS;
        this.evWin = POINTER_WINDOW_EVENTS;

        Input.apply(this, arguments);

        this.store = this.manager.session.pointerEvents = [];
    }

    inherit(PointerEventInput, Input, {
        /**
         * handle mouse events
         * @param {Object} ev
         */
        handler: function PEhandler(ev) {
            var store = this.store;
            var removePointer = false;

            var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
            var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
            var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

            var isTouch = pointerType == INPUT_TYPE_TOUCH;

            // get index of the event in the store
            var storeIndex = inArray(store, ev.pointerId, 'pointerId');

            // start and mouse must be down
            if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
                if (storeIndex < 0) {
                    store.push(ev);
                    storeIndex = store.length - 1;
                }
            } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
                removePointer = true;
            }

            // it not found, so the pointer hasn't been down (so it's probably a hover)
            if (storeIndex < 0) {
                return;
            }

            // update the event in the store
            store[storeIndex] = ev;

            this.callback(this.manager, eventType, {
                pointers: store,
                changedPointers: [ev],
                pointerType: pointerType,
                srcEvent: ev
            });

            if (removePointer) {
                // remove from the store
                store.splice(storeIndex, 1);
            }
        }
    });

    var SINGLE_TOUCH_INPUT_MAP = {
        touchstart: INPUT_START,
        touchmove: INPUT_MOVE,
        touchend: INPUT_END,
        touchcancel: INPUT_CANCEL
    };

    var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
    var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

    /**
     * Touch events input
     * @constructor
     * @extends Input
     */
    function SingleTouchInput() {
        this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
        this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
        this.started = false;

        Input.apply(this, arguments);
    }

    inherit(SingleTouchInput, Input, {
        handler: function TEhandler(ev) {
            var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

            // should we handle the touch events?
            if (type === INPUT_START) {
                this.started = true;
            }

            if (!this.started) {
                return;
            }

            var touches = normalizeSingleTouches.call(this, ev, type);

            // when done, reset the started state
            if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
                this.started = false;
            }

            this.callback(this.manager, type, {
                pointers: touches[0],
                changedPointers: touches[1],
                pointerType: INPUT_TYPE_TOUCH,
                srcEvent: ev
            });
        }
    });

    /**
     * @this {TouchInput}
     * @param {Object} ev
     * @param {Number} type flag
     * @returns {undefined|Array} [all, changed]
     */
    function normalizeSingleTouches(ev, type) {
        var all = toArray(ev.touches);
        var changed = toArray(ev.changedTouches);

        if (type & (INPUT_END | INPUT_CANCEL)) {
            all = uniqueArray(all.concat(changed), 'identifier', true);
        }

        return [all, changed];
    }

    var TOUCH_INPUT_MAP = {
        touchstart: INPUT_START,
        touchmove: INPUT_MOVE,
        touchend: INPUT_END,
        touchcancel: INPUT_CANCEL
    };

    var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

    /**
     * Multi-user touch events input
     * @constructor
     * @extends Input
     */
    function TouchInput() {
        this.evTarget = TOUCH_TARGET_EVENTS;
        this.targetIds = {};

        Input.apply(this, arguments);
    }

    inherit(TouchInput, Input, {
        handler: function MTEhandler(ev) {
            var type = TOUCH_INPUT_MAP[ev.type];
            var touches = getTouches.call(this, ev, type);
            if (!touches) {
                return;
            }

            this.callback(this.manager, type, {
                pointers: touches[0],
                changedPointers: touches[1],
                pointerType: INPUT_TYPE_TOUCH,
                srcEvent: ev
            });
        }
    });

    /**
     * @this {TouchInput}
     * @param {Object} ev
     * @param {Number} type flag
     * @returns {undefined|Array} [all, changed]
     */
    function getTouches(ev, type) {
        var allTouches = toArray(ev.touches);
        var targetIds = this.targetIds;

        // when there is only one touch, the process can be simplified
        if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
            targetIds[allTouches[0].identifier] = true;
            return [allTouches, allTouches];
        }

        var i,
            targetTouches,
            changedTouches = toArray(ev.changedTouches),
            changedTargetTouches = [],
            target = this.target;

        // get target touches from touches
        targetTouches = allTouches.filter(function (touch) {
            return hasParent(touch.target, target);
        });

        // collect touches
        if (type === INPUT_START) {
            i = 0;
            while (i < targetTouches.length) {
                targetIds[targetTouches[i].identifier] = true;
                i++;
            }
        }

        // filter changed touches to only contain touches that exist in the collected target ids
        i = 0;
        while (i < changedTouches.length) {
            if (targetIds[changedTouches[i].identifier]) {
                changedTargetTouches.push(changedTouches[i]);
            }

            // cleanup removed touches
            if (type & (INPUT_END | INPUT_CANCEL)) {
                delete targetIds[changedTouches[i].identifier];
            }
            i++;
        }

        if (!changedTargetTouches.length) {
            return;
        }

        return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
    }

    /**
     * Combined touch and mouse input
     *
     * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
     * This because touch devices also emit mouse events while doing a touch.
     *
     * @constructor
     * @extends Input
     */
    function TouchMouseInput() {
        Input.apply(this, arguments);

        var handler = bindFn(this.handler, this);
        this.touch = new TouchInput(this.manager, handler);
        this.mouse = new MouseInput(this.manager, handler);
    }

    inherit(TouchMouseInput, Input, {
        /**
         * handle mouse and touch events
         * @param {Hammer} manager
         * @param {String} inputEvent
         * @param {Object} inputData
         */
        handler: function TMEhandler(manager, inputEvent, inputData) {
            var isTouch = inputData.pointerType == INPUT_TYPE_TOUCH,
                isMouse = inputData.pointerType == INPUT_TYPE_MOUSE;

            // when we're in a touch event, so  block all upcoming mouse events
            // most mobile browser also emit mouseevents, right after touchstart
            if (isTouch) {
                this.mouse.allow = false;
            } else if (isMouse && !this.mouse.allow) {
                return;
            }

            // reset the allowMouse when we're done
            if (inputEvent & (INPUT_END | INPUT_CANCEL)) {
                this.mouse.allow = true;
            }

            this.callback(manager, inputEvent, inputData);
        },

        /**
         * remove the event listeners
         */
        destroy: function destroy() {
            this.touch.destroy();
            this.mouse.destroy();
        }
    });

    var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
    var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

    // magical touchAction value
    var TOUCH_ACTION_COMPUTE = 'compute';
    var TOUCH_ACTION_AUTO = 'auto';
    var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
    var TOUCH_ACTION_NONE = 'none';
    var TOUCH_ACTION_PAN_X = 'pan-x';
    var TOUCH_ACTION_PAN_Y = 'pan-y';

    /**
     * Touch Action
     * sets the touchAction property or uses the js alternative
     * @param {Manager} manager
     * @param {String} value
     * @constructor
     */
    function TouchAction(manager, value) {
        this.manager = manager;
        this.set(value);
    }

    TouchAction.prototype = {
        /**
         * set the touchAction value on the element or enable the polyfill
         * @param {String} value
         */
        set: function set(value) {
            // find out the touch-action by the event handlers
            if (value == TOUCH_ACTION_COMPUTE) {
                value = this.compute();
            }

            if (NATIVE_TOUCH_ACTION) {
                this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
            }
            this.actions = value.toLowerCase().trim();
        },

        /**
         * just re-set the touchAction value
         */
        update: function update() {
            this.set(this.manager.options.touchAction);
        },

        /**
         * compute the value for the touchAction property based on the recognizer's settings
         * @returns {String} value
         */
        compute: function compute() {
            var actions = [];
            each(this.manager.recognizers, function (recognizer) {
                if (boolOrFn(recognizer.options.enable, [recognizer])) {
                    actions = actions.concat(recognizer.getTouchAction());
                }
            });
            return cleanTouchActions(actions.join(' '));
        },

        /**
         * this method is called on each input cycle and provides the preventing of the browser behavior
         * @param {Object} input
         */
        preventDefaults: function preventDefaults(input) {
            // not needed with native support for the touchAction property
            if (NATIVE_TOUCH_ACTION) {
                return;
            }

            var srcEvent = input.srcEvent;
            var direction = input.offsetDirection;

            // if the touch action did prevented once this session
            if (this.manager.session.prevented) {
                srcEvent.preventDefault();
                return;
            }

            var actions = this.actions;
            var hasNone = inStr(actions, TOUCH_ACTION_NONE);
            var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
            var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);

            if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
                return this.preventSrc(srcEvent);
            }
        },

        /**
         * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
         * @param {Object} srcEvent
         */
        preventSrc: function preventSrc(srcEvent) {
            this.manager.session.prevented = true;
            srcEvent.preventDefault();
        }
    };

    /**
     * when the touchActions are collected they are not a valid value, so we need to clean things up. *
     * @param {String} actions
     * @returns {*}
     */
    function cleanTouchActions(actions) {
        // none
        if (inStr(actions, TOUCH_ACTION_NONE)) {
            return TOUCH_ACTION_NONE;
        }

        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

        // pan-x and pan-y can be combined
        if (hasPanX && hasPanY) {
            return TOUCH_ACTION_PAN_X + ' ' + TOUCH_ACTION_PAN_Y;
        }

        // pan-x OR pan-y
        if (hasPanX || hasPanY) {
            return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
        }

        // manipulation
        if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
            return TOUCH_ACTION_MANIPULATION;
        }

        return TOUCH_ACTION_AUTO;
    }

    /**
     * Recognizer flow explained; *
     * All recognizers have the initial state of POSSIBLE when a input session starts.
     * The definition of a input session is from the first input until the last input, with all it's movement in it. *
     * Example session for mouse-input: mousedown -> mousemove -> mouseup
     *
     * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
     * which determines with state it should be.
     *
     * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
     * POSSIBLE to give it another change on the next cycle.
     *
     *               Possible
     *                  |
     *            +-----+---------------+
     *            |                     |
     *      +-----+-----+               |
     *      |           |               |
     *   Failed      Cancelled          |
     *                          +-------+------+
     *                          |              |
     *                      Recognized       Began
     *                                         |
     *                                      Changed
     *                                         |
     *                                  Ended/Recognized
     */
    var STATE_POSSIBLE = 1;
    var STATE_BEGAN = 2;
    var STATE_CHANGED = 4;
    var STATE_ENDED = 8;
    var STATE_RECOGNIZED = STATE_ENDED;
    var STATE_CANCELLED = 16;
    var STATE_FAILED = 32;

    /**
     * Recognizer
     * Every recognizer needs to extend from this class.
     * @constructor
     * @param {Object} options
     */
    function Recognizer(options) {
        this.id = uniqueId();

        this.manager = null;
        this.options = merge(options || {}, this.defaults);

        // default is enable true
        this.options.enable = ifUndefined(this.options.enable, true);

        this.state = STATE_POSSIBLE;

        this.simultaneous = {};
        this.requireFail = [];
    }

    Recognizer.prototype = {
        /**
         * @virtual
         * @type {Object}
         */
        defaults: {},

        /**
         * set options
         * @param {Object} options
         * @return {Recognizer}
         */
        set: function set(options) {
            extend(this.options, options);

            // also update the touchAction, in case something changed about the directions/enabled state
            this.manager && this.manager.touchAction.update();
            return this;
        },

        /**
         * recognize simultaneous with an other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        recognizeWith: function recognizeWith(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
                return this;
            }

            var simultaneous = this.simultaneous;
            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            if (!simultaneous[otherRecognizer.id]) {
                simultaneous[otherRecognizer.id] = otherRecognizer;
                otherRecognizer.recognizeWith(this);
            }
            return this;
        },

        /**
         * drop the simultaneous link. it doesnt remove the link on the other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        dropRecognizeWith: function dropRecognizeWith(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
                return this;
            }

            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            delete this.simultaneous[otherRecognizer.id];
            return this;
        },

        /**
         * recognizer can only run when an other is failing
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        requireFailure: function requireFailure(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
                return this;
            }

            var requireFail = this.requireFail;
            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            if (inArray(requireFail, otherRecognizer) === -1) {
                requireFail.push(otherRecognizer);
                otherRecognizer.requireFailure(this);
            }
            return this;
        },

        /**
         * drop the requireFailure link. it does not remove the link on the other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        dropRequireFailure: function dropRequireFailure(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
                return this;
            }

            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            var index = inArray(this.requireFail, otherRecognizer);
            if (index > -1) {
                this.requireFail.splice(index, 1);
            }
            return this;
        },

        /**
         * has require failures boolean
         * @returns {boolean}
         */
        hasRequireFailures: function hasRequireFailures() {
            return this.requireFail.length > 0;
        },

        /**
         * if the recognizer can recognize simultaneous with an other recognizer
         * @param {Recognizer} otherRecognizer
         * @returns {Boolean}
         */
        canRecognizeWith: function canRecognizeWith(otherRecognizer) {
            return !!this.simultaneous[otherRecognizer.id];
        },

        /**
         * You should use `tryEmit` instead of `emit` directly to check
         * that all the needed recognizers has failed before emitting.
         * @param {Object} input
         */
        emit: function emit(input) {
            var self = this;
            var state = this.state;

            function emit(withState) {
                self.manager.emit(self.options.event + (withState ? stateStr(state) : ''), input);
            }

            // 'panstart' and 'panmove'
            if (state < STATE_ENDED) {
                emit(true);
            }

            emit(); // simple 'eventName' events

            // panend and pancancel
            if (state >= STATE_ENDED) {
                emit(true);
            }
        },

        /**
         * Check that all the require failure recognizers has failed,
         * if true, it emits a gesture event,
         * otherwise, setup the state to FAILED.
         * @param {Object} input
         */
        tryEmit: function tryEmit(input) {
            if (this.canEmit()) {
                return this.emit(input);
            }
            // it's failing anyway
            this.state = STATE_FAILED;
        },

        /**
         * can we emit?
         * @returns {boolean}
         */
        canEmit: function canEmit() {
            var i = 0;
            while (i < this.requireFail.length) {
                if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                    return false;
                }
                i++;
            }
            return true;
        },

        /**
         * update the recognizer
         * @param {Object} inputData
         */
        recognize: function recognize(inputData) {
            // make a new copy of the inputData
            // so we can change the inputData without messing up the other recognizers
            var inputDataClone = extend({}, inputData);

            // is is enabled and allow recognizing?
            if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
                this.reset();
                this.state = STATE_FAILED;
                return;
            }

            // reset when we've reached the end
            if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
                this.state = STATE_POSSIBLE;
            }

            this.state = this.process(inputDataClone);

            // the recognizer has recognized a gesture
            // so trigger an event
            if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
                this.tryEmit(inputDataClone);
            }
        },

        /**
         * return the state of the recognizer
         * the actual recognizing happens in this method
         * @virtual
         * @param {Object} inputData
         * @returns {Const} STATE
         */
        process: function process(inputData) {}, // jshint ignore:line

        /**
         * return the preferred touch-action
         * @virtual
         * @returns {Array}
         */
        getTouchAction: function getTouchAction() {},

        /**
         * called when the gesture isn't allowed to recognize
         * like when another is being recognized or it is disabled
         * @virtual
         */
        reset: function reset() {}
    };

    /**
     * get a usable string, used as event postfix
     * @param {Const} state
     * @returns {String} state
     */
    function stateStr(state) {
        if (state & STATE_CANCELLED) {
            return 'cancel';
        } else if (state & STATE_ENDED) {
            return 'end';
        } else if (state & STATE_CHANGED) {
            return 'move';
        } else if (state & STATE_BEGAN) {
            return 'start';
        }
        return '';
    }

    /**
     * direction cons to string
     * @param {Const} direction
     * @returns {String}
     */
    function directionStr(direction) {
        if (direction == DIRECTION_DOWN) {
            return 'down';
        } else if (direction == DIRECTION_UP) {
            return 'up';
        } else if (direction == DIRECTION_LEFT) {
            return 'left';
        } else if (direction == DIRECTION_RIGHT) {
            return 'right';
        }
        return '';
    }

    /**
     * get a recognizer by name if it is bound to a manager
     * @param {Recognizer|String} otherRecognizer
     * @param {Recognizer} recognizer
     * @returns {Recognizer}
     */
    function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
        var manager = recognizer.manager;
        if (manager) {
            return manager.get(otherRecognizer);
        }
        return otherRecognizer;
    }

    /**
     * This recognizer is just used as a base for the simple attribute recognizers.
     * @constructor
     * @extends Recognizer
     */
    function AttrRecognizer() {
        Recognizer.apply(this, arguments);
    }

    inherit(AttrRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof AttrRecognizer
         */
        defaults: {
            /**
             * @type {Number}
             * @default 1
             */
            pointers: 1
        },

        /**
         * Used to check if it the recognizer receives valid input, like input.distance > 10.
         * @memberof AttrRecognizer
         * @param {Object} input
         * @returns {Boolean} recognized
         */
        attrTest: function attrTest(input) {
            var optionPointers = this.options.pointers;
            return optionPointers === 0 || input.pointers.length === optionPointers;
        },

        /**
         * Process the input and return the state for the recognizer
         * @memberof AttrRecognizer
         * @param {Object} input
         * @returns {*} State
         */
        process: function process(input) {
            var state = this.state;
            var eventType = input.eventType;

            var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
            var isValid = this.attrTest(input);

            // on cancel input and we've recognized before, return STATE_CANCELLED
            if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
                return state | STATE_CANCELLED;
            } else if (isRecognized || isValid) {
                if (eventType & INPUT_END) {
                    return state | STATE_ENDED;
                } else if (!(state & STATE_BEGAN)) {
                    return STATE_BEGAN;
                }
                return state | STATE_CHANGED;
            }
            return STATE_FAILED;
        }
    });

    /**
     * Pan
     * Recognized when the pointer is down and moved in the allowed direction.
     * @constructor
     * @extends AttrRecognizer
     */
    function PanRecognizer() {
        AttrRecognizer.apply(this, arguments);

        this.pX = null;
        this.pY = null;
    }

    inherit(PanRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof PanRecognizer
         */
        defaults: {
            event: 'pan',
            threshold: 10,
            pointers: 1,
            direction: DIRECTION_ALL
        },

        getTouchAction: function getTouchAction() {
            var direction = this.options.direction;
            var actions = [];
            if (direction & DIRECTION_HORIZONTAL) {
                actions.push(TOUCH_ACTION_PAN_Y);
            }
            if (direction & DIRECTION_VERTICAL) {
                actions.push(TOUCH_ACTION_PAN_X);
            }
            return actions;
        },

        directionTest: function directionTest(input) {
            var options = this.options;
            var hasMoved = true;
            var distance = input.distance;
            var direction = input.direction;
            var x = input.deltaX;
            var y = input.deltaY;

            // lock to axis?
            if (!(direction & options.direction)) {
                if (options.direction & DIRECTION_HORIZONTAL) {
                    direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
                    hasMoved = x != this.pX;
                    distance = Math.abs(input.deltaX);
                } else {
                    direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
                    hasMoved = y != this.pY;
                    distance = Math.abs(input.deltaY);
                }
            }
            input.direction = direction;
            return hasMoved && distance > options.threshold && direction & options.direction;
        },

        attrTest: function attrTest(input) {
            return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
        },

        emit: function emit(input) {
            this.pX = input.deltaX;
            this.pY = input.deltaY;

            var direction = directionStr(input.direction);
            if (direction) {
                this.manager.emit(this.options.event + direction, input);
            }

            this._super.emit.call(this, input);
        }
    });

    /**
     * Pinch
     * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
     * @constructor
     * @extends AttrRecognizer
     */
    function PinchRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }

    inherit(PinchRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof PinchRecognizer
         */
        defaults: {
            event: 'pinch',
            threshold: 0,
            pointers: 2
        },

        getTouchAction: function getTouchAction() {
            return [TOUCH_ACTION_NONE];
        },

        attrTest: function attrTest(input) {
            return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
        },

        emit: function emit(input) {
            this._super.emit.call(this, input);
            if (input.scale !== 1) {
                var inOut = input.scale < 1 ? 'in' : 'out';
                this.manager.emit(this.options.event + inOut, input);
            }
        }
    });

    /**
     * Press
     * Recognized when the pointer is down for x ms without any movement.
     * @constructor
     * @extends Recognizer
     */
    function PressRecognizer() {
        Recognizer.apply(this, arguments);

        this._timer = null;
        this._input = null;
    }

    inherit(PressRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof PressRecognizer
         */
        defaults: {
            event: 'press',
            pointers: 1,
            time: 500, // minimal time of the pointer to be pressed
            threshold: 5 // a minimal movement is ok, but keep it low
        },

        getTouchAction: function getTouchAction() {
            return [TOUCH_ACTION_AUTO];
        },

        process: function process(input) {
            var options = this.options;
            var validPointers = input.pointers.length === options.pointers;
            var validMovement = input.distance < options.threshold;
            var validTime = input.deltaTime > options.time;

            this._input = input;

            // we only allow little movement
            // and we've reached an end event, so a tap is possible
            if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
                this.reset();
            } else if (input.eventType & INPUT_START) {
                this.reset();
                this._timer = setTimeoutContext(function () {
                    this.state = STATE_RECOGNIZED;
                    this.tryEmit();
                }, options.time, this);
            } else if (input.eventType & INPUT_END) {
                return STATE_RECOGNIZED;
            }
            return STATE_FAILED;
        },

        reset: function reset() {
            clearTimeout(this._timer);
        },

        emit: function emit(input) {
            if (this.state !== STATE_RECOGNIZED) {
                return;
            }

            if (input && input.eventType & INPUT_END) {
                this.manager.emit(this.options.event + 'up', input);
            } else {
                this._input.timeStamp = now();
                this.manager.emit(this.options.event, this._input);
            }
        }
    });

    /**
     * Rotate
     * Recognized when two or more pointer are moving in a circular motion.
     * @constructor
     * @extends AttrRecognizer
     */
    function RotateRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }

    inherit(RotateRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof RotateRecognizer
         */
        defaults: {
            event: 'rotate',
            threshold: 0,
            pointers: 2
        },

        getTouchAction: function getTouchAction() {
            return [TOUCH_ACTION_NONE];
        },

        attrTest: function attrTest(input) {
            return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
        }
    });

    /**
     * Swipe
     * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
     * @constructor
     * @extends AttrRecognizer
     */
    function SwipeRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }

    inherit(SwipeRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof SwipeRecognizer
         */
        defaults: {
            event: 'swipe',
            threshold: 10,
            velocity: 0.65,
            direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
            pointers: 1
        },

        getTouchAction: function getTouchAction() {
            return PanRecognizer.prototype.getTouchAction.call(this);
        },

        attrTest: function attrTest(input) {
            var direction = this.options.direction;
            var velocity;

            if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
                velocity = input.velocity;
            } else if (direction & DIRECTION_HORIZONTAL) {
                velocity = input.velocityX;
            } else if (direction & DIRECTION_VERTICAL) {
                velocity = input.velocityY;
            }

            return this._super.attrTest.call(this, input) && direction & input.direction && input.distance > this.options.threshold && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
        },

        emit: function emit(input) {
            var direction = directionStr(input.direction);
            if (direction) {
                this.manager.emit(this.options.event + direction, input);
            }

            this.manager.emit(this.options.event, input);
        }
    });

    /**
     * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
     * between the given interval and position. The delay option can be used to recognize multi-taps without firing
     * a single tap.
     *
     * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
     * multi-taps being recognized.
     * @constructor
     * @extends Recognizer
     */
    function TapRecognizer() {
        Recognizer.apply(this, arguments);

        // previous time and center,
        // used for tap counting
        this.pTime = false;
        this.pCenter = false;

        this._timer = null;
        this._input = null;
        this.count = 0;
    }

    inherit(TapRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof PinchRecognizer
         */
        defaults: {
            event: 'tap',
            pointers: 1,
            taps: 1,
            interval: 300, // max time between the multi-tap taps
            time: 250, // max time of the pointer to be down (like finger on the screen)
            threshold: 2, // a minimal movement is ok, but keep it low
            posThreshold: 10 // a multi-tap can be a bit off the initial position
        },

        getTouchAction: function getTouchAction() {
            return [TOUCH_ACTION_MANIPULATION];
        },

        process: function process(input) {
            var options = this.options;

            var validPointers = input.pointers.length === options.pointers;
            var validMovement = input.distance < options.threshold;
            var validTouchTime = input.deltaTime < options.time;

            this.reset();

            if (input.eventType & INPUT_START && this.count === 0) {
                return this.failTimeout();
            }

            // we only allow little movement
            // and we've reached an end event, so a tap is possible
            if (validMovement && validTouchTime && validPointers) {
                if (input.eventType != INPUT_END) {
                    return this.failTimeout();
                }

                var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
                var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

                this.pTime = input.timeStamp;
                this.pCenter = input.center;

                if (!validMultiTap || !validInterval) {
                    this.count = 1;
                } else {
                    this.count += 1;
                }

                this._input = input;

                // if tap count matches we have recognized it,
                // else it has began recognizing...
                var tapCount = this.count % options.taps;
                if (tapCount === 0) {
                    // no failing requirements, immediately trigger the tap event
                    // or wait as long as the multitap interval to trigger
                    if (!this.hasRequireFailures()) {
                        return STATE_RECOGNIZED;
                    } else {
                        this._timer = setTimeoutContext(function () {
                            this.state = STATE_RECOGNIZED;
                            this.tryEmit();
                        }, options.interval, this);
                        return STATE_BEGAN;
                    }
                }
            }
            return STATE_FAILED;
        },

        failTimeout: function failTimeout() {
            this._timer = setTimeoutContext(function () {
                this.state = STATE_FAILED;
            }, this.options.interval, this);
            return STATE_FAILED;
        },

        reset: function reset() {
            clearTimeout(this._timer);
        },

        emit: function emit() {
            if (this.state == STATE_RECOGNIZED) {
                this._input.tapCount = this.count;
                this.manager.emit(this.options.event, this._input);
            }
        }
    });

    /**
     * Simple way to create an manager with a default set of recognizers.
     * @param {HTMLElement} element
     * @param {Object} [options]
     * @constructor
     */
    function Hammer(element, options) {
        options = options || {};
        options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
        return new Manager(element, options);
    }

    /**
     * @const {string}
     */
    Hammer.VERSION = '2.0.4';

    /**
     * default settings
     * @namespace
     */
    Hammer.defaults = {
        /**
         * set if DOM events are being triggered.
         * But this is slower and unused by simple implementations, so disabled by default.
         * @type {Boolean}
         * @default false
         */
        domEvents: false,

        /**
         * The value for the touchAction property/fallback.
         * When set to `compute` it will magically set the correct value based on the added recognizers.
         * @type {String}
         * @default compute
         */
        touchAction: TOUCH_ACTION_COMPUTE,

        /**
         * @type {Boolean}
         * @default true
         */
        enable: true,

        /**
         * EXPERIMENTAL FEATURE -- can be removed/changed
         * Change the parent input target element.
         * If Null, then it is being set the to main element.
         * @type {Null|EventTarget}
         * @default null
         */
        inputTarget: null,

        /**
         * force an input class
         * @type {Null|Function}
         * @default null
         */
        inputClass: null,

        /**
         * Default recognizer setup when calling `Hammer()`
         * When creating a new Manager these will be skipped.
         * @type {Array}
         */
        preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, { enable: false }], [PinchRecognizer, { enable: false }, ['rotate']], [SwipeRecognizer, { direction: DIRECTION_HORIZONTAL }], [PanRecognizer, { direction: DIRECTION_HORIZONTAL }, ['swipe']], [TapRecognizer], [TapRecognizer, { event: 'doubletap', taps: 2 }, ['tap']], [PressRecognizer]],

        /**
         * Some CSS properties can be used to improve the working of Hammer.
         * Add them to this method and they will be set when creating a new Manager.
         * @namespace
         */
        cssProps: {
            /**
             * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
             * @type {String}
             * @default 'none'
             */
            userSelect: 'none',

            /**
             * Disable the Windows Phone grippers when pressing an element.
             * @type {String}
             * @default 'none'
             */
            touchSelect: 'none',

            /**
             * Disables the default callout shown when you touch and hold a touch target.
             * On iOS, when you touch and hold a touch target such as a link, Safari displays
             * a callout containing information about the link. This property allows you to disable that callout.
             * @type {String}
             * @default 'none'
             */
            touchCallout: 'none',

            /**
             * Specifies whether zooming is enabled. Used by IE10>
             * @type {String}
             * @default 'none'
             */
            contentZooming: 'none',

            /**
             * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
             * @type {String}
             * @default 'none'
             */
            userDrag: 'none',

            /**
             * Overrides the highlight color shown when the user taps a link or a JavaScript
             * clickable element in iOS. This property obeys the alpha value, if specified.
             * @type {String}
             * @default 'rgba(0,0,0,0)'
             */
            tapHighlightColor: 'rgba(0,0,0,0)'
        }
    };

    var STOP = 1;
    var FORCED_STOP = 2;

    /**
     * Manager
     * @param {HTMLElement} element
     * @param {Object} [options]
     * @constructor
     */
    function Manager(element, options) {
        options = options || {};

        this.options = merge(options, Hammer.defaults);
        this.options.inputTarget = this.options.inputTarget || element;

        this.handlers = {};
        this.session = {};
        this.recognizers = [];

        this.element = element;
        this.input = createInputInstance(this);
        this.touchAction = new TouchAction(this, this.options.touchAction);

        toggleCssProps(this, true);

        each(options.recognizers, function (item) {
            var recognizer = this.add(new item[0](item[1]));
            item[2] && recognizer.recognizeWith(item[2]);
            item[3] && recognizer.requireFailure(item[3]);
        }, this);
    }

    Manager.prototype = {
        /**
         * set options
         * @param {Object} options
         * @returns {Manager}
         */
        set: function set(options) {
            extend(this.options, options);

            // Options that need a little more setup
            if (options.touchAction) {
                this.touchAction.update();
            }
            if (options.inputTarget) {
                // Clean up existing event listeners and reinitialize
                this.input.destroy();
                this.input.target = options.inputTarget;
                this.input.init();
            }
            return this;
        },

        /**
         * stop recognizing for this session.
         * This session will be discarded, when a new [input]start event is fired.
         * When forced, the recognizer cycle is stopped immediately.
         * @param {Boolean} [force]
         */
        stop: function stop(force) {
            this.session.stopped = force ? FORCED_STOP : STOP;
        },

        /**
         * run the recognizers!
         * called by the inputHandler function on every movement of the pointers (touches)
         * it walks through all the recognizers and tries to detect the gesture that is being made
         * @param {Object} inputData
         */
        recognize: function recognize(inputData) {
            var session = this.session;
            if (session.stopped) {
                return;
            }

            // run the touch-action polyfill
            this.touchAction.preventDefaults(inputData);

            var recognizer;
            var recognizers = this.recognizers;

            // this holds the recognizer that is being recognized.
            // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
            // if no recognizer is detecting a thing, it is set to `null`
            var curRecognizer = session.curRecognizer;

            // reset when the last recognizer is recognized
            // or when we're in a new session
            if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
                curRecognizer = session.curRecognizer = null;
            }

            var i = 0;
            while (i < recognizers.length) {
                recognizer = recognizers[i];

                // find out if we are allowed try to recognize the input for this one.
                // 1.   allow if the session is NOT forced stopped (see the .stop() method)
                // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
                //      that is being recognized.
                // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
                //      this can be setup with the `recognizeWith()` method on the recognizer.
                if (session.stopped !== FORCED_STOP && ( // 1
                !curRecognizer || recognizer == curRecognizer || // 2
                recognizer.canRecognizeWith(curRecognizer))) {
                    // 3
                    recognizer.recognize(inputData);
                } else {
                    recognizer.reset();
                }

                // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
                // current active recognizer. but only if we don't already have an active recognizer
                if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                    curRecognizer = session.curRecognizer = recognizer;
                }
                i++;
            }
        },

        /**
         * get a recognizer by its event name.
         * @param {Recognizer|String} recognizer
         * @returns {Recognizer|Null}
         */
        get: function get(recognizer) {
            if (recognizer instanceof Recognizer) {
                return recognizer;
            }

            var recognizers = this.recognizers;
            for (var i = 0; i < recognizers.length; i++) {
                if (recognizers[i].options.event == recognizer) {
                    return recognizers[i];
                }
            }
            return null;
        },

        /**
         * add a recognizer to the manager
         * existing recognizers with the same event name will be removed
         * @param {Recognizer} recognizer
         * @returns {Recognizer|Manager}
         */
        add: function add(recognizer) {
            if (invokeArrayArg(recognizer, 'add', this)) {
                return this;
            }

            // remove existing
            var existing = this.get(recognizer.options.event);
            if (existing) {
                this.remove(existing);
            }

            this.recognizers.push(recognizer);
            recognizer.manager = this;

            this.touchAction.update();
            return recognizer;
        },

        /**
         * remove a recognizer by name or instance
         * @param {Recognizer|String} recognizer
         * @returns {Manager}
         */
        remove: function remove(recognizer) {
            if (invokeArrayArg(recognizer, 'remove', this)) {
                return this;
            }

            var recognizers = this.recognizers;
            recognizer = this.get(recognizer);
            recognizers.splice(inArray(recognizers, recognizer), 1);

            this.touchAction.update();
            return this;
        },

        /**
         * bind event
         * @param {String} events
         * @param {Function} handler
         * @returns {EventEmitter} this
         */
        on: function on(events, handler) {
            var handlers = this.handlers;
            each(splitStr(events), function (event) {
                handlers[event] = handlers[event] || [];
                handlers[event].push(handler);
            });
            return this;
        },

        /**
         * unbind event, leave emit blank to remove all handlers
         * @param {String} events
         * @param {Function} [handler]
         * @returns {EventEmitter} this
         */
        off: function off(events, handler) {
            var handlers = this.handlers;
            each(splitStr(events), function (event) {
                if (!handler) {
                    delete handlers[event];
                } else {
                    handlers[event].splice(inArray(handlers[event], handler), 1);
                }
            });
            return this;
        },

        /**
         * emit event to the listeners
         * @param {String} event
         * @param {Object} data
         */
        emit: function emit(event, data) {
            // we also want to trigger dom events
            if (this.options.domEvents) {
                triggerDomEvent(event, data);
            }

            // no handlers, so skip it all
            var handlers = this.handlers[event] && this.handlers[event].slice();
            if (!handlers || !handlers.length) {
                return;
            }

            data.type = event;
            data.preventDefault = function () {
                data.srcEvent.preventDefault();
            };

            var i = 0;
            while (i < handlers.length) {
                handlers[i](data);
                i++;
            }
        },

        /**
         * destroy the manager and unbinds all events
         * it doesn't unbind dom events, that is the user own responsibility
         */
        destroy: function destroy() {
            this.element && toggleCssProps(this, false);

            this.handlers = {};
            this.session = {};
            this.input.destroy();
            this.element = null;
        }
    };

    /**
     * add/remove the css properties as defined in manager.options.cssProps
     * @param {Manager} manager
     * @param {Boolean} add
     */
    function toggleCssProps(manager, add) {
        var element = manager.element;
        each(manager.options.cssProps, function (value, name) {
            element.style[prefixed(element.style, name)] = add ? value : '';
        });
    }

    /**
     * trigger dom event
     * @param {String} event
     * @param {Object} data
     */
    function triggerDomEvent(event, data) {
        var gestureEvent = document.createEvent('Event');
        gestureEvent.initEvent(event, true, true);
        gestureEvent.gesture = data;
        data.target.dispatchEvent(gestureEvent);
    }

    extend(Hammer, {
        INPUT_START: INPUT_START,
        INPUT_MOVE: INPUT_MOVE,
        INPUT_END: INPUT_END,
        INPUT_CANCEL: INPUT_CANCEL,

        STATE_POSSIBLE: STATE_POSSIBLE,
        STATE_BEGAN: STATE_BEGAN,
        STATE_CHANGED: STATE_CHANGED,
        STATE_ENDED: STATE_ENDED,
        STATE_RECOGNIZED: STATE_RECOGNIZED,
        STATE_CANCELLED: STATE_CANCELLED,
        STATE_FAILED: STATE_FAILED,

        DIRECTION_NONE: DIRECTION_NONE,
        DIRECTION_LEFT: DIRECTION_LEFT,
        DIRECTION_RIGHT: DIRECTION_RIGHT,
        DIRECTION_UP: DIRECTION_UP,
        DIRECTION_DOWN: DIRECTION_DOWN,
        DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
        DIRECTION_VERTICAL: DIRECTION_VERTICAL,
        DIRECTION_ALL: DIRECTION_ALL,

        Manager: Manager,
        Input: Input,
        TouchAction: TouchAction,

        TouchInput: TouchInput,
        MouseInput: MouseInput,
        PointerEventInput: PointerEventInput,
        TouchMouseInput: TouchMouseInput,
        SingleTouchInput: SingleTouchInput,

        Recognizer: Recognizer,
        AttrRecognizer: AttrRecognizer,
        Tap: TapRecognizer,
        Pan: PanRecognizer,
        Swipe: SwipeRecognizer,
        Pinch: PinchRecognizer,
        Rotate: RotateRecognizer,
        Press: PressRecognizer,

        on: addEventListeners,
        off: removeEventListeners,
        each: each,
        merge: merge,
        extend: extend,
        inherit: inherit,
        bindFn: bindFn,
        prefixed: prefixed
    });

    if (typeof define == TYPE_FUNCTION && define.amd) {
        define(function () {
            return Hammer;
        });
    } else if (typeof module != 'undefined' && module.exports) {
        module.exports = Hammer;
    } else {
        window[exportName] = Hammer;
    }
})(window, document, 'Hammer');

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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