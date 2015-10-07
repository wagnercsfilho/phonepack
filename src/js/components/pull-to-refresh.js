import $ from '../utils/dom';

function createLoading() {
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
		var self = this;
		var moveDistance = null;
		self.loading = null;
		self.element = element;
		self.top = self.element.offsetTop;
		
		createLoading.call(self);

		$(self.element).touch(function(evt, dir, phase, swipetype, distance) {
			
			if (dir === 'down' && self.element.scrollTop === 0) {
				if (!moveDistance) moveDistance = distance;
				self.element.style.transform = 'translateY(' + (distance - moveDistance) + 'px)';
				self.loading.style.transform = 'rotate('+ distance +'deg)';
				evt.preventDefault();
			}

			if (dir === 'down' && phase === 'end' && self.element.scrollTop === 0) {

				if (distance >= 50) {
					self.element.style.transform = 'translateY(50px)';
					self.loading.style.animation = 'rotate 0.8s infinite linear';
					callback();
				}
				else {
					self.element.style.transform = 'translateY(0)';
					self.loading.style.animation = null;
				}
				
				moveDistance = null;

			}
			
			if (phase === 'cancel' && self.element.scrollTop === 0){
				self.element.style.transform = 'translateY(0)';
				self.loading.style.animation = null;
				moveDistance = null;
			}
		});

	}

	hide() {
		var self = this;
		self.element.style.transform = 'translateY(0)';
		self.loading.style.animation = null;
	}
}

export default pullToRefresh;