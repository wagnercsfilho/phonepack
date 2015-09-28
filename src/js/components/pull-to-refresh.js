var pullToRefresh = function(element) {

	var top, // left position of moving box
		starty, // starting x coordinate of touch point
		dist = 0, // distance traveled by touch point
		touchobj,
		content = null; // Touch object holder

	this.element = element;

	this.element.addEventListener('touchstart', function(e) {
		touchobj = e.changedouches[0];
		top = parseInt(content.style.top);
		starty = parseInt(touchobj.clientY);
		e.preventDefault();
	}, false);

	this.element.addEventListener('touchmove', function(e) {
		touchobj = e.changedTouches[0];
		dist = parseInt(touchobj.clientY) - starty;
		content.style.top = top + dist + 'px';
		e.preventDefault();
	}, false);

	this.element.addEventListener('touchend', function(e) {
		content.style.top = 56 + 'px';
		e.preventDefault();
	}, false);
};

export default pullToRefresh;