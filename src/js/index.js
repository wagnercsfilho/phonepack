var utils = require('./utils/utils'),
	dom = require('./utils/dom'), 
	FastClick = require('./libs/fastclick'),
	SideMenu = require('./components/side-menu'),
	PullToRefresh = require('./components/pull-to-refresh'),
	Buttons = require('./components/button'),
	DropDownMenu = require('./components/dropdown-menu'),
	Navigation = require('./components/navigation'),
	Dialog = require('./components/dialog'),
	Loading = require('./components/loading'),
	Notification = require('./components/notification');
 
(function(){

	var PhonePack = (function(){	
		
			return {
				SideMenu: SideMenu,
				PullToRefresh: PullToRefresh,
				Navigation: Navigation,
				DropDownMenu: DropDownMenu, 
				Dialog: Dialog,
				Loading: Loading,
				Notification: Notification		
			}
	
	})();
	
	window.phonepack = PhonePack;
	
})();



