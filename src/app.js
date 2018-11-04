(function(window, document) {
        "use strict";
        const toggleAbout = () => {
                document.body.classList.toggle("normal");
                document.body.classList.toggle("about");
                const themeColor = document.querySelector("meta[name='theme-color']");
                if (themeColor.content === "#19cf85") {
                        themeColor.content = "#272b30";
                } else {
                        themeColor.content = "#19cf85";
                }
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
        window.addEventListener("hashchange", () => {
                if (window.location.hash === "") {
                        const activeTippy = document.querySelector(".tippy-active");
                        if (activeTippy) {
                                activeTippy._tippy.hide();
                        }
                        toggleAbout();
                }
        });
        document.querySelector("#back-button").addEventListener("click", () => {
                window.location.hash = "";
                history.replaceState(
                        {},
                        document.title,
                        window.location.href.split("#")[0]
                );
        });
        document.querySelector("#aboutmelink").addEventListener(
                "click",
                toggleAbout
        );
})(window, document);
