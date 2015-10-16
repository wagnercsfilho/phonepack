import utils from '../utils/utils';

var removed = false;

document.addEventListener('click', function(e) {
	var _target = e.target;

	removed = false;

	var elements = document.getElementsByClassName('dropdown-menu');
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].classList.contains('visible')) {
			elements[i].classList.remove('visible');
			removed = true;
		}
	}

}, true);

function DropDownMenu(element, elMenu) {
	var self = this;

	self.element = element;
	self.elMenu = elMenu;

	self.element.addEventListener('click', function() {
		
		if (self.elMenu.classList.contains('visible')) {
			self.elMenu.classList.remove('visible');
		}
		else if (!removed) {
			var target = self.element.getBoundingClientRect();

			self.elMenu.style.top = target.top + 'px';
			self.elMenu.style.left = ((target.left - document.body.scrollLeft) - 150) + 'px';
			self.elMenu.classList.add('visible');
		}

		removed = false;
		
	}, false);

}

export default DropDownMenu;