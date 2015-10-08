export default function shrinkHeader(element) {
    let _content = document.querySelectorAll('.content');
    let _lastScrollTop = 0;
    let _subHeader = document.querySelector('.sub-header');

    element.classList.add('header--shrink');

    [].forEach.call(_content, function(el) {
        el.addEventListener('scroll', handlerScroll);
    });

    function handlerScroll(e) {
        let _el = e.target;
        let _st = _el.scrollTop;

        if (_st > _lastScrollTop) {
            element.classList.add('header--shrink-hide');
        }
        else {
            element.classList.remove('header--shrink-hide');
        }
        _lastScrollTop = _st;
    }
}