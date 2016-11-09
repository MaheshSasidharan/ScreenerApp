app.controller('MatrixController', ['$scope', '$timeout', '$interval', '$sce', 'Factory_Constants', 'Factory_CommonRoutines', 'Factory_DataService', MatrixController]);

function MatrixController($scope, $timeout, $interval, $sce, Constants, CommonFactory, DataService) {
    $scope.$parent.vm.Helper.ShowHidePager(false);
    var ma = this;
    ma.src = null;
    ma.oService = {
        GetSourceAddress: function() {
            return DataService.GetSourceAddress();
        }
    }

    ma.Helper = {
        Init: function() {
            $scope.$parent.vm.Helper.ShowHidePager(true);
            this.GetMartixImages("set1");
        },
        GetMartixImages: function(sSetNum) {
            var sSource = ma.oService.GetSourceAddress();
            var sMatrixAssessment = sSource + "GetMatrixAssessment";
            var arrImages = Constants.MatrixReasoning.arrImages;
            var oCurrentSet = CommonFactory.FindItemInArray(arrImages, 'sSetNum', sSetNum, 'item');

            var arrImageTypes = ["oFrame", "oSolution"];
            arrImageTypes.forEach(function(sImageType) {
                oCurrentSet[sImageType].arrURLs = [];
                var nNextImageIndex = 0;
                for (var i = 0; i < oCurrentSet[sImageType].nHeight; i++) {
                    for (var j = 0; j < oCurrentSet[sImageType].nWidth; j++) {
                        var sSetNum = oCurrentSet.sSetNum;
                        var sSetType = oCurrentSet[sImageType].sSetType;
                        var sPicNum = oCurrentSet[sImageType].arrPics[nNextImageIndex++]; // "1_square.png";
                        var src = sMatrixAssessment + "?sSetNum=" + sSetNum + "&sSetType=" + sSetType + "&sPicNum=" + sPicNum;
                        if (!oCurrentSet[sImageType].arrURLs[i]) {
                            oCurrentSet[sImageType].arrURLs[i] = [];
                        }
                        oCurrentSet[sImageType].arrURLs[i][j] = src;
                    }
                }
            });
            console.log(oCurrentSet);
            ma.oCurrentSet = oCurrentSet;
        }
    }
    ma.Helper.Init();
}
