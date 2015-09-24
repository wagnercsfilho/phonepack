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
	
		return {
			SlideMenu: SlideMenu,
			PullToRefresh: PullToRefresh,
			Pages: Pages,
			DropDownMenu: DropDownMenu, 
			Dialog: Dialog,
			Loading: Loading,
			Notification: Notification		
		}

})();

window.phonepack = PhonePack;



