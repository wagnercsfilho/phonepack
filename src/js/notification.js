var utils = require('./utils');

var Notification = (function(){

	var instance = null;

	function Notification(text, options){

		if (instance){
			instance.hide();
		}

		var self = this;

		var _options = {
			type: 'simple',
			time: 3000
		}

		this.options = utils.extend({}, _options, options);

		self.notification = document.createElement('div');
		self.notification.className = 'notification';

		self.notification.addEventListener('click', function(){
			self.hide();
		}, false);

		if (self.options.type !== 'simple'){
			var icon = document.createElement('i');
			icon.className = 'material-icons notification__icon';

			switch (self.options.type){
				case 'info': 
					icon.innerHTML = 'info_outline';
					icon.classList.add('color-blue');
					break;

				case 'success':
					icon.innerHTML = 'check';
					icon.classList.add('color-green');
					break;

				case 'warning':
					icon.innerHTML = 'warning';
					icon.classList.add('color-yellow');
					break;

				case 'error':
					icon.innerHTML = 'info';
					icon.classList.add('color-red');
					break;

				default:
					icon.innerHTML = 'info_outline';
					icon.classList.add('color-blue');
			}

			self.notification.appendChild(icon);		
			
		}

		var notification_content = document.createElement('div'); 
		notification_content.className = 'notification__content';
		notification_content.innerHTML = text;

		self.notification.appendChild(notification_content);
		
		setTimeout(function() {
			self.notification.classList.add('notification--is-shown');
		}, 0);

		instance = self;

		return self;
	}

	Notification.prototype.show = function(){
		var self = this;

		document.body.appendChild(self.notification);

		if (self.options.time > 0){
			setTimeout(function() {
				self.hide();
			}, self.options.time);
		}

		return self;
	}

	Notification.prototype.hide = function(){
		var self = this;

		self.notification.classList.remove('notification--is-shown');
		self.notification.addEventListener('webkitTransitionEnd', function(){
				self.notification.remove();
		});
			
		self.notification.addEventListener('transitionend', function(){
			self.notification.remove();
		});

		return self;
	}

	return Notification;

})();

module.exports = Notification;