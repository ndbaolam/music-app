const elementAplayer = document.getElementById('aplayer');
if(elementAplayer) {
    let dataSong = elementAplayer.getAttribute('data-song');
    dataSong = JSON.parse(dataSong);
    let dataSinger = elementAplayer.getAttribute('data-singer');
    dataSinger = JSON.parse(dataSinger);

    const ap = new APlayer({
        container: elementAplayer,
        audio: [{
            name: dataSong.name,
            artist: dataSinger.name,
            url: dataSong.audio,
            cover: dataSong.avatar
        }],
        autoplay: true
    });

    const avatar = document.querySelector('.singer-detail .inner-avatar');

    ap.on('play', () => {
        avatar.style.animationPlayState = 'running';
    });

    ap.on('pause', () => {
        avatar.style.animationPlayState = 'paused';
    });
}