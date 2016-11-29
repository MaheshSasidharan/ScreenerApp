app.controller('Metronome', ['$scope', '$timeout', '$interval', 'Factory_Constants', 'Factory_CommonRoutines', 'Factory_DataService', Metronome]);

function Metronome($scope, $timeout, $interval, Constants, CommonFactory, DataService) {
    $scope.$parent.vm.Helper.ShowHidePager(false);
    var me = this;

    var timeDuration = 4; //Constants.AudioAssessment.audioRecordLength;

    var playing = false,
        channelCount = 2,
        amount = 0.50,
        sampler,
        osc,
        device,
        reverb,
        delay,
        distortion,
        lowPass,
        firstTime = true;

    me.oMetronome = {
        arrTimeIntervalsStartStop: [],
        counter: 5,
        start: null,
        end: null
    }

    me.oAudio = {
        bShowStartButton: true,
        bShowResponseBox: false,
        bShowProgressBar: false,

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
            this.bShowStartButton = true;

        }
    }

    me.Helper = {
        PlayPause: function() {
            playing = !playing;
            if (firstTime) {
                me.oAudio.bShowStartButton = false;
                me.oAudio.bShowResponseBox = true;
                me.Play();
                firstTime = false;
                me.oMetronome.initializedTime = new Date();
            }
        },
        Next: function() {
            me.oAudio.StartProgressBarNew();
        },
        RecordTimeDuration: function(sType) {
            switch (sType) {
                case 'start':
                    me.oMetronome.start = new Date();
                    break;
                case 'stop':
                    me.oMetronome.end = new Date();
                    var oIntervals = {
                        start: me.oMetronome.start,
                        end: me.oMetronome.end,
                        interval: me.oMetronome.end - me.oMetronome.start
                    }
                    me.oMetronome.arrTimeIntervalsStartStop.push(oIntervals);                    
                    console.log(oIntervals);

                    if(--me.oMetronome.counter === 0){
                        var oFinalResponse = {
                            initializedTime: me.oMetronome.initializedTime,
                            arrTimeIntervalsStartStop: me.oMetronome.arrTimeIntervalsStartStop
                        }
                        me.oAudio.bShowResponseBox = false;
                        console.log(oFinalResponse);
                        $scope.$parent.vm.currentAssessment.arrQuestions[0].response = JSON.stringify(oFinalResponse);                        
                        $scope.$parent.vm.Helper.ShowHidePager(true, Constants.Miscellaneous.AssessmentCompleteNext);
                        
                        playing = false;
                    }

                    break;
            }
        }
    }

    //me.Helper.PlayPause();
    //me.InitMetronome = function() {

    var audioCallback = function(buffer, channels) {
        var length = buffer.length,
            index,
            sample,
            i;

        for (index = 0; index < length; index += channels) {

            sample = 0;

            // first, create a sample from the sampler
            sampler.generate();
            sample = sampler.getMix() * .6;

            // next, get a sample from the oscillator
            if (playing) {

                // only apply LFO if LFO Hz and Amount are not zero
                if (lfo.frequency !== 0 && amount !== 0) {
                    lfo.generate();
                    osc.fm = lfo.getMix() * amount;
                }
                osc.generate();

                // append oscillator sample to any existing sample data
                sample += osc.getMix() * .5;
            }

            // distortion effect
            if (distortion.gain !== 0.00 && distortion.master !== 0.00) {
                distortion.pushSample(sample);
                sample = distortion.getMix();
            }

            // low pass filter
            if (lowPass.resonance !== 0.00) {
                lowPass.pushSample(sample);
                sample = lowPass.getMix();
            }

            // high pass filter
            if (highPass.resonance !== 0.00) {
                highPass.pushSample(sample);
                sample = highPass.getMix();
            }

            // delay effect
            if (delay.time !== 0.00 && delay.feedback !== 0.00) {
                delay.pushSample(sample);
                sample += delay.getMix() * .5;
            }

            // stereo reverb
            reverb.pushSample(sample, 0);
            reverb.pushSample(sample, 1);

            // output buffer equals the reverb output
            buffer[index] = reverb.getMix(0);
            buffer[index + 1] = reverb.getMix(1);
        }
    };

    var changeReverb = function(wet, dry, roomSize) {
        reverb = audioLib.Reverb(device.sampleRate, 2, wet, dry, roomSize, .1);
    };

    var setUpUI = function() {
        amount = 0.50;
    }

    me.Play = function() {

        device = audioLib.AudioDevice(audioCallback, channelCount);
        osc = audioLib.Oscillator(device.sampleRate, 400);

        sampler = audioLib.Sampler(device.sampleRate);
        var sample = atob(thatsright);
        sampler.loadWav(sample, true);

        lfo = audioLib.Oscillator(device.sampleRate, 1);
        lfo.waveShape = 'pulse';

        // delay ctor: sampleRate, channelCount, wet, dry, roomSize, damping, tuningOverride
        reverb = audioLib.Reverb(device.sampleRate, 2, 0.00, 1.00, 0.00, .1);
        delay = audioLib.Delay(device.sampleRate, 0.00, 0.00);

        distortion = audioLib.Distortion(device.sampleRate);
        distortion.gain = 0.00;
        distortion.master = 0.00;

        lowPass = audioLib.IIRFilter(device.sampleRate, 5000, 0.00, 0);
        lowPass.resonance = 0.00; // bug: resonance param in ctor doesn't work

        highPass = audioLib.IIRFilter(device.sampleRate, 40, 0.00, 1);
        highPass.resonance = 0.00; // bug: resonance param in ctor doesn't work

        setUpUI();

    }
}

//window.addEventListener('load', , true);
/*
var setUpUI = function() {
    $('#play').click(function() {
        playing = !playing;
    });

    $('#sample').click(function() {
        sampler.noteOn(440);
    });

    amount = 0.50;

    $('#accordion').accordion({
        heightStyle: "content"
    });

    $('#speed').slider({
        min: 0,
        max: 50,
        value: lfo.frequency,
        step: 0.2,
        slide: function(event, ui) {
            lfo.frequency = ui.value;
            if (lfo.frequency === 0) {
                osc.phase = 0;
                osc.fm = 0;
            }
        }
    });

    $('#amount').slider({
        min: 0,
        max: 1.00,
        value: amount,
        step: 0.01,
        slide: function(event, ui) {
            amount = ui.value;
        }
    });

    $('#hz').slider({
        min: 60,
        max: 800,
        value: amount,
        step: 1,
        slide: function(event, ui) {
            osc.frequency = ui.value;
        }
    });

    $('#reverbSize').slider({
        min: 0.00,
        max: 1.00,
        value: reverb.roomSize,
        step: 0.01,
        change: function(event, ui) {
            changeReverb(reverb.wet, reverb.dry, ui.value);
        }
    });

    $('#reverbWet').slider({
        min: 0.00,
        max: 1.00,
        value: reverb.wet,
        step: 0.01,
        change: function(event, ui) {
            changeReverb(ui.value, reverb.dry, reverb.wet);
        }
    });

    $('#reverbDry').slider({
        min: 0.00,
        max: 1.00,
        value: reverb.dry,
        step: 0.01,
        change: function(event, ui) {
            changeReverb(reverb.wet, ui.value, reverb.wet);
        }
    });

    $('#delayTime').slider({
        min: 0.05,
        max: 1000,
        value: delay.time,
        step: 0.01,
        slide: function(event, ui) {
            delay.time = ui.value;
        }
    });

    $('#delayFeedback').slider({
        min: 0.00,
        max: 1.00,
        value: delay.feedback,
        step: 0.01,
        slide: function(event, ui) {
            delay.feedback = ui.value;
        }
    });

    $('#gain').slider({
        min: 0.00,
        max: 10,
        value: distortion.gain,
        step: 0.1,
        slide: function(event, ui) {
            distortion.gain = ui.value;
        }
    });

    $('#master').slider({
        min: 0.00,
        max: 10,
        value: distortion.master,
        step: 0.1,
        slide: function(event, ui) {
            distortion.master = ui.value;
        }
    });

    $('#lpCutoff').slider({
        min: 40,
        max: 5000,
        value: lowPass.cutoff,
        step: 1,
        slide: function(event, ui) {
            lowPass.cutoff = ui.value;
        }
    });

    $('#lpResonance').slider({
        min: 0.00,
        max: 1.00,
        value: lowPass.resonance,
        step: 0.01,
        slide: function(event, ui) {
            lowPass.resonance = ui.value;
        }
    });

    $('#hpCutoff').slider({
        min: 40,
        max: 5000,
        value: highPass.cutoff,
        step: 1,
        slide: function(event, ui) {
            highPass.cutoff = ui.value;
        }
    });

    $('#hpResonance').slider({
        min: 0.00,
        max: 1.00,
        value: highPass.resonance,
        step: 0.01,
        slide: function(event, ui) {
            highPass.resonance = ui.value;
        }
    });

};
*/
//}