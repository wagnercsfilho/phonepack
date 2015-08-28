var pages = null;
var slideMenu = null;

var IndexController = function(){

    var self = this;

    var openMenu = document.getElementById('openMenu');
    openMenu.addEventListener('click', function(e) {
        slideMenu.toggle();

        return false;
    });

    var openDropMenu = document.getElementById('openDropMenu');
    openDropMenu.addEventListener('click', function(e) {

        var dropMenu = new nyna.DropDownMenu(openDropMenu, document.getElementById('dropMenu'));

        return false;
    }, true);

    var openAlert = document.getElementById('openAlert');
    openAlert.addEventListener('click', function(e) {
        
        var dialog = new nyna.Dialog({
            title: 'Loading...',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet urna quis nisi sodales semper pharetra eu augue.',         
        }).show(function(){
            dialog.hide();
        });

        return false;
    }, true);

    var openLoading = document.getElementById('openLoading');
    openLoading.addEventListener('click', function(e) {
        
        var loading = new nyna.Loading({
            title: 'Loading...',
        }).show();

        setTimeout(function() {
            loading.hide();
        }, 10000);

        return false;
    }, true);

    var openNotification = document.getElementById('openNotification');
    openNotification.addEventListener('click', function(e) {
        
        var notification = new nyna.Notification('Loading', {
            type: 'warning'
        }).show();

        return false;
    }, true);


}

var ButtonsController = function(){

    var self = this;

    var openMenu = document.getElementById('openMenu');
    openMenu.addEventListener('click', function(e) {
        slideMenu.toggle();

        return false;
    }, false);


}

var ListsController = function(){

    var self = this;

    var openMenu = document.getElementById('openMenu');
    openMenu.addEventListener('click', function(e) {
        slideMenu.toggle();

        return false;
    }, false);

}

var CheckBoxController = function(){

    var self = this;

    var openMenu = document.getElementById('openMenu');
    openMenu.addEventListener('click', function(e) {
        slideMenu.toggle();

        return false;
    }, false);

}

var TextFieldsController = function(){

    var self = this;

    var openMenu = document.getElementById('openMenu');
    openMenu.addEventListener('click', function(e) {
        slideMenu.toggle();

        return false;
    }, false);
}

var RadioButtonController = function(){

    var self = this;

    var openMenu = document.getElementById('openMenu');
    openMenu.addEventListener('click', function(e) {
        slideMenu.toggle();

        return false;
    }, false);
}

var SwitchesController = function(){

    var self = this;

    var openMenu = document.getElementById('openMenu');
    openMenu.addEventListener('click', function(e) {
        slideMenu.toggle();

        return false;
    }, false);
}

var PagesController = function(){

    var self = this;

    var openMenu = document.getElementById('openMenu');
    openMenu.addEventListener('click', function(e) {
        slideMenu.toggle();

        return false;
    }, false);

    var openPage1 = document.getElementById('openPage1');
    openPage1.addEventListener('click', function(e) {
        
        pages.pushPage('pages/pages-1.html', function(){
            document.querySelector('#close').addEventListener('click', function(){
                pages.closeCurrentPage();
                return false;
            });
        });

        return false;
    }, false);

}

document.addEventListener('DOMContentLoaded', function() {

    slideMenuElement = document.getElementById('slide-menu');
    slideMenu = new nyna.slideMenu(slideMenuElement, {
        overlay: false
    });

    pages = new nyna.Pages(document.getElementById('pages'));
    pages.changePage('pages/header.html', function(){
        var Index = new IndexController();
    });

    document.getElementById('pageHeader')
        .addEventListener('click', function(e) {
            pages.changePage('pages/header.html', function(){
                IndexController();
                slideMenu.toggle();
            });
        });

    document.getElementById('pageButtons')
        .addEventListener('click', function(e) {
            pages.changePage('pages/buttons.html', function(){
                ButtonsController();
                slideMenu.toggle();
            });
        });

    document.getElementById('pageLists')
        .addEventListener('click', function(e) {
            pages.changePage('pages/lists.html', function(){
                ListsController();
                slideMenu.toggle();
            });
        });

    document.getElementById('pageCheckbox')
        .addEventListener('click', function(e) {
            pages.changePage('pages/checkbox.html', function(){
                CheckBoxController();
                slideMenu.toggle();
            });
        });

    document.getElementById('pageTextField')
        .addEventListener('click', function(e) {
            pages.changePage('pages/text-field.html', function(){
                TextFieldsController();
                slideMenu.toggle();
            });
        });

    document.getElementById('pageRadioButton')
        .addEventListener('click', function(e) {
            pages.changePage('pages/radio-button.html', function(){
                RadioButtonController();
                slideMenu.toggle();
            });
        });

    document.getElementById('pageSwitches')
        .addEventListener('click', function(e) {
            pages.changePage('pages/switches.html', function(){
                SwitchesController();
                slideMenu.toggle();
            });
        });

    document.getElementById('pagePages')
        .addEventListener('click', function(e) {
            pages.changePage('pages/pages.html', function(){
                PagesController();
                slideMenu.toggle();
            });
        });

}, false);