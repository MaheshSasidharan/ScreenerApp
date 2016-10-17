app.controller('AssessmentsCtrl', ['$scope','$state','Factory_Constants', 'Factory_DataService', 'Factory_CommonRoutines', AssessmentsCtrl]);
app.controller('VideoCtrl', ['$scope', VideoCtrl]);

function AssessmentsCtrl($scope, $state, Constants, DataService, CommonFactory) {
  var vm = this;
  vm.tabs = [];
  vm.currentTabIndex = 0;
  vm.currentTab = [];
  vm.contacts = [{ name: 'assessment1' }, { name: 'assessment2' }];
  vm.tempAssessments = [];
  vm.assessments = []; 
  vm.oService = {
      GetAssessments: function() {
          return DataService.GetAssessments().then(function(data) {
              if (data.status) {
                  vm.tempAssessments = data.assessments;
                  return data;
              } else {
                  alert(data.msg);
              }
          });
      },
      SaveAssessments: function() {
          return DataService.SaveAssessments(vm.currentAssessment.arrQuestions).then(function(data) {
              if (data.status) {                      
                  return data;
              } else {
                  alert(data.msg);
              }
          });
      }
  }

  vm.Helper = {
    SaveAssessments: function(){
      vm.oService.SaveAssessments().then(function(data){
        return data;
      });
    },
    Init: function () {
      var that = this;
      vm.oService.GetAssessments().then(function (data) {
          that.InitAssessments();
          that.InitTab();
      });      
    },
    TransitionState: function(state){
      if(state){
        $state.transitionTo('screener.assessments.' + state);   
      }
    },
    PreviousAssessment: function(){
      var that = this;
      vm.Helper.SaveAssessments(function(data){
        if(data.status){
          vm.currentTabIndex--;
          this.InitCurrentTab();
        }
      }); 
    },
    NextAssessment: function(){
      var that = this;
      vm.Helper.SaveAssessments(function(data){
        if(data.status){
          vm.currentTabIndex++;
          this.InitCurrentTab();    
        }
      });      
    },
    InitAssessments: function(){
      vm.tempAssessments.forEach(function(oItem){
          var assessmentIndex = CommonFactory.FindItemInArray(vm.assessments, 'assessmentId', oItem.assessmentId, 'index');
          // If it exists, add questions to it, else create one
          if(assessmentIndex){
            vm.assessments[assessmentIndex].arrQuestions = vm.assessments[assessmentIndex].arrQuestions ? vm.assessments[assessmentIndex].arrQuestions : [];
            vm.assessments[assessmentIndex].arrQuestions.push(
                {
                  questionId: oItem.questionId,
                  question: oItem.question
                }
              );
          }else{
            vm.assessments.push(
                {
                    assessmentId: oItem.assessmentId,
                    name: oItem.name,
                    nickName: oItem.nickName,
                    description: oItem.description,
                    arrQuestions: [
                      {
                        questionId: oItem.questionId,
                        question: oItem.question
                      }
                    ]
                }
              );
          }
      });
      delete vm.tempAssessments;
    },
    InitTab: function(){
      // vm.currentTabIndex = this.GetCurrentTabIndex();
      vm.assessments.forEach(function(oAssessment){
          vm.tabs.push({ title: oAssessment.name, state: oAssessment.nickName, content: oAssessment.nickName + '.html', disabled: false });
      });      
      this.InitCurrentTab();
    },
    InitCurrentTab: function(){
      vm.currentTab = [vm.tabs[vm.currentTabIndex]];
      vm.currentAssessment = vm.assessments[vm.currentTabIndex];
      this.TransitionState(vm.currentTab[0].state);
    },
    GetTemplateURL: function(sPartialURL){      
      //return 'question_' + sPartialURL + '.html';
      return '' + sPartialURL + '';
    }
  }
  vm.Helper.Init();
}

function VideoCtrl($scope) {
    'use strict';

    $scope.VidCtrlVar = "Variable of VideoCtrl";

    var _video = null,
        patData = null;

    $scope.showDemos = false;
    $scope.edgeDetection = false;
    $scope.mono = false;
    $scope.invert = false;

    $scope.patOpts = {x: 0, y: 0, w: 25, h: 25};

    // Setup a channel to receive a video property
    // with a reference to the video element
    // See the HTML binding in main.html
    $scope.channel = {};

    $scope.webcamError = false;
    $scope.onError = function (err) {
        $scope.$apply(
            function() {
                $scope.webcamError = err;
            }
        );
    };

    $scope.onSuccess = function () {
        // The video element contains the captured camera data
        _video = $scope.channel.video;
        $scope.$apply(function() {
            $scope.patOpts.w = _video.width;
            $scope.patOpts.h = _video.height;
            $scope.showDemos = true;
        });
    };

    $scope.onStream = function (stream) {
        // You could do something manually with the stream.
    };


    /**
     * Make a snapshot of the camera data and show it in another canvas.
     */
    $scope.makeSnapshot = function makeSnapshot() {
        if (_video) {
            var patCanvas = document.querySelector('#snapshot');
            if (!patCanvas) return;

            patCanvas.width = _video.width;
            patCanvas.height = _video.height;
            var ctxPat = patCanvas.getContext('2d');

            var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
            ctxPat.putImageData(idata, 0, 0);

            sendSnapshotToServer(patCanvas.toDataURL());

            patData = idata;
        }
    };

    /**
     * Redirect the browser to the URL given.
     * Used to download the image by passing a dataURL string
     */
    $scope.downloadSnapshot = function downloadSnapshot(dataURL) {
        window.location.href = dataURL;
    };

    var getVideoData = function getVideoData(x, y, w, h) {
        var hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.width = _video.width;
        hiddenCanvas.height = _video.height;
        var ctx = hiddenCanvas.getContext('2d');
        ctx.drawImage(_video, 0, 0, _video.width, _video.height);
        return ctx.getImageData(x, y, w, h);
    };

    var sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
        $scope.snapshotData = imgBase64;
    };

    // var getPixelData = function getPixelData(data, width, col, row, offset) {
    //     return data[((row*(width*4)) + (col*4)) + offset];
    // };

    // var setPixelData = function setPixelData(data, width, col, row, offset, value) {
    //     data[((row*(width*4)) + (col*4)) + offset] = value;
    // };
}