import $ from '../utils/dom';

export default function shrinkHeader(element) {
    let pages = element.parentElement;
    let _content = pages.querySelectorAll('.content');
    let _lastScrollTop = 0;

    element.classList.add('header--shrink');

    [].forEach.call(_content, function(el) {
        el.addEventListener('scroll', handlerScroll);
    });

    function handlerScroll(e) {
        let _el = e.target;
        let _st = _el.scrollTop;
        let _top = $(_el).style('padding-top').replace('px', '');

        if (_el.scrollTop >= _top) {
            if (_st > _lastScrollTop) {
                _el.classList.add('is-shrink');
                element.classList.add('header--shrink-hide');
            }
            else {
                element.classList.remove('header--shrink-hide');
                _el.classList.remove('is-shrink');
            }
        }
        _lastScrollTop = _st;
    }
}