import utils from '../utils/utils';

var instance = null;

function _show(text) {
	var self = this;

	let notification_content = document.createElement('div');
	notification_content.className = 'notification__content';
	notification_content.innerHTML = text;

	self.notification.appendChild(notification_content);
	setTimeout(function() {
		self.notification.classList.add('notification--is-shown');
	}, 0);

	document.body.appendChild(self.notification);

	if (self.options.time > 0) {
		setTimeout(function() {
			self.hide();
		}, self.options.time);
	}

	return self;
}

class Notification {

	constructor(text, options) {

		if (instance) {
			instance.hide();
		}

		var self = this;
		var _options = {
			type: 'simple',
			time: 3000
		};

		this.options = utils.extend({}, _options, options);

		self.notification = document.createElement('div');
		self.notification.className = 'notification';

		self.notification.addEventListener('click', function() {
			self.hide();
		}, false);

		return self;
	}
	
	simple(text) {
		_show.call(this, text);

		instance = this;
		return this;
	}

	info(text) {
		let icon = document.createElement('i');
		icon.className = 'notification__icon text-blue mdi mdi-information-outline ';
		this.notification.appendChild(icon);

		_show.call(this, text);

		instance = this;
		return this;
	}

	success(text) {
		let icon = document.createElement('i');
		icon.className = 'notification__icon text-green mdi mdi-check';
		this.notification.appendChild(icon);
		
		_show.call(this, text);

		instance = this;
		return this;
	}

	warning(text) {
		let icon = document.createElement('i');
		icon.className = 'notification__icon text-yellow mdi mdi-alert';
		this.notification.appendChild(icon);
		
		_show.call(this, text);

		instance = this;
		return this;
	}

	error(text) {
		let icon = document.createElement('i');
		icon.className = 'notification__icon text-red mdi mdi-alert-circle';
		this.notification.appendChild(icon);
		
		_show.call(this, text);

		instance = this;
		return this;
	}

	hide() {
		var self = this;

		self.notification.classList.remove('notification--is-shown');
		self.notification.addEventListener('webkitTransitionEnd', function() {
			self.notification.remove();
		});

		self.notification.addEventListener('transitionend', function() {
			self.notification.remove();
		});

		return self;
	}

}

export default Notification;