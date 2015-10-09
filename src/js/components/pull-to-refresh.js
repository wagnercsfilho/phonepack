import $ from '../utils/dom';
import _ from '../utils/utils';

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
	self.loading.style.top = self.top;
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
		var self = this;
		var moveDistance = 0;
		var scale = 0;
		var _options = {
			type: 'snake'
		};

		self.loading = null;
		self.element = element;
		self.element.classList.add('pull-to-refresh');
		self.top = $(element).style('padding-top');

		self.options = _.extend({}, _options, options);

		createLoading.call(self, self.type);

		$(self.element).touch(function(evt, dir, phase, swipetype, distance) {

			if (dir === 'down' && self.element.scrollTop === 0) {
				if (!moveDistance) moveDistance = distance;

				if (self.options.type === 'snake') {
					setTransform(self.element, 'translateY(' + (distance - moveDistance) + 'px)');
					self.loading.classList.add('is-shown');
					setTransform(self.loading, 'rotate(' + distance * 2 + 'deg)');
				}
				else if (self.options.type === 'material') {
					self.loading.classList.remove('not-loading');
					self.loading.classList.remove('is-loading');

					scale = ((distance / 200).toFixed(1));
					if (scale >= 1) scale = 1;
					setTransform(self.loading.firstChild, 'scale(' + (scale) + ')');
				}

				evt.preventDefault();
			}

			if (dir === 'down' && phase === 'end' && self.element.scrollTop === 0) {

				if (self.options.type === 'snake') {
					if (distance >= 50) {
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

			if (phase === 'cancel' && self.element.scrollTop === 0) {
				if (self.options.type === 'snake') {
					setTransform(self.element, 'translateY(0)');
					setAnimation(self.loading, null);
					self.loading.classList.remove('is-shown');
					moveDistance = null;
				}
				else if (self.options.type === 'material') {
					self.loading.classList.remove('is-loading');
					self.loading.classList.add('not-loading');
					scale = 0;
				}
			}

		});

	}

	hide() {
		var self = this;

		if (self.options.type === 'snake') {
			self.element.style.transform = 'translateY(0)';
			self.loading.classList.remove('is-shown');
			self.loading.style.animation = null;
		}
		else if (self.options.type === 'material') {
			self.loading.classList.remove('is-loading');
			self.loading.classList.add('not-loading');
		}
	}
}

export default pullToRefresh;