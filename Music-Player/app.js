const container = document.querySelector("#container");
const image = document.querySelector("#music-image");
const audio = document.querySelector("#music-audio");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");

const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
  let music = player.getMusic();
  displayMusic(music);
  displayMusicList(player.musicList);
  isPlayingNow();
});

function displayMusic(music) {
  title.innerText = music.title;
  singer.innerText = music.singer;
  image.src = "img/" + music.img;
  audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {
  const isMusicPlay = container.classList.contains("playing");
  isMusicPlay ? pauseMusic() : playMusic();
});
function pauseMusic() {
  container.classList.remove("playing");
  play.querySelector("i").className = "fa-solid fa-play";
  audio.pause();
}

function playMusic() {
  container.classList.add("playing");
  play.querySelector("i").className = "fa-solid fa-pause";
  audio.play();
}
prev.addEventListener("click", () => {
  player.previous();
  let music = player.getMusic();
  displayMusic(music);
  isPlayingNow();
});
next.addEventListener("click", () => {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  isPlayingNow();
});
const calculateTime = (totalSecond) => {
  const minute = Math.floor(totalSecond / 60);
  const second = Math.floor(totalSecond % 60);
  const currentSecond = second < 10 ? `0${second}` : `${second}`;
  const conclusion = `${minute}:${currentSecond}`;
  return conclusion;
};
audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});
audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTime(progressBar.value);
});
progressBar.addEventListener("input", () => {
  currentTime.textContent = calculateTime(progressBar.value);
  audio.currentTime = progressBar.value;
});

let muteState = "muted";

volumeBar.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100;
  if (value == 0) {
    audio.muted = true;
    muteState = "unmuted";
    volume.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    muteState = "muted";
    volume.classList = "fa-solid fa-volume-high";
  }
});
volume.addEventListener("click", () => {
  if (muteState === "muted") {
    audio.muted = true;
    muteState = "unmuted";
    volume.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    muteState = "muted";
    volume.classList = "fa-solid fa-volume-high";
    volumeBar.value = 100;
  }
});

const displayMusicList = (list) => {
  const ul = document.querySelector(".list-group");
  for (let i = 0; i < list.length; i++) {
    let liTag = `
        <li li-index='${i}' onclick = "selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center py-3 fw-normal px-4  " style= "backdrop-filter: blur(30px);   background-color: rgba(127, 127, 127, 0.2); color: white; border-bottom: 4px solid rgba(0, 0, 0, 0.4);">
            <span class="fw-medium fs-6 ">${list[i].getName()}</span>
            <span id="music${i}" class="badge text-black bg-light px-3 py-2 rounded-pill fs-6 fw-medium "></span>
            <audio id="audio${i}" class="music-${i} " src="mp3/${
      list[i].file
    }"></audio>
        </li>
      `;
    ul.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = document.getElementById(`music${i}`);
    let liAudioTag = document.getElementById(`audio${i}`);

    liAudioTag.addEventListener("loadedmetadata", () => {
      liAudioDuration.innerText = calculateTime(liAudioTag.duration);
    });
  }
};
const selectedMusic = (li) => {
  const index = li.getAttribute("li-index");
  player.index = index;
  displayMusic(player.getMusic());
  playMusic();
  isPlayingNow();
};
const isPlayingNow = () => {
  const ul = document.querySelector(".list-group");
  for (let li of ul.querySelectorAll("li")) {
    if (li.classList.contains("playing")) {
      li.classList.remove("playing");
    }
  }
  if (ul.querySelector(`li[li-index="${player.index}"]`)) {
    ul.querySelector(`li[li-index="${player.index}"]`).classList.add("playing");
  }
};
