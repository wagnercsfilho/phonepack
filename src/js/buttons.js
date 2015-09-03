var utils = require('./utils');

module.exports = function() {

    var addRippleEffect = function (e) {
        var target = e.target;

        if ((target.classList.contains('button--ripple')) 
            || (utils.clousestClass(target, 'button--ripple')) 
            || (utils.clousestClass(target, 'tab--ripple')) 
            || (target.classList.contains('tab--ripple'))) {
            
            var rect = target.getBoundingClientRect();
            var ripple = target.querySelector('.button--ripple__animation');
            
            if (!ripple) {
                ripple = document.createElement('span');
                ripple.className = 'button--ripple__animation';
                ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
                target.appendChild(ripple);
            }
            
            ripple.classList.remove('show');
            var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
            var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
            ripple.style.top = top + 'px';
            ripple.style.left = left + 'px';
            ripple.classList.add('show');
        }

        return false;
    }

    document.addEventListener('click', addRippleEffect, false);

}