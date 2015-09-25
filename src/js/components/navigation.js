var utils = require('../utils/utils');

var Navigation = (function() {

	function renderPage(element, callback) {
		var self = this;
		document.body.appendChild(element);

		setTimeout(function() {
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

	function Navigation(element) {
		var self = this;
		self.element = element;
		self.currentPage = null;
		self.prevPage = null;
		
		element.classList.add('pages');
	}

	Navigation.prototype.replacePage = function(page, callback) {
		var self = this;
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (request.readyState === 4 && (request.status == 200 || request.status == 0)) {
				self.element.innerHTML = request.responseText;
				setTimeout(function() {
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

	Navigation.prototype.pushPage = function(page, cbAfter, callback) {
		var request = new XMLHttpRequest();
		var self = this;

		request.onreadystatechange = function() {
			if (request.readyState === 4 && (request.status == 200 || request.status == 0)) {

				var nextPage = document.createElement("div");
				nextPage.className = 'pages pages--slide-up';
				nextPage.innerHTML = request.responseText;

				// send a callback with the element html created
				if (callback) {
					cbAfter(nextPage, function(el) {
						renderPage.call(self, nextPage, function() {
							callback(nextPage);
						});
					});
				} else {
					renderPage.call(self, nextPage, function() {
						cbAfter();
					});
				}

			}
		}

		request.open('GET', page, true);
		request.send();
	}

	Navigation.prototype.closeCurrentPage = function() {
		var self = this;

		self.currentPage.classList.remove('pages--slide-up-show');
		self.currentPage.addEventListener('webkitTransitionEnd', function() {
			if (self.currentPage) {
				self.currentPage.remove();
			}
			self.currentPage = self.prevPage;
		});

		self.currentPage.addEventListener('transitionend', function() {
			if (self.currentPage) {
				self.currentPage.remove();
			}
			self.currentPage = self.prevPage;
		});

	}

	return Navigation;

})();

module.exports = Navigation;