import $ from '../utils/dom';
import _ from '../utils/utils';
import Hammer from '../libs/hammer';


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
	var self = this;
	self.loading = document.createElement('div');
	self.loading.style.position = 'absolute';
	self.loading.style.top = (parseInt(self.top.replace('px', '')) + 5) + 'px';
	self.loading.zIndex = -1;

	if (self.options.type === 'snake') {
		self.loading.style.left = '47%';
		self.loading.className = 'snake--pull-to-refresh';
	}
	else if (self.options.type === 'material') {
		self.loading.className = 'material--pull-to-refresh';
		var child = document.createElement('div');
		child.className = 'bar';
		self.loading.appendChild(child);
	}

	self.element.parentNode.insertBefore(self.loading, self.element);
}

class pullToRefresh {

	constructor(element, options, callback) {
		var self = this,
			moveDistance = 0,
			scale = 0,
			distY,
			startY,
			touchobj,
			_options = {
				type: 'snake'
			};

		self.loading = null;
		self.element = element;
		self.element.classList.add('pull-to-refresh');
		self.top = $(element).style('padding-top');
		self.options = _.extend({}, _options, options);
		createLoading.call(self, self.type);

		self.element.addEventListener('touchstart', function(e) {
			touchobj = e.changedTouches[0];
			startY = touchobj.pageY;
		}, false);
		self.element.addEventListener('touchmove', function(e) {
			touchobj = e.changedTouches[0];
			distY = touchobj.pageY - startY;

			if (distY > 0 && self.element.scrollTop === 0) {
				if (!moveDistance) moveDistance = distY;

				if (self.options.type === 'snake') {
					setTransform(self.element, 'translateY(' + (distY - moveDistance) + 'px)');
					self.loading.classList.add('is-shown');
					setTransform(self.loading, 'rotate(' + distY * 2 + 'deg)');
				}
				else if (self.options.type === 'material') {
					self.loading.classList.remove('not-loading');
					self.loading.classList.remove('is-loading');

					scale = ((distY / 200).toFixed(1));
					if (scale >= 1) scale = 1;
					setTransform(self.loading.firstChild, 'scale(' + (scale) + ')');
				}

				e.preventDefault();
			}
		});
		self.element.addEventListener('touchend', function(e) {
			if (distY > 0 && self.element.scrollTop === 0) {
				if (self.options.type === 'snake') {
					if (distY >= 50) {
						setTransform(self.element, 'translateY(50px)');
						setAnimation(self.loading, 'rotate 0.8s infinite linear');
						callback();
					}
					else {
						setTransform(self.element, 'translateY(0)');
						setAnimation(self.loading, null);
						self.loading.classList.remove('is-shown');
					}

					moveDistance = null;
				}
				else if (self.options.type === 'material') {
					if (scale >= 1) {
						self.loading.classList.remove('not-loading');
						self.loading.classList.add('is-loading');
						callback();
					}
					else {
						self.loading.classList.remove('is-loading');
						self.loading.classList.add('not-loading');
					}

					scale = 0;
				}
			}

			distY = 0;

		}, false);

	}

	hide() {
		var self = this;

		function handlerEndTranition() {
			self.element.style.webkitTransitionDuration = '0s';
			self.element.style.transitionDuration = '0s';
		}

		self.element.addEventListener('webkitTransitionEnd', handlerEndTranition);
		self.element.addEventListener('transitionend', handlerEndTranition);

		if (self.options.type === 'snake') {
			self.element.style.webkitTransitionDuration = '0.4s';
			self.element.style.transitionDuration = '0.4s';
			setTransform(self.element, 'translateY(0)');

			self.loading.classList.remove('is-shown');
			setAnimation(self.loading, null);
		}
		else if (self.options.type === 'material') {
			self.loading.classList.remove('is-loading');
			self.loading.classList.add('not-loading');
		}
	}
}

export default pullToRefresh;