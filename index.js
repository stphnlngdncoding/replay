console.log("hello world!");
let keyMap = {
  "a": "C4",
  "s": "D4",
  "d": "E4",
  "f": "F4",
  "g": "G4",
  "h": "A4",
  "j": "B4",
  "k": "C5",
  "l": "D5",
  ";": "E5",

}
let melodyStore = [];
let melody = [];

function recordKeyups(event) {
  console.log("inside recordkeyup");
    event.timing = performance.now()
    melody.push(event);
}
$('#record').on('click', () => {
  window.addEventListener("keyup", recordKeyups);
})
$('#stop').on('click', () => {
  melodyStore.push(melody);
  melody = [];
  window.removeEventListener('keyup', recordKeyups);
})

var synth = new Tone.Synth().toMaster();
$('#play').on('click', function(e){
  melody.forEach(event => console.log(event.timing))
  let prevTime = 0;
  let thisTime;
  //found difference between each stroke
  // for (var i = 0; i < eventQueue.length; i++) {
  //   if (i === 0) {
  //     prevTime = eventQueue[i].timing;
  //     eventQueue[i].timing = 0;
  //   } else {
  //     thisTime = eventQueue[i].timing - prevTime;
  //     prevTime = eventQueue[i].timing;
  //     eventQueue[i].timing = thisTime;
  //   }
  // }
  let offset = melody[0].timing;
  //differene between first stroke and 0;
  melody.forEach(event => {
    event.timing = event.timing - offset
  })
  melody.forEach(event => {
    console.log(event.timing)
    console.log(event);
  })
  melody.forEach(event => {
    setTimeout(()=>{
      console.log("playing note");
      let noteMap = keyMap[event.key];
      synth.triggerAttackRelease(noteMap, "8n");
    }, event.timing);
  })
  melody = [];
})