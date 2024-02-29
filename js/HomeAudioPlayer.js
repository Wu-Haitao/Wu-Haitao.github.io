var albumArt = $("#album-art"),
      playPauseButton = $("#play-pause-button"),
      i = playPauseButton.find("i"),
      playProgress,
      bTime,
      nTime = 0,
      buffInterval = null,
      albumArtworks = ["_1", "_2", "_3", "_4", "_5"],
      trackUrl = [
        "https://wu-haitao.github.io/music/John Lennon - Imagine.mp3",
        "https://wu-haitao.github.io/music/Nazareth - Love Hurts.mp3",
        "https://wu-haitao.github.io/music/Tears For Fears - Everybody Wants To Rule The World.mp3",
        "https://wu-haitao.github.io/music/Queen - Under Pressure.mp3",
        "https://wu-haitao.github.io/music/David Bowie - Heroes.mp3"
      ],
      playPreviousTrackButton = $("#play-previous"),
      playNextTrackButton = $("#play-next"),
      currIndex = -1;
  
    function playPause() {
      setTimeout(function () {
        if (audio.paused) {
          albumArt.addClass("active");
          checkBuffering();
          i.attr("class", "fas fa-pause");
          audio.play();
        } else {
          albumArt.removeClass("active");
          clearInterval(buffInterval);
          albumArt.removeClass("buffering");
          i.attr("class", "fas fa-play");
          audio.pause();
        }
      }, 300);
    }
  
    function updateCurrTime() {
      nTime = new Date();
      nTime = nTime.getTime();
  
      playProgress = (audio.currentTime / audio.duration) * 100;
  
      if (playProgress == 100) {
        i.attr("class", "fa fa-play");
        albumArt.removeClass("buffering").removeClass("active");
        clearInterval(buffInterval);
        selectTrack(1);
      }
    }
  
    function checkBuffering() {
      clearInterval(buffInterval);
      buffInterval = setInterval(function () {
        if (nTime == 0 || bTime - nTime > 1000) albumArt.addClass("buffering");
        else albumArt.removeClass("buffering");
  
        bTime = new Date();
        bTime = bTime.getTime();
      }, 100);
    }
  
    function replay() {
      audio.currentTime = 0;
    }
  
    function selectTrack(flag) {
      if (flag == 0 || flag == 1) ++currIndex;
      else --currIndex;
  
      if (!(currIndex > -1 && currIndex < albumArtworks.length)) {
        if (flag == 0 || flag == 1) currIndex = 0;
        else currIndex = albumArtworks.length - 1;
      }
      if (flag == 0) i.attr("class", "fa fa-play");
      else {
        albumArt.removeClass("buffering");
        i.attr("class", "fa fa-pause");
      }
  
      currArtwork = albumArtworks[currIndex];
  
      audio.src = trackUrl[currIndex];
  
      nTime = 0;
      bTime = new Date();
      bTime = bTime.getTime();
  
      if (flag != 0) {
        audio.play();
        albumArt.addClass("active");
  
        clearInterval(buffInterval);
        checkBuffering();
      }
      albumArt.find("img.active").removeClass("active");
      $("#" + currArtwork).addClass("active");
    }
  
    function initPlayer() {
      audio = new Audio();
  
      selectTrack(0);
  
      audio.loop = false;
  
      playPauseButton.on("click", playPause);
  
      //albumArt.on("click", replay);
  
      $(audio).on("timeupdate", updateCurrTime);
  
      playPreviousTrackButton.on("click", function () {
        selectTrack(-1);
      });
      playNextTrackButton.on("click", function () {
        selectTrack(1);
      });
    }
  
    initPlayer();
  
