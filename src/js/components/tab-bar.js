import $ from '../utils/dom';

class TabBar {

    constructor(element) {
        var contentsTabs = element.querySelectorAll('.content');
        if (contentsTabs) {
            $(contentsTabs).addClass('tab-hide').addClass('content--tab');

            let activeTab = element.querySelector('.active');
            if (activeTab) {
                let contentId = activeTab.getAttribute('ref') || activeTab.getAttribute('data-tab');
                $(element.querySelectorAll(contentId)).removeClass('tab-hide').addClass('tab-show');
            }
        }

        $('.tab-bar__item', element).on('click', function(e, el) {
            let contentId = el.getAttribute('ref') || el.getAttribute('data-tab');
            let content = $(element.querySelectorAll(contentId));
            $(contentsTabs).removeClass('tab-show').addClass('tab-hide');
            content.removeClass('tab-hide').addClass('tab-show');
            $(element.querySelectorAll('.tab-bar__item')).removeClass('active');
            el.classList.add('active');
        });
    }

}

export default TabBar;