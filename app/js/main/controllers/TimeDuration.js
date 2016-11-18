app.controller('TimeDuration', ['$scope', '$timeout', '$interval', '$sce', 'Factory_Constants', 'Factory_CommonRoutines', 'Factory_DataService', TimeDuration]);

function TimeDuration($scope, $timeout, $interval, $sce, Constants, CommonFactory, DataService) {
    $scope.$parent.vm.Helper.ShowHidePager(false);
    var td = this;

    td.Helper = {
        Init: function() {
        },
        Next: function(){
            $scope.$parent.vm.Helper.ShowHidePager(true);
        }
    }
    td.Helper.Init();
}