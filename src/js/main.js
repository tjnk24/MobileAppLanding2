import style from 'css/main.pcss';

$(document).ready(function () {
    onClickShowSteps();
});

function onClickShowSteps() {
    const clickElements = document.querySelectorAll('.js-download-button');
    const content = document.getElementById('content');
    const download = document.getElementById('download');

    clickElements.forEach(function(elem) {
        elem.addEventListener('click', function(event) {
            event.preventDefault();

            content.style.display = 'none';
            download.style.display = 'block';

            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
    });
};

(function(window) {
    function setupVideo() {
        const video = document.getElementById('video-player');
        video.addEventListener('mouseover', function() {
            this.controls = true;
        }, false);
        video.addEventListener('mouseout', function() {
            this.controls = false;
        }, false);
    }

    window.addEventListener('load', setupVideo, false);
})(window);
