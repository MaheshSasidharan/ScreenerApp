app.controller('ContactCtrl', ['$scope', '$http', function($scope, $http) {
  var vm = this;

  vm.oService = {
  	GoToServer: function(){
  		return $http.get("http://localhost:3000/users/test")
                .then(
                vm.oService.Miscellaneous.ReturnDataDotData,
                vm.oService.Miscellaneous.FailedInService)
            },
    Miscellaneous: {
            ReturnDataDotData: function (data) {
                return data.data;
            },
            FailedInService: function () {
                CommonFactory.Notification.ShowNotification(true, Constants.Miscellaneous.SomethingWentWrong, Constants.Miscellaneous.Notification.Type.Danger);
            }
        }
  }

}]);