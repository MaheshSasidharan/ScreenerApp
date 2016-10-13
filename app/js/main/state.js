// Sub-application/main Level State
app.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {

  $stateProvider
    .state('screener.home', {
      url: '/home',
      templateUrl: 'js/main/templates/home.tpl.html',
      controller: 'HomeCtrl as vm'
    })
    .state('screener.about', {
      url: '/about',
      templateUrl: 'js/main/templates/about.tpl.html',
      controller: 'AboutCtrl as vm'
    })
    .state('screener.contact', {
      url: '/contact',
      templateUrl: 'js/main/templates/contact.tpl.html',
      controller: 'ContactCtrl as vm'
    })
    .state('screener.assessments', {
      url: '/assessments',
      templateUrl: 'templates/assessments.html',
      controller: 'AssessmentsCtrl as vm'
    })
            .state('screener.assessments.assessment1', {
              templateUrl: 'templates/assessment_1.html'
            })
            .state('screener.assessments.assessment2', {
              templateUrl: 'templates/assessment_2.html'
            })
            .state('screener.assessments.assessment3', {
              templateUrl: 'templates/assessment_3.html',
              controller: 'VideoCtrl as vid'
            });

    $urlRouterProvider.otherwise('/home');
}]);