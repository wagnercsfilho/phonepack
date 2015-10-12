import $ from '../utils/dom';

class TabBar {

    constructor(element) {
        var contentsTabs = $('.content');
        if (contentsTabs) {
            contentsTabs.addClass('tab-hide').addClass('content--tab');

            var activeTab = element.querySelector('.active');
            if (activeTab) {
                $(activeTab.getAttribute('ref')).removeClass('tab-hide').addClass('tab-show');
            }
        }

        $('.tab-bar__item').on('click', function(e, element) {
            let content = $(element.getAttribute('ref'));
            $('.content').removeClass('tab-show').addClass('tab-hide');
            content.removeClass('tab-hide').addClass('tab-show');
            $('.tab-bar__item').removeClass('active');
            element.classList.add('active');
        });
    }

}

export default TabBar;