import utils from '../utils/utils';

var eventEmitter = {
	'beforePush': null,
	'afterPush': null,
	'beforeChange': null,
	'afterChange': null,
	'onClose': null
};


function changePage(template, callback) {
	var that = this;
	that.element.appendChild(template);
	setTimeout(function() {
		if (that.currentPage) {
			that.prevPage = that.currentPage;
			that.currentPage.remove();
		}
		that.currentPage = template;

		if (eventEmitter.afterChange) eventEmitter.afterChange(template);

		if (callback) callback();

	}, 40);
}

function pushPage(template, callback) {
	var that = this;

	that.element.appendChild(template);
	setTimeout(function() {
		template.classList.add(that.animation + '-show');
		that.prevPage = that.currentPage;
		that.currentPage = template;

		if (eventEmitter.afterPush) eventEmitter.afterPush(template);

		if (callback) callback();

	}, 40);
}

class Navigation {

	constructor(element, options, cb) {
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

		that.options = utils.extend({}, _options, options);

		if (that.options.pages) {
			for (var c in that.options.pages) {
				that.pages[c] = that.options.pages[c];
			}
		}

		if (that.options.otherwise) {
			that.change(that.options.otherwise, {});
		}

		document.addEventListener('backbutton', function(e) {
			that.closeCurrentPage();
		}, false);

	}

	get params() {
		let params = this._params;
		return params;
	}

	set params(value) {
		this._params = value;
	}

	on(event, fn) {
		eventEmitter[event] = fn;
	}

	changePage(page, params, callback, animation) {
		var that = this;
		that.params = params;

		if (typeof page == 'string') {
			var request = new XMLHttpRequest();
			request.onreadystatechange = function() {
				if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {

					let temp = document.createElement("div");
					temp.innerHTML = request.responseText;

					let template = temp.querySelector('.pages');
					render(template);

				}
			};
			request.open('GET', page, true);
			request.send();
		}
		else {
			render(page);
		}

		function render(template) {
			if (eventEmitter.beforeChange) {
				eventEmitter.beforeChange(template, function() {
					changePage.call(that, template, function() {
						if (callback) callback.call(template);
					});
				});
			}
			else {
				changePage.call(that, template, function() {
					if (callback) callback.call(template);
				});
			}
		}
	}

	pushPage(page, params, callback, animation) {
		var that = this;
		that.params = params;
		that.animation = 'pages--normal';

		if (animation) {
			that.animation = animation;
		}

		if (typeof page == 'string') {
			var request = new XMLHttpRequest();
			request.onreadystatechange = function() {
				if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {
					let temp = document.createElement("div");
					temp.innerHTML = request.responseText;
					let template = temp.querySelector('.pages');
					render(template);
				}
			};

			request.open('GET', page, true);
			request.send();
		}
		else {
			render(page);
		}

		function render(template) {

			template.classList.add(that.animation);

			if (eventEmitter.beforePush) {
				eventEmitter.beforePush(template, function() {
					pushPage.call(that, template, function() {
						if (callback) callback.call(template);
					});
				});
			}
			else {
				pushPage.call(that, template, function() {
					if (callback) callback.call(template);
				});
			}
		}

	}

	closeCurrentPage() {
		var that = this;

		var removeDomPage = function() {
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
			}
			else {
				that.currentPage.addEventListener('webkitTransitionEnd', removeDomPage);
				that.currentPage.addEventListener('transitionend', removeDomPage);
			}
		}
		else {
			return;
		}

	}

	insert(name, params, animation) {
		if (this.pages[name]) {
			if (this.pages[name].component) {
				this.pages[name].component(params, function(element) {
					this.pushPage(element, params, null, animation);

				}.bind(this));
			}
			else {
				this.pushPage(this.pages[name].template, params, this.pages[name].controller, animation);
			}
		}
	}

	change(name, params, animation) {
		if (this.pages[name]) {
			if (this.pages[name].component) {
				this.pages[name].component(params, function(element) {
					this.changePage(element, params, null, animation);

				}.bind(this));
			}
			else {
				this.changePage(this.pages[name].template, params, this.pages[name].controller, animation);
			}
		}
	}

}


export default Navigation;