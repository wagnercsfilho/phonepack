function removeTransition() {
	var self = this;

	self.element.style.top = self.top + 'px';
	self.loading.remove();

}

function createLoding() {
	var self = this;
	
	self.loading = document.createElement('div');
	self.loading.style.position = 'absolute';
	self.loading.style.left = '47%';
	self.loading.style.top = self.top + 'px';
	self.loading.zIndex = -1;
	self.loading.className = 'spinner--pull-to-refresh';

	self.element.parentNode.insertBefore(self.loading, self.element);
}

class pullToRefresh {

	constructor(element, callback) {

		var self = this,
			starty, // starting x coordinate of touch point
			dist = 0,
			endDist = 0;

		self.element = element;
		self.top = self.element.offsetTop;

		self.element.addEventListener('touchstart', function(e) {
			var touchobj = e.changedTouches[0];
			starty = parseInt(touchobj.clientY);

		}, false);

		self.element.addEventListener('touchmove', function(e) {
			var touchobj = e.changedTouches[0];
			
			if (self.element.offsetTop == self.top){
				createLoding.call(self);
			}
			

			if (parseInt(touchobj.clientY) >= starty && self.element.scrollTop === 0) {
				dist = parseInt(touchobj.clientY) - starty;
				self.element.style.top = self.top + dist + 'px';
				self.loading.style.transform = 'rotate(' + dist * 3 + 'deg)';
			}

		}, false);

		self.element.addEventListener('touchend', function(e) {
			var touchobj = e.changedTouches[0];
			endDist = touchobj.clientY;

			if (self.element.scrollTop === 0) {
				if ((endDist - starty) >= 50) {
					self.element.style.top = self.top + 40 + 'px';
					self.loading.style.animation = 'rotate 0.9s infinite linear';
					callback();
					return;
				}
			}

			removeTransition.call(self);


		}, false);
	}

	hide() {
		var self = this;
		removeTransition.call(self);
	}
}

export default pullToRefresh;