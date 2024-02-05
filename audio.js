let audio1 = new Audio();
audio1.src = 'song18.mp3';

const audioContext = new AudioContext;

const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let audioSource;
let analyser;
let playing;

container.addEventListener('click',()=>{
  if(playing){
    return;
  }
  audio1.play();
  playing = true;
  audioSource = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 128;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  
  const barWidth = canvas.width/bufferLength;
  let barHeight;
  let x;

  function animate(){
    x=0;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    analyser.getByteFrequencyData(dataArray);
    for(let i =0;i<bufferLength;i++){
      barHeight = dataArray[i]*1.5;
      ctx.fillStyle = 'white';
      ctx.fillRect(x,canvas.height - barHeight,barWidth,barHeight);
      x+=barWidth;
    }
    requestAnimationFrame(animate);
  }
  animate();

});