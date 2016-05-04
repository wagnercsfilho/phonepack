import utils from '../utils/utils';

class Loading {

	constructor(params) {
		var that = this;

		var options = {
			title: null,
			spinner: true,
			overlay: true
		};

		this.options = utils.extend({}, options, params);

		that.overlay = document.createElement("div");
		that.overlay.className = 'loading-filter';

		that.dialog = document.createElement("div");
		that.dialog.className = 'loading';

		var main = document.createElement("div");
		main.className = 'loading__main';

		if (this.options.spinner) {
			var spinner = document.createElement("div");
			spinner.className = 'loading__spinner';

			var sp = '<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' +
				' <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>' +
				'</svg>';
			spinner.innerHTML = sp;
			main.appendChild(spinner);

			if (!that.options.title) {
				spinner.style.padding = 0;
			}

		}

		if (that.options.title) {
			var title = document.createElement("div");
			title.className = 'loading__title';
			title.innerHTML = that.options.title;
			main.appendChild(title);
		}

		that.dialog.appendChild(main);

		document.body.appendChild(that.overlay);
		document.body.appendChild(that.dialog);

		return that;
	}

	show(confirmCallback, cancelCallback) {
		var that = this;

		setTimeout(function() { 
			if (that.options.overlay) {
				that.overlay.classList.add('loading-filter--is-shown');
			} else {
				that.dialog.classList.add('loading--no-box-shadow');
			}
			that.dialog.classList.add('loading--is-shown');
		}, 0);

		return that;

	}

	hide() {
		var that = this;

		that.overlay.addEventListener('webkitTransitionEnd', function() {
			that.overlay.remove();
		});

		that.overlay.addEventListener('transitionend', function() {
			that.overlay.remove();
		});

		that.dialog.addEventListener('webkitTransitionEnd', function() {
			that.dialog.remove();
		});

		that.dialog.addEventListener('transitionend', function() {
			that.dialog.remove();
		});

		setTimeout(function() {

			if (that.options.overlay) {
				that.overlay.classList.remove('loading-filter--is-shown');
			}
			else {
				that.overlay.remove();
			}

			that.dialog.classList.remove('loading--is-shown');

		}, 0);

		return that;
	}

}

export default Loading;