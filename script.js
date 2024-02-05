// Synth_________________________________________

const volume = new Tone.Volume(-Infinity).toDestination();

const LPfilter = new Tone.Filter(550, "lowpass").connect(volume);

const HPfilter = new Tone.Filter(550, "highpass").connect(LPfilter);

const reverb = new Tone.Reverb(100, "verb").connect(HPfilter);

const delay = new Tone.FeedbackDelay("8.", 1, "FBDelay").connect(reverb);

const synth = new Tone.MonoSynth({
  volume: -8,
  oscillator: {
    type: "sine"
  },
  envelope: {
    attack: 1.0,
    decay: 1.0,
    sustain: 1.0,
    release: 1.0
  },
  filterEnvelope: {
    attack: 1.0,
    decay: 0.7,
    sustain: 0.1,
    release: 0.8,
    baseFrequency: 300,
    octaves: 4
  }
});

synth.connect(delay);

// Keyboard____________________________________________

var notes = ["C", "D", "E", "F", "G", "A", "B"];
var html = "";

for (var octave = -2; octave < 0; octave++) {
  for (var i = 0; i < notes.length; i++) {
    var hasSharp = true;
    var note = notes[i];

    if (note == "E" || note == "B") hasSharp = false;
    html += `<div class='whitenote'onmousedown='noteDown(this, false)'
    data-note='${note + (octave + 4)}'>`;

    if (hasSharp) {
      html += `<div class='blacknote'onmousedown='noteDown(this, true)'
    data-note='${note + "#" + (octave + 4)}'></div>`;
    }
    html += "</div>";
  }
}
document.getElementById("container").innerHTML = html;

function noteDown(elem, isSharp) {
  var note = elem.dataset.note;
  synth.triggerAttack(note);
  Tone.start();
  event.stopPropagation();
}

const loop = new Tone.Loop((time) => {
  // synth.triggerAttackRelease(note);
  console.log(time);
}, "1n").start(0);
Tone.Transport.start();

Tone.Transport.bpm.value = 130;

function Stop() {
  Tone.Transport.stop();
}

// Controls___________________________________________

const gain = new Nexus.Dial("#gain", {
  size: [75, 75],
  interaction: "vertical",
  mode: "relative"
});
gain.on("change", function (v) {
  volume.volume.rampTo(v, 0.1);
});
gain.min = -50;
gain.max = 0;
gain.value = -6;
gain.colorize("accent", "white");
gain.colorize("fill", "#333");
document.body.style.backgroundColor = "#000";

const LPFilter = new Nexus.Dial("#LPFilter", {
  size: [75, 75],
  interaction: "vertical",
  mode: "relative"
});
LPFilter.on("change", function (v) {
  LPfilter.frequency.rampTo(v, 0.1);
});
LPFilter.min = 20;
LPFilter.max = 550;
LPFilter.value = 550;
LPFilter.colorize("accent", "white");
LPFilter.colorize("fill", "#333");
document.body.style.backgroundColor = "#000";

const HPFilter = new Nexus.Dial("#HPFilter", {
  size: [75, 75],
  interaction: "vertical",
  mode: "relative"
});
HPFilter.on("change", function (v) {
  HPfilter.frequency.rampTo(v, 0.1);
});
HPFilter.min = 20;
HPFilter.max = 650;
HPFilter.value = 20;
HPFilter.colorize("accent", "white");
HPFilter.colorize("fill", "#333");
document.body.style.backgroundColor = "#000";

function onWaveSelection(wave) {
  synth.oscillator.type = wave;
}

// const oscilloscope = new Nexus.Oscilloscope("#oscilloscope", {
//   size: [250, 200]
// });
// oscilloscope.colorize("accent", "white");
// oscilloscope.colorize("fill", "black");
// document.body.style.backgroundColor = "#000";

// oscilloscope.connect(volume);

const verb = new Nexus.Dial("#verb", {
  size: [75, 75],
  interaction: "vertical",
  mode: "relative"
});
verb.on("change", function (v) {
  reverb.wet.rampTo(v, 0.1);
});
verb.min = 0;
verb.max = 1;
verb.value = 0.3;
verb.colorize("accent", "white");
verb.colorize("fill", "#333");
document.body.style.backgroundColor = "#000";

const FBDelay = new Nexus.Dial("#FBDelay", {
  size: [75, 75],
  interaction: "vertical",
  mode: "relative"
});
FBDelay.on("change", function (v) {
  delay.wet.rampTo(v, 0.1);
});
FBDelay.min = 0;
FBDelay.max = 1;
FBDelay.value = 0.3;
FBDelay.colorize("accent", "white");
FBDelay.colorize("fill", "#333");
document.body.style.backgroundColor = "#000";
