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
			distX,
			transitionDuration,
			clientWidth,
			touchobj,
			_options = {
				overlay: false
			};

		self.element = element;
		self.options = utils.extend({}, _options, options);
		self.overlayEl = null;

		transitionDuration = '0.2s';

		document.addEventListener('touchstart', function(e) {
			touchobj = e.changedTouches[0];
			startX = touchobj.pageX;
			if (startX <= 10 && !self.element.classList.contains('visible') && self.options.overlay) {
				self.overlayEl = createOverlayElement.call(self);
				listenCLoseSlideMenu.call(self, self.overlayEl);
			}

		}, false);

		document.addEventListener('touchmove', function(e) {
			touchobj = e.changedTouches[0];
			self.element.style.webkitTransitionDuration = '0s';
			self.element.style.transitionDuration = '0s';
			distX = touchobj.pageX - startX;

			if (startX <= 10) {
				if (self.options.overlay) self.overlayEl.style.opacity = (distX * 0.001);
				setTransform(self.element, 'translateX(' + distX + 'px)');
			}
			else if (self.element.classList.contains('visible')) {
				clientWidth = self.element.clientWidth;
				setTransform(self.element, 'translateX(' + (clientWidth + distX) + 'px)');
				if (self.options.overlay) self.overlayEl.style.opacity = ((clientWidth + distX) * 0.001);
			}

		}, false);

		document.addEventListener('touchend', function(e) {
			self.element.style.webkitTransitionDuration = transitionDuration;
			self.element.style.transitionDuration = transitionDuration;

			if (startX <= 10) {
				if (distX > 100) {
					self.element.removeAttribute('style');
					self.element.classList.add('visible');
				}
				else {
					setTransform(self.element, 'translateX(0)');
				}
			}
			else if (self.element.classList.contains('visible')) {
				if (distX < -100) {
					if (self.options.overlay) {
						self.overlayEl.remove();
						self.overlayEl = null;
					}
					self.element.removeAttribute('style');
					self.element.classList.remove('visible');
				}
				else {
					self.element.removeAttribute('style');
					self.element.classList.add('visible');
				}

				distX = 0;
			}
		}, false);
	}

	toggle() {

		if (!this.element.classList.contains('visible')) {


			if (!this.overlayEl) {
				this.overlayEl = createOverlayElement.call(this);
				listenCLoseSlideMenu.call(this, this.overlayEl);
			}

			this.element.classList.add('visible');
		}
		else {
			this.element.classList.remove('visible');
			removeListenCLoseSlideMenu.call(this, this.overlayEl);
			this.overlayEl.remove();
			this.overlayEl = null;
			console.log(this.overlayEl);
		}

	}

}

export default SideMenu;