app.controller('AssessmentsCtrl', ['$scope','$state', function($scope,$state) {
	var vm = this;

	vm.tabs = [
        { title:'Assessment 1', content:'assessment_1.html', state:'assessment1' },
        { title:'Assessment 2', content:'assessment_2.html', state:'assessment2' },
        { title:'Assessment 3', content:'assessment_3.html', state:'assessment3', disabled: false  },
        { title:'Assessment 4', content:'assessment_4.html', disabled: true }
    ];

  vm.currentTabIndex = 0;
  vm.currentTab = [];

  vm.contacts = [{ name: 'assessment1' }, { name: 'assessment2' }];

  vm.Helper = {
    Init: function () {
      vm.currentTab = [vm.tabs[vm.currentTabIndex]];
      this.TransitionState(vm.currentTab[0].state);
    },
  	TransitionState: function(state){
  		if(state){
  			$state.transitionTo('screener.assessments.' + state);		
  		}
  	},
    PreviousAssessment: function(){
      vm.currentTabIndex--;
      this.Init();
    },
    NextAssessment: function(){
      vm.currentTabIndex++;
      this.Init();
    }    
  }
	// Init
  vm.Helper.Init();
	//vm.Helper.TransitionState(vm.contacts[0].name);

}]);

// Video
app.controller('VideoCtrl', ['$scope', function($scope) {
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
}]);