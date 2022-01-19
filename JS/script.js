let AudioPlayer = document.getElementById("AudioPlayer")
    PlayPause = document.getElementById("play-pause"),
    Next = document.getElementById("next"),
    Prev = document.getElementById("prev"),
    Name = document.getElementById("Name"),
    Artist = document.getElementById("Artist"),
    Album = document.getElementById("Album"),
    CurrentMusic = document.getElementById("main-audio"),
    progreesBar = document.getElementById("progressBar"),
    progressArea = document.getElementById("progressArea"),
    volumeArea = document.getElementById("volumeArea"),
    volumeBar = document.getElementById("volumeBar"),
    mainImage = document.getElementById("main-img"),
    Paused = true,
    Playing = false,
    notes = document.getElementById("notes").style;


let allMusic = [];

$.getJSON("./playlist.json",
    function(music) {

        music.tracks.forEach(function(music) {
            allMusic.push({
                name: music.name,
                artist: music.artist,
                img: music.img,
                src: music.src
            });
        });
        console.clear
    });







let musicIndex = Math.floor((Math.random() * allMusic.length) + 1),
    isMusicPause = false;

window.addEventListener('load', () => {
    loadMusic(musicIndex);
    controls();
    animate();
})




//Load Music
function loadMusic(indexNumb) {
    Name.innerText = allMusic[indexNumb - 1].name;
    Artist.innerText = allMusic[indexNumb - 1].artist;
    Album.src = allMusic[indexNumb - 1].img;
    CurrentMusic.src = allMusic[indexNumb - 1].src;
}


//Play Function
function playMusic() {
    AudioPlayer.classList.add("paused");
    PlayPause.innerText = "pause";
    CurrentMusic.play();
    Playing = true;
    Paused = false;
    animate();
    document.title = Name.innerText + " - " + Artist.innerText;
    playingSong();
    title();
}

//Pause Function
function pauseMusic() {
    AudioPlayer.classList.remove("paused");
    PlayPause.innerText = "play_arrow";
    CurrentMusic.pause();
    Paused = true;
    Playing = false;
    animate();
    document.title = "QLF - Custom Beats by Dre";
}


//Start or stop animation by Music Process

function animate() {
    if (Playing) {
        function unfade(notes) {
            var op = 0.1; // initial opacity
            var timer = setInterval(function() {
                if (op >= 1) {
                    clearInterval(timer);
                }
                notes.opacity = op;
                notes.filter = 'alpha(opacity=' + op * 100 + ")";
                op += op * 0.1;
            }, 100);
        }
        unfade(notes)
    } else if (Paused || CurrentMusic.muted == true) {
        notes.opacity = 1;
        (function fade() {
            (notes.opacity -= 0.1) < 0 ? notes.opacity = 0 : setTimeout(fade, 100)
        })();
    }
}

CurrentMusic.addEventListener("time", controls())

function controls() {
    if (CurrentMusic.play == true) {
        PlayPause.innerText = "pause";

    } else if (CurrentMusic.pause == true || CurrentMusic.stop == true) {
        PlayPause.innerText = "play_arrow";
    }
}




//Previous Music Function
function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    title();
    playingSong();
}


// Setting the no shuffle option as default 
no_shuffle= true;
shuffle= false;


//Next Music function
function nextMusic() {
    if (shuffle){
        let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
        do{
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
        }while(musicIndex == randIndex);
        musicIndex = randIndex;
        loadMusic(musicIndex);
        playMusic();
        playingSong();
    }
    else if(no_shuffle){
        musicIndex++;
        musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
        loadMusic(musicIndex);
        playMusic();
        playingSong();
    }

    title();
}

// play or pause button event
PlayPause.addEventListener("click", () => {
    const isMusicPlay = AudioPlayer.classList.contains("paused");
    isMusicPlay ? pauseMusic() : playMusic();
});
//prev music button event
Prev.addEventListener("click", () => {
    prevMusic();
    title();
});
//next music button event
Next.addEventListener("click", () => {
    nextMusic();
    title();
});


// update progress bar width according to music current time
CurrentMusic.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    let musicCurrentTime = AudioPlayer.querySelector(".current-time"),
        musicDuartion = AudioPlayer.querySelector(".max-duration");
    CurrentMusic.addEventListener("loadeddata", () => {
        let mainAdDuration = CurrentMusic.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });

    // update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// update playing song currentTime on according to the progress bar width
progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = CurrentMusic.duration;

    CurrentMusic.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
});

// Make progress bar drag on mouse move 

var progressDrag = false;
$('#progressArea').on('mousedown', function(e) {
    progressDrag = true;
    updateProgress(e.pageX);
});
$(document).on('mouseup', function(e) {
    if (progressDrag) {
        progressDrag = false;
        updateProgress(e.pageX);
    }
});
$(document).on('mousemove', function(e) {
    if (progressDrag) {
        updateProgress(e.pageX);
    }
});
var updateProgress = function(x, time) {
    var progressArea = $('.progress-area');
    var TimeByWidth;
    if (time) {
        TimeByWidth = (CurrentMusic.currentTime / CurrentMusic.duration) * 100;
    } else {
        var position = x - progressArea.offset().left;
        TimeByWidth = 100 * position / progressArea.width();
    }

    if (TimeByWidth > 100) {
        TimeByWidth = 100;
    }
    if (TimeByWidth < 0) {
        TimeByWidth = 0;
    }

    //update music timeline
    $('#progressBar').css('width', TimeByWidth + '%');
    CurrentMusic.currentTime = (TimeByWidth / 100) * CurrentMusic.duration;

};





//change loop, shuffle, repeat icon onclick
const repeatBtn = document.querySelector("#repeat");
repeatBtn.addEventListener("click", ()=>{
  let getText = repeatBtn.innerText;
  switch(getText){
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Chanson en boucle");
      repeat = false;
      repeat_one = true;
      
      break;
    case "repeat_one":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Liste de lecture en boucle");
      repeat = true;
      repeat_one = false;
      break;
  }
});





const shuffleBtn = document.getElementById('shuffle');
let shuffleText = shuffleBtn.innerText;
shuffleBtn.addEventListener("click", ()=>{
    if (shuffleBtn.innerText === "shuffle"){
        shuffleBtn.innerText = "shuffle_on";
        shuffleBtn.setAttribute("title", "Liste de lecture mélangée");
        shuffle = true;
        no_shuffle = false;
    }
    else if (shuffleBtn.innerText === "shuffle_on"){
        shuffleBtn.innerText = "shuffle";
        shuffleBtn.setAttribute("title", "Liste de lecture non mélangée");
        shuffle = false;
        no_shuffle = true;
    }
});

// Start a new song when done


CurrentMusic.addEventListener("ended", ()=>{
    let getText = repeatBtn.innerText;
    if (repeat && !shuffle){
        nextMusic();
        title();
        console.log("Repeat without shuffle")
    }
    else if(shuffle && !repeat_one){
        let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
        do{
          randIndex = Math.floor((Math.random() * allMusic.length) + 1);
        }while(musicIndex == randIndex);
        musicIndex = randIndex;
        loadMusic(musicIndex);
        playMusic();
        playingSong();
        title();
        console.log("Shuffled")
    }

    else if(repeat_one){
        CurrentMusic.currentTime = 0;
        loadMusic(musicIndex);
        playMusic();
        title();
        console.log("Repeat One")
    }
        
  });



//Adjust  Volume by click bar;
volumeBar.width = CurrentMusic.volume * 100;
var audio = document.getElementById('main-audio');


$('.muted').click(function() {
    audio.muted = !audio.muted;
    return false;
});


var volumeDrag = false;
$('#volumeArea').on('mousedown', function(e) {
    volumeDrag = true;
    audio.muted = false;
    updateVolume(e.pageX);
});
$(document).on('mouseup', function(e) {
    if (volumeDrag) {
        volumeDrag = false;
        updateVolume(e.pageX);
    }
});
$(document).on('mousemove', function(e) {
    if (volumeDrag) {
        updateVolume(e.pageX);
    }
});
var updateVolume = function(x, vol) {
    var volumeArea = $('#volumeArea');
    var percentage;
    //if only volume have specificed
    //then direct update volume
    if (vol) {
        percentage = vol * 100;
    } else {
        var position = x - volumeArea.offset().left;
        percentage = 100 * position / volumeArea.width();
    }

    if (percentage > 100) {
        percentage = 100;
    }
    if (percentage < 0) {
        percentage = 0;
    }

    //update volume bar and audio volume
    $('#volumeBar').css('width', percentage + '%');
    audio.volume = percentage / 100;

};


function update() {
    volumeBar.width = CurrentMusic.volume * 100 + '%';
}

update();


// Mute/Unmute Button

function sound() {

    var button = document.getElementById("sound")


    if (CurrentMusic.muted === false) {
        CurrentMusic.muted = true;
        button.innerText = "volume_mute";
        CurrentMusic.volume = 0;
        volumeBar.style.width = 0 + "%";

    } else {
        CurrentMusic.muted = false;
        button.innerText = "volume_up";
        CurrentMusic.volume = 1;
        volumeBar.style.width = 100 + "%";
    };


    function unmute() {
        var CurrentMusic = document.getElementById("audio");
        CurrentMusic.muted = false;
    }
}

// Change sound icon on volume level{


CurrentMusic.addEventListener("onvolumechange", e => {
    if (CurrentMusic.volume <= 0.5 && CurrentMusic.volume > 0) {
        document.getElementById('sound').innerText = volume_down;
    }
});


//Adjust Volume level on mouse wheel
var width;


volumeArea.addEventListener("wheel", function(e) {
    var volumeScroll = CurrentMusic.volume;
    if (e.deltaY < 0) {
        volumeScroll += 0.1;
    } else {
        volumeScroll -= 0.1;
    }

    if (volumeScroll < 0) {
        volumeScroll = 0
    }

    if (volumeScroll > 1) {
        volumeScroll = 1
    }

    CurrentMusic.volume = volumeScroll;
    width = Math.floor(CurrentMusic.volume * 100);
    $('#volumeBar').css('width', width + '%');

    e.preventDefault();
    e.stopPropagation();
})



// Change Volume Icon based on volume Level

var sound_btn = document.getElementById("sound");

CurrentMusic.onvolumechange = (event) => {
    if (CurrentMusic.volume >= 0.66) {
        sound_btn.innerText = "volume_up";
    } else if (CurrentMusic.volume < 0.66 && CurrentMusic.volume != 0) {
        sound_btn.innerText = "volume_down";
    } else if (CurrentMusic.volume === 0) {
        sound_btn.innerText = "volume_off";
    }
};

//Play or pause by Spacebar



// Skip songs by arrow keys

function onKeyDown(event) {
    if (!$('#commentaire').is(':focus') && !$('#email').is(':focus') && !$('#nom').is(':focus') && !$('#input').is(':focus') && !$('#Search').is(':focus')) {
        switch (event.keyCode) {
            case 32: //SpaceBar                    
                if (Playing) {
                    CurrentMusic.pause();
                    Playing = false;
                    Paused = true;
                    PlayPause.innerText = "play_arrow";
                    document.title = "QLF - Custom Beats by Dre"
                    animate();
                } else {
                    CurrentMusic.play();
                    Playing = true;
                    Paused = false;
                    PlayPause.innerText = "pause";
                    animate();
                    document.title = Name.innerText + " - " + Artist.innerText;
                }
                break;

            case 37: //left
                prevMusic();
                animate();

            case 39: // right
                nextMusic();
                animate();
        }

        return false;
    }
}

window.addEventListener("keydown", onKeyDown, false);



navigator.mediaSession.setActionHandler('play', function() {playMusic() });
navigator.mediaSession.setActionHandler('pause', function() {pauseMusic() });
navigator.mediaSession.setActionHandler('seekbackward', function() { prevMusic(); });
navigator.mediaSession.setActionHandler('seekforward', function() { nextMusic() ; });
navigator.mediaSession.setActionHandler('previoustrack', function() { prevMusic() });
navigator.mediaSession.setActionHandler('nexttrack', function() { nextMusic() });

// Prevent Space Key from Scrolling the page - But for stoppin the Music player Instead

window.onkeydown = function(e) {
    return !(e.keyCode == 32 && e.target == document.body);
};



// Save Search History

var Search = document.getElementById('Search');
var SearchIcon = document.getElementById('search-icon');
var History = document.getElementById('searchHistory');

var addSearched = function () {
    var text = Search.value;
    var li = document.createElement('li');
    li.innerText = text
                   
    History.appendChild(li);
}

SearchIcon.onclick = addSearched;

$('#Search').keypress(function(e) {
    if(e.which == 13) {
        var text = Search.value;
        var li = document.createElement('li');
        li.innerText = text
                       
        History.appendChild(li);    }
  });




// Header




let hide = document.getElementById("close"),
    search = document.getElementById("search"),
    searchSection = document.getElementById("search-section").style;



function nodisplay() {
    searchSection.transform = "translateY(-1080px)";
};

function display() {
    searchSection.transform = "translateY(0px)";
};



// Menu

let closeBtn = document.getElementById("close-btn").style,
    menuBtn = document.getElementById("menu-btn").style;
menu = document.getElementById("menu").style;


function showMenu() {
    menu.transform = "translateY(0px)";
};

function hideMenu() {
    menu.transform = "translateY(-1500px)";
};


// Menu Inner Effects
function bigMenu(x) {

    var elements = document.getElementsByClassName("menu-column");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.height = ("17.5%");
    }

    x.style.height = "30%";

}

function normalMenu() {

    var elements = document.getElementsByClassName("menu-column");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.height = ("20%");
    }

}




function title(){

    var origTitle, animatedTitle, timer;

    var Name = document.getElementById("Name"),
        Artist = document.getElementById("Artist");

    function animateTitle(newTitle) {
        var currentState = false;
        origTitle = "QLF - Custom Beats by Dre"; // save original title
        animatedTitle = Name.innerText + " - " + Artist.innerText;
        timer = setInterval(startAnimation, 1000);

        function startAnimation() {
            // animate between the original and the new title
            document.title = currentState ? origTitle : animatedTitle;
            currentState = !currentState;
        }
    }

    function restoreTitle() {
        clearInterval(timer);
        document.title = origTitle; // restore original title
    }

    // Change page title on blur
    $(window).blur(function() {
        animateTitle();
    });

    // Change page title back on focus
    $(window).focus(function() {
        restoreTitle();
    })

};


title();





//Slide Images on scroll

function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide(e) {
    sliderImages.forEach(sliderImage => {
        // halfway through the image
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
        // bottom of the image
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        if (isHalfShown && isNotScrolledPast) {
            sliderImage.classList.add('active');
        } else {
            sliderImage.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', debounce(checkSlide));




// Go to top button

//Get the button
var mybutton = document.getElementById("Btn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        mybutton.style.transform = "translateX(0%)";
    } else {
        mybutton.style.transform = "translateX(500%)";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


