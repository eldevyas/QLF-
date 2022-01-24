let musicList = document.querySelector(".music-list"),
    moreMusicBtn = document.querySelector("#playlist"),
    closemoreMusic = musicList.querySelector("#close-list"),
    wrapper = document.querySelector(".wrapper");




var json = (function() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "./playlist.json",
        'cache': false,
        'dataType': "json",
        'success': function(data) {
            json = data;
        }
    });
    return json;
    console.clear
})();

let JSON = json;
let PLAYLIST = JSON.tracks;



moreMusicBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", () => {
    moreMusicBtn.click();
});

const ulTag = wrapper.querySelector("ul");
// let create li tags according to array length for list
for (let i = 0; i < PLAYLIST.length; i++) {
    //let's pass the song name, artist from the array
    let liTag = `<li li-index="${i + 1}">
                    <div class="row">
                        <div class = "playlist-ranking">
                            <p id= "ranking">${[i+1]}</p>
                        </div>
                        <div class = "playlist-album">
                            <img src = ${PLAYLIST[i].img} id = "Album">
                        </div>
                        <div class="playlist-song">
                            <span id= "music-name">${PLAYLIST[i].name}</span>
                            <p style= "font-size: 12px; font-weight: 100">${PLAYLIST[i].artist}</p>
                        </div>
                    </div>
                    <span id="${(PLAYLIST[i].src).slice(6, -4).replace(/\s+/g, '').replace("'", '')}" class="audio-duration"<div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></span>
                    <audio class="${(PLAYLIST[i].src).slice(6, -4).replace(/\s+/g, '').replace("'", '')}" src="Music/${(PLAYLIST[i].src).slice(6, -4)}.mp3"></audio>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag); //inserting the li inside ul tag

    
    let liAudioDuartionTag = ulTag.querySelector(`#${(PLAYLIST[i].src).slice(6, -4).replace(/\s+/g, '').replace("'", '')}`);
    let liAudioTag = ulTag.querySelector(`.${(PLAYLIST[i].src).slice(6, -4).replace(/\s+/g, '').replace("'", '')}`);
    if (liAudioTag) {
        liAudioTag.addEventListener("loadeddata", () => {
            let duration = liAudioTag.duration;
            let totalMin = Math.floor(duration / 60);
            let totalSec = Math.floor(duration % 60);
            if (totalSec < 10) { //if sec is less than 10 then add 0 before it
                totalSec = `0${totalSec}`;
            };
            liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
            liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
        });
    }

}

//play particular song from the list onclick of li tag
function playingSong() {
    const allLiTag = ulTag.querySelectorAll("li");

    for (let j = 0; j < allLiTag.length; j++) {
        let audioTag = allLiTag[j].querySelector(".audio-duration");

        if (allLiTag[j].classList.contains("playing")) {
            allLiTag[j].classList.remove("playing");
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration;
        }

        //if the li tag index is equal to the musicIndex then add playing class in it
        if (allLiTag[j].getAttribute("li-index") == musicIndex) {
            allLiTag[j].classList.add("playing");
            audioTag.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'> <rect class='eq-bar eq-bar--1' x='4' y='4' width='3.7' height='8'/><rect class='eq-bar eq-bar--2' x='10.2' y='4' width='3.7' height='16'/> <rect class='eq-bar eq-bar--3' x='16.3' y='4' width='3.7' height='11'/> fill='white'</svg>";

        }
        
        allLiTag[j].setAttribute("onclick", "clicked(this)");

    }
}

//particular li clicked function
function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex; //updating current song index with clicked li index
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

playingSong();

