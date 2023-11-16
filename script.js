console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let isLooping = false;
let isMuted=false;
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
    {songName: "Neffex Best Of ME", filePath: "songs/11.mp3", coverPath: "covers/11.jpg"},
]

//pupulate items with cover images and song names
function syncUI(){
    songItems.forEach((element,i)=>{
        console.log(element,i);
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
        // element.getElementsByClassName("timestamp")[0].innerText = formatTime(audioElement.duration);
})
}
syncUI();
// handle previous button click event
function previous(){
    if(songIndex<=0){
        songIndex=songs.length-1;
    }
    else{
    songIndex-=1;
    }
    playSelectedSong();
}
//handle forward button click event
function forward(){
    if(songIndex>=(songs.length-1)){
        songIndex=0;
    }
    else{
    songIndex+=1;
    }
    playSelectedSong();
}
// Handle play/pause click
function play(){
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
}
// function to play the selected song
function playSelectedSong() {
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    masterSongName.innerText = songs[songIndex].songName;
    makeAllPlays();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
}
//function to format time in minutes and seconds
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
//for muting one song
function mute(){
    if (!isMuted) {
        audioElement.muted = true;
        document.getElementById('mute').classList.remove('volume-off');
    } else {
        audioElement.muted = false;
        document.getElementById('mute').classList.add('volume-high');
    }
    isMuted = !isMuted;
}
//for the looping one song
function loop(){
    if (!isLooping) {
        audioElement.loop = true;
        // document.getElementById(gif.)
        document.getElementById('loop').classList.add('fa-beat');
    } else {
        audioElement.loop = false;
        document.getElementById('loop').classList.remove('fa-beat');
    }
    isLooping = !isLooping;
}
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
//handle time update event
function updateTimestamp() {
    const currentTimestamp = formatTime(audioElement.currentTime);
    const totalTimestamp = formatTime(audioElement.duration);
    document.querySelector('.songinfo').innerText = `${currentTimestamp} / ${totalTimestamp}`;
}
// Listen to Events

document.getElementById('mute').addEventListener('click', () => {
    mute();
 });
document.getElementById('previous').addEventListener('click',()=>{
    previous();
 })
document.getElementById('next').addEventListener('click',()=>{
    forward();
})
document.getElementById('loop').addEventListener('click', () => {
    loop();
});
masterPlay.addEventListener('click',()=>{
    play();
})
document.addEventListener('keydown',(Event)=>{
    if(Event.code==="Space"){
        play();
    }
    if(Event.code==="KeyM"){
        mute();
    }
});
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
    updateTimestamp();
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})