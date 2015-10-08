import DOM from './utils/dom';
import SideMenu from './components/side-menu';
import PullToRefresh from './components/pull-to-refresh';
import Buttons from './components/button';
import DropDownMenu from './components/dropdown-menu';
import Navigation from './components/navigation';
import Dialog from './components/dialog';
import Loading from './components/loading';
import Notification from './components/notification';
import TabBar from './components/tab-bar.js';
import InfiniteScroll from './components/infinite-scroll.js';
import shrinkHeader from './components/shrink-header.js';

var phonepack = function(selector) {
	return DOM(selector);
};

phonepack.SideMenu = SideMenu;
phonepack.PullToRefresh = PullToRefresh;
phonepack.Navigation = Navigation;
phonepack.DropDownMenu = DropDownMenu;
phonepack.Dialog = Dialog;
phonepack.Loading = Loading;
phonepack.Notification = Notification;
phonepack.TabBar = TabBar;
phonepack.InfiniteScroll = InfiniteScroll;
phonepack.shrinkHeader = shrinkHeader;

phonepack.ready = function(callback) {
	document.addEventListener('DOMContentLoaded', function() {
		callback();
	});
};

module.exports = phonepack;
