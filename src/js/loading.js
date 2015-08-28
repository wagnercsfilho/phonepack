var utils = require('./utils');

var Loading = (function(){

	function Loading(params){

		var self = this;

		var options = {
			title: null,
			spinner: true
		}

		this.options = utils.extend({}, options, params);

		self.overlay = document.createElement("div");
		self.overlay.className = 'loading-filter';

		self.dialog = document.createElement("div");
		self.dialog.className = 'loading';

		var main = document.createElement("div");
		main.className = 'loading__main';

		if (this.options.spinner){
			var spinner = document.createElement("div");
			spinner.className = 'loading__spinner';

			var sp = '<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">'+
					 ' <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>'+
					 '</svg>';
			spinner.innerHTML = sp;
			main.appendChild(spinner);

		}

		if (self.options.title){
			var title = document.createElement("div");
			title.className = 'loading__title';
			title.innerHTML = self.options.title;
			main.appendChild(title);
		}

		self.dialog.appendChild(main);

		document.body.appendChild(self.overlay);
		document.body.appendChild(self.dialog);
	
		return self;
	}

	Loading.prototype.show = function(confirmCallback, cancelCallback){

		var self = this;

		setTimeout(function(){ 
			this.overlay.classList.add('loading-filter--is-shown');
			this.dialog.classList.add('loading--is-shown');
		}.bind(self), 0);

		return self;

	}

	Loading.prototype.hide = function(){

		var self = this;

		setTimeout(function(){ 
			var self = this;
			self.overlay.classList.remove('loading-filter--is-shown');
			self.dialog.classList.remove('loading--is-shown');

			
			self.overlay.addEventListener('webkitTransitionEnd', function(){
				self.overlay.remove()
			});
			
			self.overlay.addEventListener('transitionend', function(){
				self.overlay.remove()
			});

			self.dialog.addEventListener('webkitTransitionEnd', function(){
				self.dialog.remove()
			});			

			self.dialog.addEventListener('transitionend', function(){
				self.dialog.remove()
			});
			
		}.bind(self), 0);

		return self;
	}

	return Loading;

})();

module.exports = Loading;