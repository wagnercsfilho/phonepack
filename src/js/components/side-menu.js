import utils from '../utils/utils';

var listenCLoseSlideMenu = function(element) {
	var that = this;
	element.addEventListener('click', that.toggle.bind(that));
};

var removeListenCLoseSlideMenu = function(element) {
	var that = this;
	element.removeEventListener("click", that.toggle.bind(that));
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
		that.options = utils.extend({}, _options, options);
		that.overlayEl = null;
		that.page = document.querySelector('.navigation');

		transitionDuration = '0.2s';
		startTouchPosition = 30;
		isMoved = false;

		if (that.options.swipe) {
			document.addEventListener('touchstart', function(e) {
				touchobj = e.changedTouches[0];
				startX = touchobj.pageX;
				if (startX <= startTouchPosition && !that.element.classList.contains('side-menu--visible') && that.options.overlay) {
					clientWidth = that.element.clientWidth;
					that.overlayEl = createOverlayElement.call(that);
					listenCLoseSlideMenu.call(that, that.overlayEl);
				}

			}, false);

			document.addEventListener('touchmove', function(e) {
				touchobj = e.changedTouches[0];
				distX = touchobj.pageX - startX;
				isMoved = true;

				if (startX <= startTouchPosition) {
					that.element.style.webkitTransitionDuration = '0s';
					that.element.style.transitionDuration = '0s';
					if (distX >= clientWidth) {
						return;
					}
					else {
						if (that.options.overlay) that.overlayEl.style.opacity = (distX * 0.002).toFixed(1);
						setTransform(that.element, 'translateX(' + distX + 'px)');
						if (that.options.type === 'elastic') {
							setTransform(that.page, 'translateX(' + distX + 'px)');
						}
					}
				}
				else if (that.element.classList.contains('side-menu--visible') && distX <= 0) {
					that.element.style.webkitTransitionDuration = '0s';
					that.element.style.transitionDuration = '0s';
					setTransform(that.element, 'translateX(' + (clientWidth + distX) + 'px)');
					if (that.options.overlay) that.overlayEl.style.opacity = (((clientWidth + distX) * 0.002).toFixed(1));

					if (that.options.type === 'elastic') {
						setTransform(that.page, 'translateX(' + (clientWidth + distX) + 'px)');
					}
				}

			}, false);

			document.addEventListener('touchend', function(e) {
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
						}
						else {
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
					}
					else if (that.element.classList.contains('side-menu--visible')) {
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
						}
						else {
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