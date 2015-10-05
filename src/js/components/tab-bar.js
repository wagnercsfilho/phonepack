import $ from '../utils/dom';

class TabBar {

    constructor(element) {
        var contentsEl = $('.content');
        contentsEl.addClass('tab-hide').addClass('content--tab');
        
        var activeTab = element.querySelector('.active');
        if (activeTab){
            let selectorContent = activeTab.getAttribute('ref');
            let content = $(selectorContent).removeClass('tab-hide').addClass('tab-show');
        }
        
        $('.tab-bar__item').on('click', function(e, target){
            let element = target;
            let selectorContent = element.getAttribute('ref');
            let content = $(selectorContent);
            contentsEl.removeClass('tab-show').addClass('tab-hide');
            content.removeClass('tab-hide').addClass('tab-show');
            
            $('.tab-bar__item').removeClass('active');
            element.classList.add('active');
            
        });
    }

}

export default TabBar;