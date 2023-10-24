document.addEventListener("DOMContentLoaded", function () {
    const ziziAudio = new Audio('./music/zizi.mp3');
    const bhistoryAudio = new Audio('./music/bhistory.mp3');
    ziziAudio.volume = 0.25;
    bhistoryAudio.volume = 0.15;

    const prevBtn = document.querySelector('.music-previous');
    const playBtn = document.querySelector('.play-pause');
    const nextBtn = document.querySelector('.music-next');
    const songName = document.querySelector('.song-name');
    const playPauseIcon = document.getElementById('play-pause-icon'); // Define playPauseIcon

    const songs = [
        { ele: ziziAudio, audioName: 'Waltz For Zizi - The Seatbelts & Yoko Kanno' },
        { ele: bhistoryAudio, audioName: 'Browser History - Graham Kartna' },
    ];

    for (const song of songs) {
        song.ele.addEventListener('ended', () => {
            updateSong('next');
            playPauseSong();
        });
    }

    let current = 0;
    let currentSong = songs[current].ele;
    songName.textContent = songs[current].audioName;

    // Check if there is a stored playback time and set it
    const storedTime = parseFloat(localStorage.getItem('currentPlaybackTime'));
    if (!isNaN(storedTime)) {
        currentSong.currentTime = storedTime;
    }

    const storedSong = localStorage.getItem('currentSong');
    const storedPlaying = localStorage.getItem('isPlaying');

    if (storedSong) {
        current = songs.findIndex(song => song.ele.src.endsWith(storedSong));
        currentSong = songs[current].ele;
        songName.textContent = songs[current].audioName;
        if (storedPlaying === 'true') {
            currentSong.play();
            playPauseIcon.className = 'ph-bold ph-pause'; // Set the correct class for playPauseIcon
        }
    }

    playBtn.addEventListener('click', () => {
        playPauseSong();
    });

    nextBtn.addEventListener('click', () => {
        updateSong('next');
        playPauseSong();
    });

    prevBtn.addEventListener('click', () => {
        updateSong('prev');
        playPauseSong();
    });

    const updateSong = (action) => {
        currentSong.pause();
        currentSong.currentTime = 0;

        if (action === 'next') {
            current++;
            if (current > songs.length - 1) current = 0;
        }
        if (action === 'prev') {
            current--;
            if (current < 0) current = songs.length - 1;
        }
        currentSong = songs[current].ele;
        songName.textContent = songs[current].audioName;

        localStorage.setItem('currentSong', currentSong.src);
    };

    const playPauseSong = () => {
        if (currentSong.paused) {
            currentSong.play();
            playPauseIcon.className = 'ph-bold ph-pause';
        } else {
            currentSong.pause();
            playPauseIcon.className = 'ph-bold ph-play';
        }
        localStorage.setItem('isPlaying', !currentSong.paused);
    };

    // Store the playback time in localStorage as it changes
    currentSong.addEventListener('timeupdate', () => {
        localStorage.setItem('currentPlaybackTime', currentSong.currentTime.toString());
    });
});
