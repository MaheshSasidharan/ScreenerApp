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
            .state('screener.assessments.assessment_1', {
              templateUrl: 'templates/assessments/assessment_1.html'
            })
            .state('screener.assessments.assessment_2', {
              templateUrl: 'templates/assessments/assessment_2.html',
              controller: 'AudioController as ac'
            })
            .state('screener.assessments.assessment_3', {
              templateUrl: 'templates/assessments/assessment_3.html',
              controller: 'VideoCtrl as vid'
            });
    $urlRouterProvider.otherwise('/home');
}]);