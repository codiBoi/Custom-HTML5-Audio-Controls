/**
 * @type {HTMLAudioElement}
 */
const audio = document.getElementById("audio");
const timebar = document.getElementById("timebar");
const timefill = document.getElementById("timefill");
const playb = document.getElementById("play-pause");
const playicon = "assets/svg/play.svg";
const pausicon = "assets/svg/pause.svg";

const displayers = {
    time: document.getElementById("ctime"),
    duration: document.getElementById("duration")
}

const dmin = Math.floor(audio.duration / 60);
const dsec = Math.floor((audio.duration / 60 - Math.floor(audio.duration / 60)) * 60);

update();
displayers.duration.innerText = nts(dmin) + ':' + nts(dsec);

timebar.addEventListener("mousedown", e => {
    timefill.style.width = e.offsetX + 'px';
    audio.currentTime = (e.offsetX / timebar.clientWidth) * audio.duration;
});

audio.addEventListener('timeupdate', update);

function update() {
    const ctime = audio.currentTime;
    timefill.style.width = (ctime / audio.duration) * 100 + '%';
    const dtime = {
        min: Math.floor(ctime / 60),
        sec: Math.floor((ctime / 60 - Math.floor(ctime / 60)) * 60),
    }
    displayers.time.innerText = nts(dtime.min) + ':' + nts(dtime.sec);
}

playb.addEventListener("click", e => {
    if (audio.paused) {
        audio.play();
        playb.childNodes[1].childNodes[1].src = pausicon;

    } else {
        audio.pause();
        playb.childNodes[1].childNodes[1].src = playicon;
    }
})

function nts(n) { //NumberToString
    return n < 10 ? `0${n}` : `${n}`;
}