var dom = (function(){

	var eventsClickListeners = [];

	document.addEventListener('click', clickEvents, false);

	function clousestClass(el, className) {

		if (verifyClass(el, className)){
			return el;
		}

		function verifyClass(el){
			if (el.classList.contains(className)) {
		      return el;
		    }
		}

	  	while (el && el.parentNode) {
		    el = el.parentNode;
		    if (el.classList) {
			      return verifyClass(el, className);
			}
	  	}

	  	return null;
	}

	function clickEvents(e){
		var element = e.target;

		eventsClickListeners.forEach(function(ev){
			var el = clousestClass(element, ev.element);
			if (el){
				ev.fn(e);
			}
		});
	}

	function DOM(element){
		this.element = element;
		return this;
	}

	DOM.prototype.click = function(callback){
		eventsClickListeners.push({ element: this.element, fn: callback });
	}


	function element(element) {
		return new DOM(element);
	}

	return element;

})();

module.exports = dom;