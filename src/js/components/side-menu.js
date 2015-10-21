import utils from '../utils/utils';

var listenCLoseSlideMenu = function(element) {
	var self = this;
	element.addEventListener('click', function() {
		self.toggle();
	});
};

var removeListenCLoseSlideMenu = function(element) {
	element.removeEventListener("click");
};

var createOverlayElement = function() {
	var overlay = document.createElement("div");
	if (this.options.overlay) {
		overlay.className = 'overlay';
	}
	else {
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

class SideMenu {

	constructor(element, options) {
		var self = this,
			startX,
			startTouchPosition,
			distX,
			transitionDuration,
			clientWidth,
			touchobj,
			isMoved,
			_options = {
				type: 'overlap', // overlap or elastic
				overlay: true // true or false
			};

		self.element = element;
		self.options = utils.extend({}, _options, options);
		self.overlayEl = null;
		self.page = document.querySelector('.navigation');

		transitionDuration = '0.2s';
		startTouchPosition = 30;
		isMoved = false;

		document.addEventListener('touchstart', function(e) {
			touchobj = e.changedTouches[0];
			startX = touchobj.pageX;
			if (startX <= startTouchPosition && !self.element.classList.contains('side-menu--visible') && self.options.overlay) {
				clientWidth = self.element.clientWidth;
				self.overlayEl = createOverlayElement.call(self);
				listenCLoseSlideMenu.call(self, self.overlayEl);
			}

		}, false);

		document.addEventListener('touchmove', function(e) {
			touchobj = e.changedTouches[0];
			distX = touchobj.pageX - startX;
			isMoved = true;

			if (startX <= startTouchPosition) {
				self.element.style.webkitTransitionDuration = '0s';
				self.element.style.transitionDuration = '0s';
				if (distX >= clientWidth) {
					return;
				}
				else {
					if (self.options.overlay) self.overlayEl.style.opacity = (distX * 0.002).toFixed(1);
					setTransform(self.element, 'translateX(' + distX + 'px)');
					if (self.options.type === 'elastic') {
						setTransform(self.page, 'translateX(' + distX + 'px)');
					}
				}
			}
			else if (self.element.classList.contains('side-menu--visible') && distX <= 0) {
				self.element.style.webkitTransitionDuration = '0s';
				self.element.style.transitionDuration = '0s';
				setTransform(self.element, 'translateX(' + (clientWidth + distX) + 'px)');
				if (self.options.overlay) self.overlayEl.style.opacity = (((clientWidth + distX) * 0.002).toFixed(1));

				if (self.options.type === 'elastic') {
					setTransform(self.page, 'translateX(' + (clientWidth + distX) + 'px)');
				}
			}

		}, false);

		document.addEventListener('touchend', function(e) {
			if (isMoved) {
				if (startX <= startTouchPosition) {
					self.element.style.webkitTransitionDuration = transitionDuration;
					self.element.style.transitionDuration = transitionDuration;
					if (distX > 100) {
						self.overlayEl.removeAttribute('style');
						self.element.removeAttribute('style');
						self.element.classList.add('side-menu--visible');
						if (self.options.type === 'elastic') {
							self.page.classList.add('side-menu--elastic');
						}
					}
					else {
						self.overlayEl.remove();
						self.overlayEl = null;
						setTransform(self.element, 'translateX(0)');
						if (self.options.type === 'elastic') {
							setTransform(self.page, 'translateX(0)');
						}
					}
					if (self.options.type === 'elastic') {
						self.element.removeAttribute('style');
						self.page.removeAttribute('style');
					}
				}
				else if (self.element.classList.contains('side-menu--visible')) {
					self.element.style.webkitTransitionDuration = transitionDuration;
					self.element.style.transitionDuration = transitionDuration;
					if (distX < -100) {
						if (self.options.overlay) {
							self.overlayEl.remove();
							self.overlayEl = null;
						}
						self.element.removeAttribute('style');
						self.element.classList.remove('side-menu--visible');

						if (self.options.type === 'elastic') {
							self.page.removeAttribute('style');
							self.page.classList.remove('side-menu--elastic');
						}
					}
					else {
						self.element.removeAttribute('style');
						self.element.classList.add('side-menu--visible');

						if (self.options.type === 'elastic') {
							self.page.removeAttribute('style');
							self.page.classList.add('side-menu--elastic');
						}
					}

					distX = 0;
				}

				isMoved = false;
			}
		}, false);
	}

	toggle() {

		if (!this.element.classList.contains('side-menu--visible')) {
			if (!this.overlayEl) {
				this.overlayEl = createOverlayElement.call(this);
				listenCLoseSlideMenu.call(this, this.overlayEl);
			}

			if (this.options.type === 'elastic') {
				this.page.classList.add('side-menu--elastic');
			}

			this.element.classList.add('side-menu--visible');
		}
		else {

			if (this.options.type === 'elastic') {
				this.page.classList.remove('side-menu--elastic');
			}
			this.element.classList.remove('side-menu--visible');
			removeListenCLoseSlideMenu.call(this, this.overlayEl);
			this.overlayEl.remove();
			this.overlayEl = null;
		}

	}

}

export default SideMenu;