var app = angular.module('app', ['ui.router', 'webcam']);

app.config([
    '$httpProvider',
    function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }
]);