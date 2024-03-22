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
    buttonLike.addEventListener('click', () => {
        //Check if user already logged in
        const existTokenUser = document.cookie.indexOf("tokenUser") > 0 ? true : false;

        if(existTokenUser){
    
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
        } else {
            alert('Please login first!');
        }
    });
}
//End Like feature

// Button Favorite
const listButtonFavorite = document.querySelectorAll("[button-favorite]");
if(listButtonFavorite.length > 0) {
    listButtonFavorite.forEach(buttonFavorite => {
        buttonFavorite.addEventListener("click", () => {
            const existTokenUser = document.cookie.indexOf("tokenUser") > 0 ? true : false;

            if(existTokenUser){
                const isActive = buttonFavorite.classList.contains("active");
            
                const typeFavorite = isActive ? "no" : "yes";
                
                const idSong = buttonFavorite.getAttribute("button-favorite");
                const link = `/songs/favorite/${typeFavorite}/${idSong}`;
                fetch(link, { method: "PATCH" })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        buttonFavorite.classList.toggle("active");
                    })
            } else {
                alert('Please login first!');
            }
        });
    });
}
// End Button Favorite

//Search suggestions
const boxSearch = document.querySelector('.box-search');
if(boxSearch){
    const inputSearch = boxSearch.querySelector('.form-control');

    let timeOut;
    inputSearch.addEventListener('keyup', (e) => {
        const removedUl = boxSearch.querySelector('.suggest__list');
        const keyword = inputSearch.value;

        if(e.which === 27) {
            removedUl.remove();
            return;
        }

        clearTimeout(timeOut);

        timeOut = setTimeout(() => {

            if(removedUl)
                removedUl.remove();

            if((e.which >= 48 && e.which <= 90) || keyword){

                const link = `/search/suggest/${keyword}`;

                fetch(link, { method: 'POST' })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        const ul = document.createElement('ul');
                        ul.classList.add('suggest__list');

                        if(data.songs.length > 0){
                            ul.innerHTML = '<div class="suggest__list--content"></div>';

                            boxSearch.appendChild(ul);

                            const suggetListContent = boxSearch.querySelector('.suggest__list--content');

                            data.songs.forEach(song => {
                                const li = document.createElement('li');
                                li.classList.add('suggest__item');

                                li.innerHTML += `                                    
                                    <a href="/songs/detail/${song.slug}">                                           
                                        <div class="is-oneline">
                                            <span class=""><b> ${song.title}</b></span>
                                        </div>
                                    </a>
                                `;

                                suggetListContent.appendChild(li);
                            });
                        } else {
                            ul.innerHTML = '<div class="suggest__list--content"><b>Không tìm thấy bài hát!</b></div>';

                            boxSearch.appendChild(ul);
                        }
                    });
            }
        }, 500);
    });
}
//End search suggestions