console.log("Welcome to Spotify");


let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let currentPlayButton = null; 


let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji - Heroes Tonight (feat. Johnning) [NCS Release]", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"}
];

songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});


const makeAllPlays = () => {
    Array.from(document.querySelectorAll('.play-button')).forEach((element) => {
        element.textContent = '▶'; 
    });
}


document.addEventListener("DOMContentLoaded", function() {
    masterPlay.textContent = '▶'; // Set initial state to play
});




document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', function() {
        const id = this.id;
        const clickedPlayButton = this;

        if (currentPlayButton === clickedPlayButton) {
            if (audioElement.paused) {
                audioElement.play();
                clickedPlayButton.textContent = '❚❚'; // Pause icon
                masterPlay.textContent = '❚❚'; // Pause icon
                gif.style.opacity = 1;
            } else {
                audioElement.pause();
                clickedPlayButton.textContent = '▶'; // Play icon
                masterPlay.textContent = '▶'; // Play icon
                gif.style.opacity = 0;
            }
            return;
        }

        if (currentPlayButton) {
            currentPlayButton.textContent = '▶'; // Reset previous button to play
        }

        clickedPlayButton.textContent = '❚❚'; // Set current button to pause

        songIndex = parseInt(id);
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.textContent = '❚❚'; // Set master button to pause

        currentPlayButton = clickedPlayButton;
    });
});

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.textContent = '❚❚'; // Set to pause
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.textContent = '▶'; // Set to play
        gif.style.opacity = 0;
    }
});



audioElement.addEventListener('timeupdate', () => { 
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.textContent = '❚❚';
});


document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex <= 0) ? songs.length - 1 : songIndex - 1;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.textContent = '❚❚';
});


// Existing code...

let volumeControl = document.getElementById('volumeControl');

// Set initial volume
audioElement.volume = volumeControl.value / 100;

// Event listener for volume control
volumeControl.addEventListener('input', () => {
    audioElement.volume = volumeControl.value / 100;
});
