var app = angular.module('app', ['ui.router', 'webcam', 'ui.bootstrap','angularAudioRecorder']);
//var app = angular.module('app', ['ui.router', 'webcam']);

app.config([
    '$httpProvider',
    function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }
]);

app.config(['recorderServiceProvider', function(recorderServiceProvider){
        //configure here
      }]);