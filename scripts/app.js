(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
            requireBase: false
            });
        $stateProvider
            .state('landing', {
                url: 'bloc-jams-angular/',
                controller: 'LandingCtrl as landing',
                templateUrl: 'templates/landing.html'
            })
            .state('album', {
                url: 'bloc-jams-angular/album.html',
                controller: 'AlbumCtrl as album',
                templateUrl: 'templates/album.html'
            })
            .state('collection', {
                url: 'bloc-jams-angular/collection.html',
                controller: 'CollectionCtrl as collection',
                templateUrl: 'templates/collection.html'
            });
    }
angular
    .module('blocJams', ['ui.router'])
    .config(config);
})();
