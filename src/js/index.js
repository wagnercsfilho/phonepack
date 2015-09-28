import SideMenu from './components/side-menu';
import PullToRefresh from './components/pull-to-refresh';
import Buttons from './components/button';
import DropDownMenu from './components/dropdown-menu';
import Navigation from './components/navigation';
import Dialog from './components/dialog';
import Loading from './components/loading';
import Notification from './components/notification';

var phonepack = (function() {

	return {
		SideMenu: SideMenu,
		PullToRefresh: PullToRefresh,
		Navigation: Navigation,
		DropDownMenu: DropDownMenu,
		Dialog: Dialog,
		Loading: Loading,
		Notification: Notification
	};

})();

module.exports = phonepack;
