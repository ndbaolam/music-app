//AudioPlayer
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
//End AudioPlayer

//Show alert
const showAlert = document.querySelector('[show-alert]');
if(showAlert){
    const time = parseInt(showAlert.getAttribute('data-time'));
    setTimeout(() => {
        showAlert.classList.add('alert-hidden');
    }, time);

    const closeAlert = document.querySelector('[close-alert]');
    closeAlert.addEventListener('click', () => {
        showAlert.classList.add('alert-hidden');
    });
}
//End Show alert

//Like feature
const buttonLike = document.querySelector('[button-like]');
if(buttonLike){
    //Check if user already logged in
    const cookies = document.cookie.split('; ');

    buttonLike.addEventListener('click', () => {
        const isActive = buttonLike.classList.contains('active');

        const typeLike = isActive ? 'no' : 'yes';
        const idSong = buttonLike.getAttribute('button-like');

        fetch(`/songs/like/${typeLike}/${idSong}`, {method: 'PATCH'})
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const spanLike = buttonLike.querySelector("[data-like]");
                spanLike.innerHTML = data.like;

                buttonLike.classList.toggle("active");
            })
    });
}
//End Like feature

// Button Favorite
const listButtonFavorite = document.querySelectorAll("[button-favorite]");
if(listButtonFavorite.length > 0) {
    listButtonFavorite.forEach(buttonFavorite => {
        buttonFavorite.addEventListener("click", () => {
            const isActive = buttonFavorite.classList.contains("active");
        
            const typeFavorite = isActive ? "no" : "yes";
        
            const idSong = buttonFavorite.getAttribute("button-favorite");
            const link = `/songs/favorite/${typeFavorite}/${idSong}`;
            fetch(link, {
                method: "PATCH"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    buttonFavorite.classList.toggle("active");
                })
            });
    });
}
// End Button Favorite