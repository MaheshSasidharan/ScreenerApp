app.controller('AudioController', ['$scope', '$timeout', '$interval', '$sce', 'Factory_Constants', 'Factory_CommonRoutines', 'Factory_DataService', AudioController]);

function AudioController($scope, $timeout, $interval, $sce, Constants, CommonFactory, DataService, Upload) {
    var ac = this;
    ac.SoundBuffer = null;
    $scope.$parent.vm.Helper.ShowHidePager(false);
    var oIntervalPromise = null;
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();
    var source = context.createBufferSource(); // creates a sound source

    ac.TestAudio = null;
    ac.test1 = function() {
        //ac.TestAudio = ac.oAudio.recorded;
        var reader = new FileReader();
        reader.onload = function() {
            ac.TestAudio = $sce.trustAsResourceUrl(reader.result);
            //ac.TestAudio = $sce.trustAsResourceUrl('http://localhost:3000/');            
            var x = reader.result.split(',')[1];
            $scope.$apply();
        };
        reader.readAsDataURL(ac.oAudio.recorded);
    }


    ac.test2 = function(blob) {
        //var blob = new Blob(ac.SoundBuffer, {type: "audio/mpeg"});
        var reader = new FileReader();
        reader.onload = function() {
            ac.TestAudio = $sce.trustAsResourceUrl(reader.result);
            //ac.TestAudio = $sce.trustAsResourceUrl('http://localhost:3000/');            
            var x = reader.result.split(',')[1];
            $scope.$apply();
        };
        reader.readAsDataURL(blob);
    }

    ac.audioIndex = -1;
    ac.test3 = function(sType) {
        if (sType == "next") {
            if (ac.arrBuffers.length - 1 !== ac.audioIndex) {
                ++ac.audioIndex;
            }
        } else { // prev
            if (ac.audioIndex !== 0) {
                --ac.audioIndex;
            }
        }
        ac.Helper.PlaySound(ac.arrBuffers[ac.audioIndex]);
    }

    ac.oService = {
        AudioUpload: function() {
            CommonFactory.BlobToBase64(ac.oAudio.recorded, function(base64) { // encode
                var oSaveItem = { 'blob': base64 };
                DataService.AudioUpload(oSaveItem).then(function(data) {
                    $scope.$parent.vm.Helper.ShowHidePager(true);
                });
            });
        },
        GetAudioAssessment: function(audioName) {
            return DataService.GetAudioAssessment(audioName).then(function(data) {
                return data;
            });
        }
    }

    ac.Helper = {
        GetAudioAssessment: function(audioName) {
            ac.oService.GetAudioAssessment(audioName).then(function(data) {
                ac.test2(data);
                return;
            });
        },
        PlaySound: function(buffer) {            
            if(source.buffer){
                source.disconnect();
                source = context.createBufferSource();
            }            
            source.buffer = buffer; // tell the source which sound to play
            source.connect(context.destination); // connect the source to the context's destination (the speakers)
            source.start(0); // play the source now
        },
        FinishedLoadingAudio(arrBuffers) {
            ac.arrBuffers = arrBuffers;
        },
        Init: function() {
            var bufferLoader = new BufferLoader(
                context, [
                    '1_1',
                    '1_2',
                    '1_3',
                    '2_1',
                    '2_2',
                    '2_3',
                    '3_1',
                    '3_2',
                    '3_3',
                ],
                this.FinishedLoadingAudio,
                DataService.GetAudioAssessment
            );
            bufferLoader.load();
        },
    }

    ac.oAudio = {
        recorded: null,
        timeLimit: 3, // make this 3
        autoStart: false,
        AudioUpload: ac.oService.AudioUpload,
        StartRecorderCountDown: function() {
            $scope.$parent.vm.Helper.ShowHidePager(false);
            var oAudioAssessment = $scope.$parent.vm.assessments[1].arrQuestions[0];
            var nTimer = 3; // make this 3
            oAudioAssessment.displayedResponse = nTimer;
            oIntervalPromise = $interval(function() {
                if (nTimer == 0) {
                    oAudioAssessment.displayedResponse = oAudioAssessment.response;
                    ac.oAudio.autoStart = true;
                    $interval.cancel(oIntervalPromise);
                } else {
                    oAudioAssessment.displayedResponse = --nTimer;
                }
            }, 1000, 4);
        },
        OnRecordStart: function() {
            console.log("RECORDING STARTED");
        },
        OnRecordAndConversionComplete: function() {
            $timeout(ac.oService.AudioUpload, 0);
        }
    }


    ac.Helper.Init();
}
