json.extract! @song, :title, :username
json.musicUrl url_for(@song.music)