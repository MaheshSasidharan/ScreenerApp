// Application Level State
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('', '/home');


  $stateProvider
    .state('app', {
      abstract: true,
      url: '',
      controller: 'AppCtrl',
      views: {
        'navbar': {
          templateUrl: 'js/core/templates/navbar.tpl.html',
          controller: 'NavbarCtrl'
        },
        'main': {
          templateUrl: 'js/core/templates/main.tpl.html'
        }
      }
    })
    .state('404', {
      url: '/404',
      templateUrl: 'js/core/templates/404.tpl.html',
      controller: 'AppCtrl'
    });
   

/*
    $urlRouterProvider.when("", "/contacts/list");
      $urlRouterProvider.when("/", "/contacts/list");
      
      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise("/contacts/list");
      
      $stateProvider
        .state('contacts', {
            abstract: true,
            url: '/contacts',
            templateUrl: 'js/main/templates/contact.tpl.html',
            controller: function($scope){
                $scope.contacts = [{ id:0, name: "Alice" }, { id:1, name: "Bob" }];
            },
            onEnter: function(){
              console.log("enter contacts");
            }
        
        })
        .state('contacts.list', {
            url: '/list',
            // loaded into ui-view of parent's template
            templateUrl: 'js/main/templates/about.tpl.html',
            onEnter: function(){
              console.log("enter contacts.list");
            }
        })
        .state('contacts.detail', {
            url: '/:id',
            // loaded into ui-view of parent's template
            templateUrl: 'js/main/templates/about.tpl.html',
            controller: function($scope, $stateParams){
              $scope.person = $scope.contacts[$stateParams.id];
            },
            onEnter: function(){
              console.log("enter contacts.detail");
            }
        })
       */

}]);