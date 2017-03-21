(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
        /**
        * @desc gets the album and sets variable
        * @type function that gets and album {Object}
        */
        var currentAlbum = Fixtures.getAlbum();        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function (song) {
             if (currentBuzzObject) {
                    stopSong();
                }

                currentBuzzObject = new buzz.sound(song.audioUrl, {
                    formats: ['mp3'],
                    preload: true
                });

                SongPlayer.currentSong = song;
        };
        
        /**
        * @function playSong
        * @desc plays song and sets a song as playing
        * @param {object}
        **/
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /**
        * @function getSongIndex
        * @desc get the index of current song
        * @param {object}
        */        
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        var stopSong = function() {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }
        
        SongPlayer.currentSong = null;
        
        /**
        * @function SongPlayer.play
        * @desc checks if the current song is not playing, if true it sets the song and plays it, * otherwise plays song if it is paused
        * @param {object}
        **/
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        
        /**
        * @function SongPlayer.pause
        * @desc pauses song and sets no song playing
        * @param {object}
        **/
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @function SongPlayer.previous
        * @desc gets song index -1
        * @param none
        **/
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if(currentSongIndex < 0) {
                stopSong();
            }
            else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if(currentSongIndex > currentAlbum.songs.length - 1){
                currentSongIndex = 0;
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
            else{
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;

    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();