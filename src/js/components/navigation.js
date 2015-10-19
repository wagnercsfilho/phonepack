import utils from '../utils/utils';

var eventEmitter = {
	'beforePush': null,
	'afterPush': null,
	'beforeChange': null,
	'afterChange': null
};

function changePage(template, callback) {
	var self = this;
	self.element.appendChild(template);
	setTimeout(function() {
		self.prevPage = self.currentPage;
		self.currentPage.remove();
		self.currentPage = template;

		if (eventEmitter.afterChange) eventEmitter.afterChange(template);

		if (callback) callback();

	}, 50);
}

function pushPage(template, callback) {
	var self = this;

	self.element.appendChild(template);
	setTimeout(function() {
		template.classList.add('pages--slide-up-show');
		self.prevPage = self.currentPage;
		self.currentPage = template;

		if (eventEmitter.afterPush) eventEmitter.afterPush(template);

		if (callback) callback();

	}, 50);
}

class Navigation {

	constructor(element, options) {
		var self = this;
		self.element = element;
		self.currentPage = null;
		self.prevPage = null;
		self._params = null;

		var _options = {
			page: null
		};

		self.options = utils.extend({}, _options, options);

		if (self.options.page) {
			self.pushPage(self.options.page);
		}

		document.addEventListener('backbutton', function(e) {
				self.closeCurrentPage();
		}, false);

}

get params() {
	let params = this._params;
	this._params = null;
	return params;
}

set params(value) {
	this._params = value;
}

on(event, fn) {
	eventEmitter[event] = fn;
}

changePage(page, params, callback) {
	var self = this;
	self.params = params;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {

			let temp = document.createElement("div");
			temp.innerHTML = request.responseText;

			let template = temp.querySelector('.pages');
			if (eventEmitter.beforeChange) {
				eventEmitter.beforeChange(template, function() {
					changePage.call(self, template, function() {
						if (callback) callback(template);
					});
				});
			}
			else {
				changePage.call(self, template, function() {
					if (callback) callback(template);
				});
			}

		}
	};
	request.open('GET', page, true);
	request.send();
}

pushPage(page, params, callback) {
	var self = this;
	self.params = params;
	var request = new XMLHttpRequest();

	request.onreadystatechange = function() {
		if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {

			let temp = document.createElement("div");
			temp.innerHTML = request.responseText;

			let template = temp.querySelector('.pages');
			template.classList.add('pages--slide-up');
			if (eventEmitter.beforePush) {
				eventEmitter.beforePush(template, function() {
					pushPage.call(self, template, function() {
						if (callback) callback(template);
					});
				});
			}
			else {
				pushPage.call(self, template, function() {
					if (callback) callback(template);
				});
			}

		}
	};

	request.open('GET', page, true);
	request.send();
}

closeCurrentPage() {
	var self = this;

	var removeDomPage = function() {
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

}

export default Navigation;