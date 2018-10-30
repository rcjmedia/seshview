// let socket  =  io.connect('https://pure-anchorage-64247.herokuapp.com');
let socket  =  io.connect('http://localhost:8080');

// Extracted buttons
let buttons = document.getElementsByTagName('button');
let playButton = buttons[0];
let pauseButton = buttons[1];

// slider
let slider = document.getElementById('slider');

// pause and play event listener added
playButton.addEventListener('click',playVideo);
pauseButton.addEventListener('click',pauseVideo);

// The onYouTubeIframeAPIReady function creates an iframe 
// for the YouTube player after the API code downloads
// source: https://akashtiwari82.wordpress.com/2016/06/05/youtube-iframe-api/
let player;
function onYouTubeIframeAPIReady() {
let urlBody = document.getElementById('trimUrl').innerText;
console.log("HERE IS THE ID: ",urlBody);
  player = new YT.Player('player', {
    height: '580px',
    width: '1020px' ,
    videoId: urlBody,
    playerVars: {
      autoplay:0,
      rel:0,
      modestbranding:1,
      controls: 0,
      disablekb: 1,
      showInfo:0
  },
  });
}

function newConnection(socket) {
    console.log('New Connection: ' + socket.id)
}

// play event added
function playVideo() {
  socket.emit('play')
  player.playVideo();
  setInterval(()=>{
    let fraction = player.getCurrentTime()/player.getDuration()*100;
    slider.value = fraction;
    socket.emit('slider',slider.value);
  },200)
}

// pause event handled
function pauseVideo() {
  socket.emit('pause')
  player.pauseVideo();
}

// seeker handled
function changeTime(e){
  let goTo = player.getDuration() * (e.value / 100);
  console.log(goTo);
  player.seekTo(goTo,true);
  e.value = goTo
  socket.emit('update',goTo);
}

// socket events handled

socket.on('update',(data)=>{
  console.log("Seek signal from user", socket.id)
  console.log('Recieved data',data)
  slider.value = data;
  player.seekTo(data,true);
})

socket.on('play',()=>{
  console.log("Play signal from user", socket.id)
  player.playVideo();
})

socket.on('pause',()=>{
  console.log("Pause signal from user", socket.id)
  player.pauseVideo();
})

socket.on('slider',(data)=>{
  slider.value = data;
})
