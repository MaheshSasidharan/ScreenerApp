// Sub-application/main Level State
app.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {

  $stateProvider
    .state('screener.home', {
      url: '/home',
      templateUrl: 'templates/main/home.tpl.html',
      controller: 'HomeCtrl as vm'
    })
    .state('screener.about', {
      url: '/about',
      templateUrl: 'templates/main/about.tpl.html',
      controller: 'AboutCtrl as vm'
    })
    .state('screener.contact', {
      url: '/contact',
      templateUrl: 'templates/main/contact.tpl.html',
      controller: 'ContactCtrl as vm'
    })
    .state('screener.assessments', {
      url: '/assessments',
      templateUrl: 'templates/assessments/assessments.html',
      controller: 'AssessmentsCtrl as vm'
    })
            .state('screener.assessments.text', {
              templateUrl: 'templates/assessments/text.html'
            })
            .state('screener.assessments.timeDuration', {
              templateUrl: 'templates/assessments/timeDuration.html',
              controller: 'TimeDuration as td'
            })
            .state('screener.assessments.matrixReasoning', {
              templateUrl: 'templates/assessments/matrixReasoning.html',
              controller: 'MatrixController as ma'
            })
            .state('screener.assessments.audioWords', {
              templateUrl: 'templates/assessments/audioWords.html',
              controller: 'AudioController as au'
            })
            .state('screener.assessments.voice', {
              templateUrl: 'templates/assessments/voice.html',
              controller: 'VoiceController as vo'
            })
            .state('screener.assessments.video', {
              templateUrl: 'templates/assessments/video.html',
              controller: 'VideoCtrl as vid'
            });
    $urlRouterProvider.otherwise('/home');
}]);