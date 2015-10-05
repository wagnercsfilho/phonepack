import utils from '../utils/utils';

var listenCLoseSlideMenu = function(element) {
	var self = this;
	element.addEventListener('click', function() {
		self.toggle();
	});
};

var removeListenCLoseSlideMenu = function(element) {
	element.removeEventListener("click");
};

class SideMenu {

	constructor(element, options) {

		var _options = {
			overlay: true
		};

		this.element = element;
		this.options = utils.extend({}, _options, options);
	}

	toggle() {

		if (!this.element.classList.contains('visible')) {

			var overlay = document.createElement("div");
			if (this.options.overlay) {
				overlay.className = 'overlay';
			}
			else {
				overlay.className = 'overlay transparent';
			}
			document.body.appendChild(overlay);
			listenCLoseSlideMenu.call(this, overlay);

			this.element.classList.add('visible');


		}
		else {
			this.element.classList.remove('visible');

			var overlays = document.getElementsByClassName("overlay");
			removeListenCLoseSlideMenu.call(this, overlays[0]);
			document.body.removeChild(overlays[0]);
		}

	}

}

export default SideMenu;