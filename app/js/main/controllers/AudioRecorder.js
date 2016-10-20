app.controller('AudioController', ['$scope', 'Factory_Constants', 'Factory_CommonRoutines', 'Factory_DataService', AudioController]);

function AudioController($scope, Constants, CommonFactory, DataService, Upload) {
    $scope.audio = { recorded: null, timeLimit: 3 }
    $scope.test = function() {
        console.log($scope.audio);
        //$scope.upload($scope.audio.recorded);
        $scope.AudioUpload();
    }

    $scope.AudioUpload = function() {
        blobToBase64($scope.audio.recorded, function(base64) { // encode
            var oSaveItem = { 'blob': base64 };
            DataService.AudioUpload(oSaveItem).then(function(data) {
                console.log(data);

            });
        })
    }

    var blobToBase64 = function(blob, cb) {
        var reader = new FileReader();
        reader.onload = function() {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            cb(base64);
        };
        reader.readAsDataURL(blob);
    };
}
