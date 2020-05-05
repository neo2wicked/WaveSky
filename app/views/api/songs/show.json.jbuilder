json.extract! @song, :title, :username, :duration
json.imageUrl (song.music_image.attached?) ? url_for(song.music_image) : false
json.musicUrl url_for(@song.music)
json.profilePhoto  (@user.profile_photo.attached?) ? url_for(@user.profile_photo) : false
json.profileBackground (@user.profile_background.attached?) ? url_for(@user.profile_background) : false
json.array! song, :likes