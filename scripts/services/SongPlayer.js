(function() {
    function SongPlayer($rootScope, Fixtures) {
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
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            

                SongPlayer.currentSong = song;
        };
        
        /**
        * @function playSong
        * @desc plays song and sets a song as playing
        * @param {object}
        **/
        var playSong = function(song) {
            currentBuzzObject.setVolume(SongPlayer.volume);
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
        *@desc Current Playback time (in secons) of currently playing song
        *@type number
        */
        SongPlayer.currentTime = null;
        /**
        *@desc holds song volume
        *@type number
        */        
        SongPlayer.volume = 80;
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
            SongPlayer.autoPlay();
        };
        
        SongPlayer.autoPlay = function() {
            currentBuzzObject.bind("ended", SongPlayer.next);
        }
        
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
        
        SongPlayer.mute = function(song) {
            currentBuzzObject.mute();
            SongPlayer.currentSong.mute = true;
        }
        
        SongPlayer.unmute = function(song) {
            currentBuzzObject.unmute();
            SongPlayer.currentSong.mute = false;
        }
        
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
            SongPlayer.autoPlay();
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
            SongPlayer.autoPlay();
        };
        
        SongPlayer.setCurrentTime = function(time) {
            if(currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        /**
        * @function SongPlayer.setVolume
        * @desc sets volume
        * @param number
        **/
        SongPlayer.setVolume = function(volume) {
            SongPlayer.volume = volume;
            currentBuzzObject.setVolume(volume);
        }
        
        return SongPlayer;

    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();