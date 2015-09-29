import $ from '../utils/dom';

var Buttons = (function() {

    $('.button--ripple').on('click', addRippleEffect);
    $('.tab--ripple').on('click', addRippleEffect);


    function addRippleEffect(e) {
        var target = e.target;

        var rect = target.getBoundingClientRect();
        var ripple = target.querySelector('.button--ripple__animation');

        if (!ripple) {
            ripple = document.createElement('span');
            ripple.className = 'button--ripple__animation';
            ripple.style.height = ripple.style.width = Math.max(rect.width * 2, rect.height * 2) + 'px';
            target.appendChild(ripple);
        }

        ripple.classList.remove('show');
        var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
        var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
        ripple.style.top = top + 'px';
        ripple.style.left = left + 'px';
        ripple.classList.add('show');

        return false;
    }

    function floatButton(element) {
        var btn = document.querySelector('.button--fab-floating');
        var lastScrollTop = 0;

        element.addEventListener("scroll", hideShowOnScroll);

        function hideShowOnScroll(e) {
            var st = this.scrollTop;
            if (st > lastScrollTop) {
                btn.classList.add('hidden');
            }
            else {
                btn.classList.remove('hidden');
            }
            lastScrollTop = st;
        }
    }

    return {
        floatButton: floatButton
    };

})();

export default Buttons;