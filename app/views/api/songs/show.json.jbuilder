json.extract! @song, :title, :user_id
json.musicUrl url_for(@song.music)