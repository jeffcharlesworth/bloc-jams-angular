(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
            requireBase: false
            });
        $stateProvider
            .state('landing', {
                url: '../',
                controller: 'LandingCtrl as landing',
                templateUrl: 'bloc-jams-angular/templates/landing.html'
            })
            .state('album', {
                url: '../album.html',
                controller: 'AlbumCtrl as album',
                templateUrl: 'bloc-jams-angular/templates/album.html'
            })
            .state('collection', {
                url: '../collection.html',
                controller: 'CollectionCtrl as collection',
                templateUrl: 'bloc-jams-angular/templates/collection.html'
            });
    }
angular
    .module('blocJams', ['ui.router'])
    .config(config);
})();
