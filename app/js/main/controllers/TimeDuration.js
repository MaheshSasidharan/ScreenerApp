app.controller('TimeDuration', ['$scope', '$timeout', '$interval', 'Factory_Constants', 'Factory_CommonRoutines', 'Factory_DataService', TimeDuration]);

function TimeDuration($scope, $timeout, $interval, Constants, CommonFactory, DataService) {
    $scope.$parent.vm.Helper.ShowHidePager(false);
    var td = this;

    var timeDuration = 2;//Constants.AudioAssessment.audioRecordLength;

    td.oAudio = {
        bShowStartButton: true,
        bShowResponseBox: false,
        bShowProgressBar: false,
        nResponseBoxValue: null,
        nMaxTime: timeDuration * 1000,
        nRefreshRate: 500,
        sType: null,
        displayedResponse: null,
        StartProgressBar: function() {
            this.bShowProgressBar = true;            
            this.sType = null;
            var that = this;
            oIntervalPromise = $interval(function() {
                if (that.nSpentTime + that.nRefreshRate == that.nMaxTime) {
                    $interval.cancel(oIntervalPromise);
                    that.nSpentTime += that.nRefreshRate;
                    $timeout(function() {
                        that.nSpentTime = 0;
                        that.bShowProgressBar = false;
                    }, 1000);
                } else {
                    that.nSpentTime += that.nRefreshRate;
                }
            }, this.nRefreshRate, this.nMaxTime / this.nRefreshRate);
        },
        StartProgressBarNew: function() {
            this.bShowStartButton = false;
            this.bShowProgressBar = true;
            this.nSpentTime = 0;
            var that = this;
            angular.element(document.querySelector('.SC_TimeDuration .progress-bar'))
                .css({
                    '-webkit-transition-duration': td.oAudio.nMaxTime + 'ms',
                    '-moz-transition-duration': td.oAudio.nMaxTime + 'ms',
                    '-ms-transition-duration': td.oAudio.nMaxTime + 'ms',
                    '-o-transition-duration': td.oAudio.nMaxTime + 'ms',
                    'transition-duration': td.oAudio.nMaxTime + 'ms'
                });
            $timeout(function() {
                that.nSpentTime = that.nMaxTime;
                $timeout(function() {
                    that.nSpentTime = 0;
                    that.bShowProgressBar = false;
                    that.bShowResponseBox = true;
                }, that.nMaxTime);
            }, 0);
        }
    }


    td.Helper = {
        Init: function() {},
        Next: function() {
            td.oAudio.StartProgressBarNew();
            //$scope.$parent.vm.Helper.ShowHidePager(true);
        },
        TimeDurationSubmit: function(){
            td.oAudio.bShowResponseBox = false;
            console.log(td.oAudio.nResponseBoxValue);
            $scope.$parent.vm.currentAssessment.arrQuestions[0].response = td.oAudio.nResponseBoxValue;
            $scope.$parent.vm.Helper.ShowHidePager(true, Constants.Miscellaneous.AssessmentCompleteNext);
        }
    }
    td.Helper.Init();
}
