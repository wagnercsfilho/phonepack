var utils = require('./utils/utils'),
	dom = require('./utils/dom'), 
	FastClick = require('./libs/fastclick'),
	SlideMenu = require('./components/slide-menu'),
	PullToRefresh = require('./components/pull-to-refresh'),
	Buttons = require('./components/button'),
	DropDownMenu = require('./components/dropdown-menu'),
	Pages = require('./components/navigation'),
	Dialog = require('./components/dialog'),
	Loading = require('./components/loading'),
	Notification = require('./components/notification');
 
var PhonePack = (function(){	
	
	function PhonePack(options) {

		var _options = {
			fastClick: true
		}

		if (options){
			_options = utils.extend({}, _options, options);
		}
		
		if (_options.fastClick){
			FastClick(document.body);
		}
				
		return {
			SlideMenu: SlideMenu,
			PullToRefresh: PullToRefresh,
			Pages: Pages,
			DropDownMenu: DropDownMenu, 
			Dialog: Dialog,
			Loading: Loading,
			Notification: Notification		
		}

	}

	return PhonePack;
		
})();

window.PhonePack = PhonePack;



