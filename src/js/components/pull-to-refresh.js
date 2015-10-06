function removeTransition() {
	var self = this;

	var handlerTransitionEnd = function() {
		self.element.classList.remove('content--pull-to-refresh');
	};

	self.element.addEventListener('webkitTransitionEnd', handlerTransitionEnd);
	self.element.addEventListener('transitionend', handlerTransitionEnd);

	self.element.classList.add('content--pull-to-refresh');
	setTimeout(function() {
		self.element.style.transform = 'translateY(0px)';
		self.loading.remove();
	}, 20);

}

class pullToRefresh {

	constructor(element, callback) {

		var self = this,
			top, // left position of moving box
			starty, // starting x coordinate of touch point
			dist = 0,
			endDist = 0, // distance traveled by touch point
			touchobj,
			spinner;

		self.started = false;
		self.element = element;
		top = self.element.offsetTop;

		self.element.addEventListener('touchstart', function(e) {

			if (!self.started) {
				self.loading = document.createElement('div');
				self.loading.style.position = 'absolute';
				self.loading.style.left = '47%';
				self.loading.style.top = top + 'px';
				self.loading.zIndex = -1;
				self.loading.className = 'spinner--pull-to-refresh';

				self.element.parentNode.insertBefore(self.loading, self.element);

				touchobj = e.changedTouches[0];
				starty = parseInt(touchobj.clientY);
				e.preventDefault();
			}
		}, false);

		self.element.addEventListener('touchmove', function(e) {
			touchobj = e.changedTouches[0];
			dist = parseInt(touchobj.clientY) - starty;
			self.element.style.transform = 'translateY(' + dist + 'px)';
			self.loading.style.transform = 'rotate(' + dist * 3 + 'deg)';
			e.preventDefault();

			self.started = true;
		}, false);

		self.element.addEventListener('touchend', function(e) {

			endDist = e.changedTouches[0].clientY;
			if ((endDist - starty) >= 50) {
				self.element.style.transform = 'translateY(40px)';
				self.loading.style.animation = 'rotate 0.9s infinite linear';
				callback();
				return;
			}

			removeTransition.call(self);

			e.preventDefault();
		}, false);
	}

	hide() {
		var self = this;
		removeTransition.call(self);
		self.started = false;
	}
}

export default pullToRefresh;