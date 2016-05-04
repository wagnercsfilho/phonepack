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
	var that = this;
	that.loading = document.createElement('div');
	that.loading.style.position = 'absolute';
	that.loading.style.top = (parseInt(that.top.replace('px', '')) + 5) + 'px';
	that.loading.zIndex = -1;

	if (that.options.type === 'snake') {
		that.loading.style.left = '47%';
		that.loading.className = 'snake--pull-to-refresh';
	}
	else if (that.options.type === 'material') {
		that.loading.className = 'material--pull-to-refresh';
		var child = document.createElement('div');
		child.className = 'bar';
		that.loading.appendChild(child);
	}

	that.element.parentNode.insertBefore(that.loading, that.element);
}

class pullToRefresh {

	constructor(element, options, callback) {
		var that = this,
			moveDistance = 0,
			scale = 0,
			distY,
			startY,
			touchobj,
			_options = {
				type: 'snake'
			};

		that.loading = null;
		that.element = element;
		that.element.classList.add('pull-to-refresh');
		that.top = $(element).style('padding-top');
		that.options = _.extend({}, _options, options);
		createLoading.call(that, that.type);

		that.element.addEventListener('touchstart', function(e) {
			touchobj = e.changedTouches[0];
			startY = touchobj.pageY;
		}, false);
		that.element.addEventListener('touchmove', function(e) {
			touchobj = e.changedTouches[0];
			distY = touchobj.pageY - startY;

			if (distY > 0 && that.element.scrollTop === 0) {
				if (!moveDistance) moveDistance = distY;

				if (that.options.type === 'snake') {
					setTransform(that.element, 'translateY(' + (distY - moveDistance) + 'px)');
					that.loading.classList.add('is-shown');
					setTransform(that.loading, 'rotate(' + distY * 2 + 'deg)');
				}
				else if (that.options.type === 'material') {
					that.loading.classList.remove('not-loading');
					that.loading.classList.remove('is-loading');

					scale = ((distY / 200).toFixed(1));
					if (scale >= 1) scale = 1;
					setTransform(that.loading.firstChild, 'scale(' + (scale) + ')');
				}

				e.preventDefault();
			}
		});
		that.element.addEventListener('touchend', function(e) {
			if (distY > 0 && that.element.scrollTop === 0) {
				if (that.options.type === 'snake') {
					if (distY >= 50) {
						setTransform(that.element, 'translateY(50px)');
						setAnimation(that.loading, 'rotate 0.8s infinite linear');
						callback();
					}
					else {
						setTransform(that.element, 'translateY(0)');
						setAnimation(that.loading, null);
						that.loading.classList.remove('is-shown');
					}

					moveDistance = null;
				}
				else if (that.options.type === 'material') {
					if (scale >= 1) {
						that.loading.classList.remove('not-loading');
						that.loading.classList.add('is-loading');
						callback();
					}
					else {
						that.loading.classList.remove('is-loading');
						that.loading.classList.add('not-loading');
					}

					scale = 0;
				}
			}

			distY = 0;

		}, false);

	}

	hide() {
		var that = this;

		function handlerEndTranition() {
			that.element.style.webkitTransitionDuration = '0s';
			that.element.style.transitionDuration = '0s';
		}

		that.element.addEventListener('webkitTransitionEnd', handlerEndTranition);
		that.element.addEventListener('transitionend', handlerEndTranition);

		if (that.options.type === 'snake') {
			that.element.style.webkitTransitionDuration = '0.4s';
			that.element.style.transitionDuration = '0.4s';
			setTransform(that.element, 'translateY(0)');

			that.loading.classList.remove('is-shown');
			setAnimation(that.loading, null);
		}
		else if (that.options.type === 'material') {
			that.loading.classList.remove('is-loading');
			that.loading.classList.add('not-loading');
		}
	}
}

export default pullToRefresh;