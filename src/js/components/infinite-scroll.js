import utils from '../utils/utils';

class InfiniteScroll {

    constructor(element, options, callback) {
        var self = this;
        var _options = {
            distance: 0
        };

        self.options = utils.extend({}, _options, options);
        self.isShown = false;

        self.loadEl = document.createElement('div');
        self.loadEl.className = 'infinite-scroll-loading';
        self.loadEl.innerHTML = '<div class="spinner--infinite-scroll"></div>';
        element.appendChild(self.loadEl);

        element.addEventListener('scroll', function(e) {

            if (element.scrollTop + element.offsetHeight >= element.scrollHeight - self.options.distance && (!self.isShown)) {
                self.loadEl.classList.add('is-shown');
                self.isShown = true; 
                callback();
            }

        }, false);
    }

    hide() {
        this.loadEl.classList.remove('is-shown');
        this.isShown = false;
    }

}

export default InfiniteScroll;