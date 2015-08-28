/*
	document.addEventListener('DOMContentLoaded', function() {
		var mozi = new Mozi({
			fastClick: true
		});
	}, false);
*/

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

var Phonepack = (function(){
	
	function Phonepack(settings) {

		var _config = {
			fastClick: true
		}

		if (settings){
			_config = utils.extend({}, _config, settings);
		}

		var _trigger = function() {
			buttons();
		}

		return {
			SlideMenu: _SlideMenu,
			PullToRefresh: _PullToRefresh,
			Pages: _Pages,
			DropDownMenu: _DropDownMenu, 
			Dialog: _Dialog,
			Loading: _Loading,
			Notification: _Notification,
			trigger: _trigger
		}

		if (config.fastClick){
			FastClick(document.body);
		}

		_trigger();

	}

	return Mozi;
		
	};

})();

window.Phonepack = Phonepack;



