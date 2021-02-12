//META{"name":"stereoSound","displayName":"StereoAudio","website":"https://github.com/dylandotjava","source":"https://github.com/dylandotjava","invite":"https://discord.gg/8jrWegqpnC"}*//


var stereoSound = function () {

	let VoiceConnection = BDV2.WebpackModules.findByUniqueProperties(['getVoiceEngine']).getVoiceEngine().VoiceConnection;

	class Stereo extends VoiceConnection {
		constructor(a, b, c, d, e) {
			super(a, b, c, d, e);
			this.origin = super.setTransportOptions;
		}
		setTransportOptions (obj){
		console.log('setTransportOptions called:', obj);
		  if (obj.audioEncoder) {
		    obj.audioEncoder.params = {stereo: 1,};
		    obj.audioEncoder.params = {propstereo: true,};
		    obj.audioEncoder.params = {useinbandfec: 1,};
		    obj.audioEncoder.params = {tracks: 2,};
		    obj.audioEncoder.params = {channels: 2,};
		    obj.audioEncoder.channels = 1*2;
		    obj.audioEncoder.freq = 48000;
		    obj.audioEncoder.rate = 960*2;
		    obj.audioEncoder.pacsize = 20*2;
		  }
		  if (obj.fec) {
		    obj.fec = false;
		  }

		  if (obj.experimentalEncoders != true) {
		    obj.experimentalEncoders = true;
		  }

		  if (obj.encodingVoiceBitRate != 512000) {
		    obj.encodingVoiceBitRate = 512000;
}

			this.origin(obj);
			window.sound = this;
		}
		setLocalPan () {
		            this.localPans = {
		                left: 1,
		                right: 1
		            }
		            setLocalPan(obj)
		        }

						setSpeakingFlags(obj){
						    if (obj.localSpeakingFlags.speakflags.SOUNDSHARE != 1){
						      obj.localSpeakingFlags.speakflags.SOUNDSHARE = 1;
						    }
						}



						setencodingVoicebitrate(obj){
						if (obj.encodingVoiceBitRate != 512) {
						  obj.encodingVoiceBitRate = 512;
						}
						}
						setencodingbitrate(obj){
						if (obj.encodingBitRate != 512) {
						  obj.encodingBitRate = 512;
						}
						}


						enable(callback) {
						  if (this.cleanup) {
						    this.cleanup();
						    this.cleanup = null;
						    this.stream = null;
						  }

						  this.getInputDevices(sources => {
						    let constraints = [
						      {googEchoCancellation: this.echoCancellation},
						      {googEchoCancellation2: this.echoCancellation},
						      {googNoiseSuppression: this.noiseSuppression},
						      {googNoiseSuppression2: this.noiseSuppression},
						      {googAutoGainControl: this.automaticGainControl},
						      {googAutoGainControl2: this.automaticGainControl},
						      {googHighpassFilter: false},
						    ];

						    if (sources.some(source => source.id === this._sourceId)) {
						      constraints.push({sourceId: this._sourceId});
						    }

						    navigator.getUserMedia({audio: {optional: constraints}},
						      stream => {
						        this.stream = stream;
						        this._updateAudioTracks();

						        if (this.mode) {
						          this.setMode(this.mode, this.modeOptions);
						        }

						        callback && callback(null, stream);
						      },
						      err => {
						        // Normalize errors between Firefox and Chrome.
						        if (typeof err !== 'string') {
						          switch (err.name) {
						            case 'PermissionDeniedError':
						              err = 'PERMISSION_DENIED';
						              break;
						            case 'PermissionDismissedError':
						              err = 'PERMISSION_DISMISSED';
						              break;
						            case 'DevicesNotFoundError':
						              err = 'NO_DEVICES_FOUND';
						              break;
						            default:
						              err = 'UNKNOWN';
						          }
						        }
						        callback && callback(err);
						      }
						    );
						  });
						}






	}



	return class _ {
		getName() { return "Stereo Audio" }
		getDescription() { return "New working Stereo Audio plugin for BetterDiscord!" }
		getAuthor() { return "DylanDotJava (github)" }
		getVersion() { return "1.2.1" }
		getInvite() { return "https://discord.gg/8jrWegqpnC" }

		load() { }

		start() {
			BDV2.WebpackModules.findByUniqueProperties(['getVoiceEngine']).getVoiceEngine().VoiceConnection = Stereo;
		}

		stop() {
			BDV2.WebpackModules.findByUniqueProperties(['getVoiceEngine']).getVoiceEngine().VoiceConnection = VoiceConnection;
		}
	};
}();
