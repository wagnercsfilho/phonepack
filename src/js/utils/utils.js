module.exports = {

	extend: function(a, b){
		for(var i=1; i<arguments.length; i++)
        for(var key in arguments[i])
            if(arguments[i].hasOwnProperty(key))
                arguments[0][key] = arguments[i][key];
    	return arguments[0];
	},

	clousestClass: function(el, className) {

	  while (el && el.parentNode) {
	    el = el.parentNode;
	    if (el.classList)
		    if (el.classList.contains(className)) {
		      return el;
		    }
	  }

	  return null;
	}

}