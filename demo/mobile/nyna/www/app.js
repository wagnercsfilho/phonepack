var pages = null;
var slideMenu = null;

var IndexController = function(){

    var self = this;

    this.openSlideMenu = function(){
        slideMenu.toggle();
    }

    this.trigger = function(){
        Prism.highlightAll();
    }

    this.listener = function(){
        var openMenu = document.getElementById('openMenu');
        openMenu.addEventListener('click', function(e) {
            self.openSlideMenu();
        }, false);
    }

    self.listener();
    self.trigger();
}

var ButtonsController = function(){

    var self = this;

    this.openSlideMenu = function(){
        slideMenu.toggle();
    }

    this.trigger = function(){
        Prism.highlightAll();
    }

    this.listener = function(){
        var openMenu = document.getElementById('openMenu');
        openMenu.addEventListener('touchstart', function(e) {
            self.openSlideMenu();
        });
    }

    self.listener();
    self.trigger();
    nyna.trigger();

}

document.addEventListener('DOMContentLoaded', function() {



    slideMenuElement = document.getElementById('slide-menu');
    slideMenu = new nyna.slideMenu(slideMenuElement);

    pages = new nyna.Pages(document.getElementById('pages'));
    pages.changePage('pages/header.html', function(){

        var Index = new IndexController();
    });

    document.getElementById('pageHeader')
        .addEventListener('touchstart', function(e) {
            pages.changePage('pages/header.html', function(){
                var Index = new IndexController();
                slideMenu.toggle();
            });
        });

    document.getElementById('pageButtons')
        .addEventListener('touchstart', function(e) {
            pages.changePage('pages/buttons.html', function(){
                var Buttons = new ButtonsController();
                slideMenu.toggle();
            });
        });

}, false);

