(function(window, document) {
        "use strict";
        const audio = document.querySelector("audio");
        const speaker = document.querySelector("#speaker");
        const audioPlayPauseCb = function() {
                if (this.paused) {
                        speaker.classList.add("mute");
                } else {
                        speaker.classList.remove("mute");
                }
        };
        const speakerCb = function() {
                if (audio.paused) {
                        audio.play();
                } else {
                        audio.pause();
                }
        };
        audio.addEventListener("play", audioPlayPauseCb);
        audio.addEventListener("pause", audioPlayPauseCb);
        speaker.addEventListener("click", speakerCb, false);
})(window, document);
