AA.inView = (function(){

    function visibleY(el){
        var rect = el.getBoundingClientRect(),
            top = rect.top,
            height = rect.height,
            el = el.parentNode;
        do {
            rect = el.getBoundingClientRect();
            if (top <= rect.bottom === false) return false;
            if ((top + height) <= rect.top) return false;
            el = el.parentNode;
        } while (el != document.body);
        return top <= document.documentElement.clientHeight - el.offsetHeight;
    }

    function inView(){
        var container = document.getElementsByTagName('main');
        var arts = container[0].getElementsByTagName('article');
        var tn = document.getElementById('top-navigation');

        document.addEventListener('scroll', function() {
            for (var i = 0; i < arts.length; i++) {
                if(visibleY(arts[i])){
                    if(hasClass(arts[i], 'menu-dark')) {
                        addClass(tn, 'dark');
                        addClass(tn, 'logo-red');
                    }else{
                        removeClass(tn, 'dark');
                    }
                }
            }
        });
    }

    return {
        init: inView
    }
})();

AA.inView.init();