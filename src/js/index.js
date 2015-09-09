var utils = require('./utils');
var _FastClick = require('./fastclick');
var _SlideMenu = require('./slide-menu');
var _PullToRefresh = require('./pull-to-refresh');
var _Buttons = require('./buttons');
var _DropDownMenu = require('./dropdown-menu');
var _Pages = require('./navigation');
var _Dialog = require('./dialog');
var _Loading = require('./loading');
var _Notification = require('./notification');



var PhonePack = (function(){
	
	
	function PhonePack(settings) {

		var _config = {
			fastClick: true
		}

		if (settings){
			_config = utils.extend({}, _config, settings);
		}
		
		if (_config.fastClick){
			_FastClick(document.body);
		}
		
		_Buttons();
		
		return {
			SlideMenu: _SlideMenu,
			PullToRefresh: _PullToRefresh,
			Pages: _Pages,
			DropDownMenu: _DropDownMenu, 
			Dialog: _Dialog,
			Loading: _Loading,
			Notification: _Notification
			
		}
		
	


	}

	return PhonePack;
		
})();

window.PhonePack = PhonePack;



