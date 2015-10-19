var removed = false;

document.addEventListener('click', function(e) {
	removed = false;

	var elements = document.getElementsByClassName('dropdown-menu');
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].classList.contains('dropdown-menu--is-shown')) {
			elements[i].classList.remove('dropdown-menu--is-shown');
			removed = true;
		}
	}

}, true);

function DropDownMenu(element, elMenu, position) {
	var self = this;

	self.element = element;
	self.elMenu = elMenu;
	self.position = position || 'left';

	self.element.addEventListener('click', function() {

		if (self.elMenu.classList.contains('dropdown-menu--is-shown')) {
			self.elMenu.classList.remove('dropdown-menu--is-shown');
		}
		else if (!removed) {
			var target = self.element.getBoundingClientRect();

			self.elMenu.style.top = target.top + 'px';
			if (self.position === 'left') {
				self.elMenu.style.left = ((target.left - document.body.scrollLeft) - 150) + 'px';
			}
			else if (self.position === 'right') {
				self.elMenu.style.left = (((target.left) - document.body.scrollLeft) + 100) + 'px';
			}
			self.elMenu.classList.add('dropdown-menu--is-shown');
		}

		removed = false;

	}, false);

}

export default DropDownMenu;