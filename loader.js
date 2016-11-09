AA.Loader = (function(){

    var images = document.images;
    var queue = [];
    var loader = document.getElementById('loader');

    function createManifest(){

        for( var i=0; i < images.length; i++ ){
            var q = {};
            q.src = images[i].src;
            q.id = i;
            queue.push(q);
        }
        return queue;
    }

    function onProgress(event) {
        loader.innerHTML = '<span>' + Math.round(event.loaded * 100) + '</span>';
    }

    function onComplete(){
        window.setTimeout(function(){
            loader.classList.add('hidden');
            document.body.style.overflowY = 'auto';

        },1000);
        loader.classList.add('hiding');

    }

    function load(){
        window.scrollTo(0,0);
        document.body.style.overflowY = 'hidden';
        var manifest = createManifest();
        var queue = new createjs.LoadQueue();
        queue.loadManifest(manifest);
        queue.on('progress', onProgress);
        queue.on('complete', onComplete);
    }

    return {
        init: load
    }

})();

AA.Loader.init();