(function(window, document) {
        "use strict";
        const toggleAbout = () => {
                const c1 = document.querySelector(".container1");
                const c2 = document.querySelector(".container2");
                c1.style.opacity = 0;
                c2.style.opacity = 1;
                c1.style.visibility = "hidden";
                c2.style.visibility = "visible";
                document.body.classList.remove("normal");
                document.body.classList.add("about");
        };
        const hashCallback = () => {
                const h = window.location.hash;
                if (h.length <= 1) {
                        return;
                }
                if (h === "#aboutme" || h.indexOf("#extendedinfo-") === 0) {
                        toggleAbout();
                }
                const ta = document.querySelector('[data-tippy-html="' + h + '"]');
                if (ta) {
                        ta.click();
                }
        };
        hashCallback();
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
        document.querySelector("#aboutme").addEventListener(
                "click",
                toggleAbout
        );
})(window, document);
