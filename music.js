const songs = [
  { title: "Song One", artist: "Artist A", src: "songs/song1.mp3" },
  { title: "Song Two", artist: "Artist B", src: "songs/song2.mp3" },
  { title: "Song Three", artist: "Artist C", src: "songs/song3.mp3" }
];

let songIndex = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

loadSong(songIndex);


function loadSong(index) {
  title.innerText = songs[index].title;
  artist.innerText = songs[index].artist;
  audio.src = songs[index].src;
}


function playPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}


function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  audio.play();
}


function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  audio.play();
}


audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";

  currentTimeEl.innerText = formatTime(audio.currentTime);
  durationEl.innerText = formatTime(audio.duration);
});


progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});


volume.addEventListener("input", () => {
  audio.volume = volume.value;
});


audio.addEventListener("ended", nextSong);


songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.innerText = song.title;
  li.onclick = () => {
    songIndex = index;
    loadSong(songIndex);
    audio.play();
  };
  playlist.appendChild(li);
});


function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}
