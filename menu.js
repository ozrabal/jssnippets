AA.Menu = (function(){

    var projectLink = document.getElementById('projects');
    var projectMenu = document.getElementById('project-menu');
    var menuRight = document.getElementById('menu-right');
    var menuRightItems =  menuRight.getElementsByTagName('li');
    var menuLeft = document.getElementById('menu-left');
    var menuMain = document.getElementById('top-navigation');
    var oldClass;
    var defaultMenuItem = 'aquanet';


    function reset(){
        var active = document.querySelector('article.open');
        if(active){
            active.classList.remove('open');
        }
    }

    function menuAddClassArray(element, classes){
        if(classes) {
            var classesArray = classes.split(' ');
            for (var i = 0; i < classesArray.length; i++) {
                addClass(element, classesArray[i]);
            }
        }
    }

    function openPanels(){
        oldClass = menuMain.className;
        addClass(menuMain, 'dark');
        addClass(projectMenu, 'open');
        addClass(menuRight,'open');
        addClass(menuLeft, 'open');
    }

    function closePanels(){
        removeClass(menuMain, 'dark');
        //console.log(oldClass);
        menuAddClassArray(menuMain, oldClass);
        removeClass(menuRight, 'open');
        removeClass(menuLeft, 'open');
        window.setTimeout(function(){
            removeClass(projectMenu, 'open');
        },1000);
    }

    function toggle(){
        projectLink.addEventListener('click', function(){
            if (!projectMenu.classList.contains('open')) {
                addClass(this, 'active');
                openPanels();
            } else {
                removeClass(this, 'active');
                closePanels();
            }
        });
    }

    function activateCurrentMenuItem() {
        var currentPage = window.location.pathname.substring(1).split('.');
        console.log(currentPage);
        if(!currentPage || currentPage == '' || currentPage[0] == 'index' ){
            currentPage[0] = defaultMenuItem;
        }
        var currentEl = document.getElementById('menu-' + currentPage[0]);
        if (currentEl) {
            addClass(currentEl, 'swiper-pagination-bullet-active');
        }
        var currentPanel = document.getElementById(currentPage[0]);
        if (currentPanel) {
            addClass(currentPanel, 'open');
        }
    }

    function menu(){
        var width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        for(var i= 0; i < menuRightItems.length; i++ ){
            //click sm
            menuRightItems[i].addEventListener('click', function(e){
                if(width > 767) {
                    e.preventDefault();
                    return false;
                }
            });
            menuRightItems[i].addEventListener('click', function(){

                if(!this.classList.contains('swiper-pagination-bullet-active')) {
                    var activeElement = menuRight.getElementsByClassName('swiper-pagination-bullet-active');
                    if(activeElement.length > 0) {
                        removeClass(activeElement[0], 'swiper-pagination-bullet-active');
                    }
                    addClass(this, 'swiper-pagination-bullet-active');
                    var slideTo = this.getAttribute('data-slide');
                    const closing = document.querySelector('article.closing');
                    if (closing) {
                        removeClass(closing, 'closing');
                    }
                    var openedPanels = document.querySelectorAll('article.open');
                    for(var i = 0; i < openedPanels.length; i++){
                        addClass(openedPanels[i], 'closing');
                        removeClass(openedPanels[i], 'open');
                    }
                    const active = document.querySelector('article.open');
                    if (active) {
                        removeClass(active, 'open');
                        addClass(active, 'closing');
                    }
                    document.getElementById(slideTo).classList.add('open');
                }
            });
        }
    }

    function init(){
        window.scrollTo(0,0);
        reset();
        toggle();
        activateCurrentMenuItem();
        menu();
    }

    return {
        init: init
    }
})();

AA.Menu.init();