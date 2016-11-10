app.controller('MatrixController', ['$scope', '$timeout', '$interval', '$sce', 'Factory_Constants', 'Factory_CommonRoutines', 'Factory_DataService', MatrixController]);

function MatrixController($scope, $timeout, $interval, $sce, Constants, CommonFactory, DataService) {
    $scope.$parent.vm.Helper.ShowHidePager(false);
    var ma = this;
    ma.src = null;
    var arrImages = null;
    ma.nCurrentPicSetIndex = 0;
    ma.bShowNextButton = false;
    ma.oService = {
        GetSourceAddress: function() {
            return DataService.GetSourceAddress();
        },
        GetPicNamesMatrixAssessment: function() {
            return DataService.GetPicNamesMatrixAssessment().then(function(data) {
                if (data.status) {
                    return data.arrPicNames;
                } else {
                    alert(data.msg);
                    return [];
                }
            });
        }
    }

    ma.Helper = {
        Init: function() {
            ma.oService.GetPicNamesMatrixAssessment().then(function(arrPicNames) {
                if (arrPicNames.length) {
                    arrPicNames.forEach(function(sPicName) {
                        var nNumberOfSlashes = (sPicName.match(/\//g) || []).length;
                        switch (nNumberOfSlashes) {
                            case 0:
                                var sSetNum = sPicName;
                                if (!arrImages) {
                                    arrImages = [];
                                }
                                arrImages.push({ sSetNum: sSetNum });
                                break;
                            case 1:
                                var sSetType = sPicName.substr(sPicName.indexOf("/") + 1);
                                var nSetTypeReferenceName = null;
                                arrImages[arrImages.length - 1][sSetType] = { sSetType: sSetType };
                                break;
                            case 2:
                                var sSetType = sPicName.substring(sPicName.indexOf("/") + 1, sPicName.lastIndexOf("/"));
                                if (sPicName.indexOf(".dimension") >= 0) {
                                    var sDimension = sPicName.substring(sPicName.lastIndexOf("/") + 1, sPicName.indexOf(".dimension")).split("x");
                                    arrImages[arrImages.length - 1][sSetType].nWidth = sDimension[0];
                                    arrImages[arrImages.length - 1][sSetType].nHeight = sDimension[1];
                                    return;
                                } else {
                                    if (!arrImages[arrImages.length - 1][sSetType].arrPicNames) {
                                        arrImages[arrImages.length - 1][sSetType].arrPicNames = [];
                                    }
                                    arrImages[arrImages.length - 1][sSetType].arrPicNames.push(sPicName.substring(sPicName.lastIndexOf("/") + 1));
                                };
                                break;
                        }
                    });
                }
                ma.Helper.GetMartixImages();
            });
        },

        GetMartixImages: function() {
            ma.bShowNextButton = false;
            var sSource = ma.oService.GetSourceAddress();
            var sMatrixAssessment = sSource + "GetMatrixAssessment";
            //var oCurrentSet = CommonFactory.FindItemInArray(arrImages, 'sSetNum', sSetNum, 'item');
            var oCurrentSet = arrImages[ma.nCurrentPicSetIndex++];

            var arrImageTypes = ["frameSets", "solutionSets"];
            arrImageTypes.forEach(function(sImageType) {
                oCurrentSet[sImageType].arrURLs = [];
                var nNextImageIndex = 0;
                for (var i = 0; i < oCurrentSet[sImageType].nHeight; i++) {
                    for (var j = 0; j < oCurrentSet[sImageType].nWidth; j++) {
                        var sSetNum = oCurrentSet.sSetNum;
                        var sSetType = oCurrentSet[sImageType].sSetType;
                        var sPicNum = oCurrentSet[sImageType].arrPicNames[nNextImageIndex++];
                        var src = sMatrixAssessment + "?sSetNum=" + sSetNum + "&sSetType=" + sSetType + "&sPicNum=" + sPicNum;
                        if (!oCurrentSet[sImageType].arrURLs[i]) {
                            oCurrentSet[sImageType].arrURLs[i] = [];
                        }
                        oCurrentSet[sImageType].arrURLs[i][j] = src;
                    }
                }
            });
            ma.oCurrentSet = oCurrentSet;
        },
        AnswerSelected: function(src) {
            var queryString = '&sPicNum=';
            var sPicNum = src.substring(src.indexOf(queryString) + queryString.length);
            console.log(sPicNum);
            if (arrImages.length === ma.nCurrentPicSetIndex) {
                $scope.$parent.vm.Helper.ShowHidePager(true);
                ma.oCurrentSet = null;
            } else {
                ma.bShowNextButton = true;
                //ma.Helper.GetMartixImages();
            }
        }
    }
    ma.Helper.Init();
}
