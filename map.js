//todo reinit on swipe

var mapStyle =
    [{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"on"},{"color":"#f4f6f7"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"off"},{"color":"#dee2e4"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","elementType":"all","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"lightness":-25},{"saturation":-97},{"color":"#a4afb6"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]}]
    ;

var options  = [
    {
        element:    'map-r',
        zoom:       15,
        center:     [ 51.422835, 17.908236 ],//lat, lng
        style:      mapStyle,
        marker: {
            position:   [ 51.422835, 17.908236 ],
            title:      ''
        }
    },
    {
        element:    'map-l',
        zoom:       15,
        center:     [ 50.245517, 20.611612 ],//lat, lng
        style:      mapStyle,
        marker: {
            position:   [ 50.245517, 20.611612 ],
            title:      ''
        }
    }
];

AA.map = (function(){

    function load(options) {
        for( var i = 0; i < options.length; i ++){
            google.maps.event.addDomListener(window, 'load', initMap(options[i]));
        }
    }

    function initMap(options){

        var mapElement = document.getElementById(options.element);
        if(mapElement){
            var map = new google.maps.Map(mapElement, parseOptions(options));
            placeMarker(map, options);
        }
    }

    function placeMarker(map, options){
        new google.maps.Marker({
            position: new google.maps.LatLng(options.marker.position[0], options.marker.position[1]),
            map: map,
            title: options.marker.title
        });
    }

    function parseOptions(options){
        var mapParams = {
            zoom: options.zoom,
            center: new google.maps.LatLng(options.center[0], options.center[1]),
            styles: options.style
        };
        return mapParams;
    }

    return {
        init: load
    }

})(google);

AA.map.init(options);