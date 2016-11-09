AA.Ajax = (function(){
    var homeUrl = 'http://localhost:3000/';
    var trigger = document.getElementById('next-project');

    function getAjax(url, success) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
        return xhr;
    }

    function clickHandler(e){
        e.preventDefault();
        var href = this.getAttribute('href');
        getAjax(homeUrl + href, function(data){
            var oldContent = document.getElementsByTagName('main');

            var wrapper = document.createElement('div');
            wrapper.innerHTML = data;
            var newContent = wrapper.getElementsByTagName('main');
            console.log(newContent[0]);
            //oldContent[0].innerHTML = newContent;

            oldContent[0].parentNode.replaceChild(newContent[0], oldContent[0]);
            window.scrollTo(0,0);
            trigger = document.getElementById('next-project');
            init();

            AA.Loader.init();
            AA.Menu.init();
            AA.inView.init();
        })

    }

    function clickGrow(e){
        e.preventDefault();
        console.log(this.parentNode);
        addClass(this.parentNode, 'big');
    }

    function init(){
        if(trigger) {
            trigger.addEventListener('click', clickHandler);
            //trigger.addEventListener('click', clickGrow);
        }
    }

    return{
        init: init
    }
})();
//AA.Ajax.init();