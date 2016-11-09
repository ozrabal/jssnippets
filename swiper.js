AA.Swiper = (function(){

    var swiperContainer = document.getElementById('swiper-container');
    var swiperProjectContainer = document.getElementById('swiper-project-container');
    var swiperNestedContainer = document.getElementById('swiper-nested-container');
    //var swiperInstance;
    var topNavigation = document.getElementById('top-navigation');
    var swiperPagination = document.getElementById('swiper-pagination');
    var _slidesMap= {};
    var _bullets = {};
    //var_horizontalSwiper = {};



    function init(){
        if(swiperPagination) {
            _bullets = swiperPagination.getElementsByTagName('span');
        }
        if(swiperNestedContainer) {
            _horizontalSwiper = horizontalSwiper = horizontalSwiperInit();
            _clearBulletsState();
        }
        if(swiperContainer) {
            _verticalSwiper = swiperInstance = swiperInit();
            //swiperPaginationInit();

        }

        if(swiperProjectContainer) {
            _swiperProjectInit();
        }
        if(swiperPagination) {
            _paginationInit();
        }
        //console.warn(_slidesMap);
        //swiperOnChange();
        //swiperOnChangeEnd();
        contactLink();
    }

    function swiperOnInit(){
        console.log('swiperOnInit');
        /*var hash = window.location.hash;
        hash = hash.slice(1);
        if(hash){

            topNavColor();
        }*/
        topNavColor();
        markBullet(_getHash(), _bullets);
        videoStart();
    }


    function _getHash(){
        var hash = window.location.hash.slice(1);
        if(hash){
            return hash;
        }
        return 'start';
    }

    function _clearBulletsState(){
        for (var i = 0; i < _bullets.length; i++) {
            removeClass(_bullets[i], 'swiper-pagination-bullet-active');
        }
    }

    function _paginationInit(){
        _slidesMap.vertical = _slideHashMap(_verticalSwiper.slides);
        _slidesMap.horizontal = _slideHashMap(_horizontalSwiper.slides);
        for(var i=0; i<_bullets.length; i++){
            _bullets[i].addEventListener('click', function(){
                if(this.dataset.parent){
                    _horizontalSwiper.slideTo(_slidesMap.horizontal[this.dataset.slide]);
                    _verticalSwiper.slideTo(_slidesMap.vertical[this.dataset.parent]);
                } else{
                    _verticalSwiper.slideTo(_slidesMap.vertical[this.dataset.slide]);
                }
            });
        }
    }

    function _slideHashMap(slides){
        var map = [];
        for(var i=0; i<slides.length; i++){
            if(slides[i].dataset.hash) {
                map[slides[i].dataset.hash] = i;
            }
        }
        return map;
    }





/*    function swiperPaginationInit(){
        if(swiperPagination){

            var bulletsa = swiperPagination.getElementsByClassName('swiper-a');

            for (i = 0; i < bulletsa.length; i++) {
                bulletsa[i].addEventListener('click', function (e) {
                    clearBulletsState();
                    swiperInstance.slideTo(this.dataset.slidea);
                })
            }

            var bulletsb = swiperPagination.getElementsByClassName('swiper-b');

            for (i = 0; i < bulletsb.length; i++) {
                bulletsb[i].addEventListener('click', function (e) {
                    clearBulletsState();
                    swiperInstance.slideTo(this.dataset.slidea);
                    swiper.slideTo(this.dataset.slideb );
                })
            }
        }
    }*/


    function swiperInit(){
        return new Swiper(swiperContainer, {
            hashnav: true,
            keyboardControl: true,
            direction: 'vertical',
            nextButton: '.icon-arrow-down',
            loop: false,
            mousewheelControl: true,
            onInit: swiperOnInit,
            onSlideChangeEnd: _slideChangeEnd,
            onSlideChangeStart: onSlideChangeStart
        });

    }
    function markBullet(current, bullets){
        _clearBulletsState();
        for (var i = 0; i < bullets.length; i++) {
            if(bullets[i].dataset.slide == current){
                addClass(bullets[i], 'swiper-pagination-bullet-active');
            }
        }
    }

    function onSlideChangeStart(swiperInstance){

        console.log('SlideChangeStart');

        var current = swiperInstance.slides[swiperInstance.activeIndex].dataset.hash;
        var bullets = swiperPagination.getElementsByTagName('span');
        var horizontalActive = horizontalSwiper.slides[horizontalSwiper.activeIndex].dataset.hash;

        if(current == 'projekty'){
            markBullet(horizontalActive, bullets);
        }else{
            markBullet(current, bullets);
        }
        _slideVideoStatePause(swiperInstance);
    }

    function _slideChangeEnd(swiperInstance){
        console.log('SlideChangeEnd');
        menuColor(swiperInstance);
        _slideVideoStatePlay(swiperInstance);
    }

    function _projectSlideChangeStart(swiper){
        console.log('SlideChangeStart');
        _slideVideoStatePause(swiper);
    }

    function _swiperProjectInit(){
        return new Swiper(swiperProjectContainer, {
            direction: 'vertical',
            loop: false,
            mousewheelControl: true,
            scrollbar: '.swiper-scrollbar',
            scrollbarDraggable: true,
            scrollbarHide: true,
            scrollbarSnapOnRelease: true,
            keyboardControl: true,
            breakpoints: {
                768: {
                    slidesPerView: 'auto',
                    mousewheelControl: true,
                    freeMode: true
                }
            },
            onInit: swiperOnInit,
            onSlideChangeStart: _projectSlideChangeStart,
            onSlideChangeEnd: _slideChangeEnd
        });
    }

    function contactLink(){
        var contactLink = document.querySelector('#contact');
        contactLink.addEventListener('click', function(){
            swiperInstance.slideTo(swiperInstance.slides.length - 1);
        });
    }

    function videoStart(){
        var active = document.getElementsByClassName('swiper-slide-active');
        var videos = active[0].getElementsByTagName('video');
        if(videos) {
            for (var i = 0; i < videos.length; i++) {
                videos[i].play();
                console.log('videoPlay');
            }
        }
    }

    function topNavColor(){
        var active = document.getElementsByClassName('swiper-slide-active');
        addClass(topNavigation, 'logo-red');
        addClass(topNavigation, 'dark');
        if (hasClass(active[0], 'logo-red')) {
            addClass(topNavigation, 'logo-red');
            addClass(topNavigation, 'dark');
        } else {
            removeClass(topNavigation, 'logo-red');
            removeClass(topNavigation, 'dark');
        }
    }





/*    function videoInit(swiper){
        var slides = swiper.slides;
        var previousSlide = slides[swiper.previousIndex];
        var previousVideos = previousSlide.getElementsByTagName('video');




        for (var i = 0; i < previousVideos.length; i++) {
            previousVideos[i].pause();
            console.log('pause ', previousVideos[i]);
        }

        var currentSlide = slides[swiper.activeIndex];
        var videos = currentSlide.getElementsByTagName('video');

        for (var i = 0; i < videos.length; i++) {
            videos[i].play();
            console.log('play ', videos[i]);
        }

    }*/

    function menuColor(swiper){
        var classList = topNavigation.classList;

        if (hasClass(swiper.slides[swiper.activeIndex], 'dark')) {
            if (!classList.contains('dark')) {
                classList.add('dark');
            }
            if(swiperPagination) {
                addClass(swiperPagination, 'dark');
            }
        } else {
            if (classList.contains('dark')) {
                classList.remove('dark');
            }
            if(swiperPagination) {
                removeClass(swiperPagination, 'dark');
            }
        }

        if (hasClass(swiper.slides[swiper.activeIndex], 'logo-red')) {
            if (!classList.contains('logo-red')) {
                classList.add('logo-red');
            }
        } else {
            if (classList.contains('logo-red')) {
                classList.remove('logo-red');
            }
        }
    }


    function horizontalSwiperInit(){
        return new Swiper(swiperNestedContainer, {
            keyboardControl: true,
            loop: true,
            loopAdditionalSlides: 0,
            loopedSlides: 0,
            virtualTranslate: true,
            speed: 0,
            grabCursor: true,
            watchSlidesProgress: true,
            //onInit: horizontalOnInit,
            onSlideChangeStart: _horizontalSlideChangeStart,
            onSlideChangeEnd: _horizontalSlideChangeEnd
        });

    }

/*    function horizontalOnInit(swiper){

        //console.log('horizontalOnInit', getHash());

        console.log('horizontal ',swiper.slides[swiper.activeIndex].dataset.hash);

        if(getHash() == 'projekty'){
            //current =
            //slider active hash
        }
        //markBullet(current, swiperPagination.getElementsByTagName('span'));
    }*/

    function _horizontalSlideChangeStart(swiper){

        console.log('horizOnslidechangestart');
        //console.log(swiper.slides);
        //console.log(swiper.activeIndex);
        _slideVideoStatePause(swiper);

       /* var next = swiper.activeIndex + 1;
        if(next == swiper.slides.length ){
            next = 0;
        }*/
        //console.log(next);


        //console.log(Math.abs( swiper.progress * swiper.width ));
        var width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        for (var i = 0; i < swiper.slides.length; i++) {

            $(swiper.slides[i]).css({zIndex: 1});
            if(width > 767) {
                $(swiper.slides[i]).find('.image').css({left: '-100%'});
                //$(swiper.slides[swiper.activeIndex]).find('.image').removeClass('slide-in-left');
                //$(swiper.slides[swiper.activeIndex]).find('.image').addClass('in-left');
            }else{
                $(swiper.slides[i]).find('.image').css({left: '-50%'});
            }
            $(swiper.slides[i]).find('.excerpt').css({left: '-50%'});
        }
        $(swiper.slides[swiper.activeIndex]).css({zIndex: 99});



        var active = swiper.slides[swiper.previousIndex];

        $(active).css({zIndex: swiper.progress });
        if(width > 767) {
            $(active).find('.image').css({left: '50%'});
            //$(swiper.slides[swiper.activeIndex]).find('.image').addClass('in-left');
        }else{
            $(active).find('.image').css({left: '0%'});

        }
        $(active).find('.excerpt').css({left: '0%'});

        if(width > 767) {
            $(swiper.slides[swiper.activeIndex]).find('.image').animate({left: '50%'});
            //$(swiper.slides[swiper.activeIndex]).find('.image').addClass('slide-in-left');
        }else{
            $(swiper.slides[swiper.activeIndex]).find('.image').animate({left: '0%'});

        }
        $(swiper.slides[swiper.activeIndex]).find('.excerpt').animate({left: '0%'});

        markBullet(swiper.slides[swiper.activeIndex].dataset.hash,swiperPagination.getElementsByTagName('span') );

    }

    function _horizontalSlideChangeEnd(swiper){
        menuColor(swiper);
        console.log('horizontalSlideChangeEnd');
        _slideVideoStatePlay(swiper);
    }

    function _locateCurrentSlide(slide){
        if(slide.dataset.hash == 'projekty') {
            var c = slide.getElementsByClassName('swiper-slide-active');
            return c[0];
        }
        return slide;
    }

    function _slideVideoStatePlay(swiper){
        /*var current = swiper.slides[swiper.activeIndex];
        if(current.dataset.hash != 'projekty') {
           currentSlide = current;
        }else {
            var c = current.getElementsByClassName('swiper-slide-active');
            currentSlide = c[0];
        }*/
        var currentSlide = _locateCurrentSlide(swiper.slides[swiper.activeIndex]);
        var videos = currentSlide.getElementsByTagName('video');
        if(videos){
            for(var i=0;i<videos.length; i++){
                videos[i].play();
                console.log('play: ', videos[i]);
            }
        }

    }

    function _slideVideoStatePause(swiper){
        /*var current = swiper.slides[swiper.previousIndex];
        if(current.dataset.hash == 'projekty') {
            var c = current.getElementsByClassName('swiper-slide-active');
            current = c[0];
        }
        currentSlide = current;*/
        var currentSlide = _locateCurrentSlide(swiper.slides[swiper.previousIndex]);
        var videos = currentSlide.getElementsByTagName('video');
        if(videos){
            for(var i=0;i<videos.length; i++){
                videos[i].pause();
                console.log('pause: ', videos[i]);
            }
        }
    }




    return {
        menuColor: menuColor,
        init: init
    }

})(Swiper,AA);

AA.Swiper.init();