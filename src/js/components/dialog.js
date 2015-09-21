var utils = require('../utils/utils');

var Dialog = (function(){

	function Dialog(params){

		var self = this;

		var options = {
			title: null,
			content: null,
			options: { 
				ok: 'OK',
				cancel: null
			}
		}

		this.options = utils.extend({}, options, params);

		self.overlay = document.createElement("div");
		self.overlay.className = 'dialog-filter';

		self.dialog = document.createElement("div");
		self.dialog.className = 'dialog';

		if (self.options.title){
			var title = document.createElement("div");
			title.className = 'dialog__title';
			title.innerHTML = self.options.title;
			self.dialog.appendChild(title);
		}

		if (self.options.content){
			var content = document.createElement("div");
			content.className = 'dialog__content';
			content.innerHTML = self.options.content;
			self.dialog.appendChild(content);
		}

		var actions = document.createElement("div");
		actions.className = 'dialog__actions';

		if (self.options.options.cancel){
			self.btnCancel = document.createElement('button');
			self.btnCancel.className = 'btn btn--m btn--red btn--flat btn--ripple';
			self.btnCancel.innerHTML = self.options.options.cancel;
			actions.appendChild(self.btnCancel);
		}

		self.btnOk = document.createElement('button');
		self.btnOk.className = 'btn btn--m btn--blue btn--flat btn--ripple';
		self.btnOk.innerHTML = self.options.options.ok;
		actions.appendChild(self.btnOk);

		self.dialog.appendChild(actions);

		document.body.appendChild(self.overlay);
		document.body.appendChild(self.dialog);
	
		return self;
	}

	Dialog.prototype.show = function(confirmCallback, cancelCallback){

		var self = this;

		setTimeout(function(){ 
			this.overlay.classList.add('dialog-filter--is-shown');
			this.dialog.classList.add('dialog--is-shown');
		}.bind(self), 0);

		self.btnOk.addEventListener('click', function(){
			confirmCallback()
		});

		if (self.btnCancel){
			self.btnCancel.addEventListener('click', function(){
				cancelCallback();
			});
		}

		self.overlay.addEventListener('click', function(){
			self.hide();
		}, false);

		return self;

	}

	Dialog.prototype.hide = function(){

		var self = this;

		setTimeout(function(){ 
			var self = this;
			self.overlay.classList.remove('dialog-filter--is-shown');
			self.dialog.classList.remove('dialog--is-shown');

			
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

	return Dialog;

})();

module.exports = Dialog;