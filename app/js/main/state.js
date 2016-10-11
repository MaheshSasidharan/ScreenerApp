// Sub-application/main Level State
app.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {

  $stateProvider
    .state('screener.home', {
      url: '/home',
      templateUrl: 'js/main/templates/home.tpl.html',
      controller: 'HomeCtrl as vm'
    })
    /*
      .state('screener.home.assessment1', {
        url: '/assessment1',
        templateUrl: 'templates/assessment_1.html',
        controller: 'Assessment1Ctrl as vm'
      })
      .state('screener.home.assessment2', {
        url: '/assessment2',
        templateUrl: 'templates/assessment_2.html',
        controller: 'Assessment2Ctrl as vm'
      })
*/
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

    $urlRouterProvider.otherwise('/home');
}]);