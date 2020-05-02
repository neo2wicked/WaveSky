json.extract! @song, :title, :username, :duration
json.imageUrl (song.music_image.attached?) ? url_for(song.music_image) : false
json.musicUrl url_for(@song.music)