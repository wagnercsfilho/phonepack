import $ from '../utils/dom';

class TabBar {

    constructor(element) {
        let contentsTabs = $('.content');
        if (contentsTabs) {
            contentsTabs.addClass('tab-hide').addClass('content--tab');

            let activeTab = element.querySelector('.active');
            if (activeTab) {
                let contentId = activeTab.getAttribute('ref') || activeTab.getAttribute('tab');
                $(contentId).removeClass('tab-hide').addClass('tab-show');
            }
        } 

        $('.tab-bar__item').on('click', function(e, element) {
            let contentId = element.getAttribute('ref') || element.getAttribute('tab');
            let content = $(contentId);
            $('.content').removeClass('tab-show').addClass('tab-hide');
            content.removeClass('tab-hide').addClass('tab-show');
            $('.tab-bar__item').removeClass('active');
            element.classList.add('active');
        });
    }

}

export default TabBar;