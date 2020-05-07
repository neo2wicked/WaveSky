json.array! @songs do |song|
    json.extract! song, :title, :username
    json.imageUrl (song.music_image.attached?) ? url_for(song.music_image) : false
    json.profilePhoto  (song.author.profile_photo.attached?) ? url_for(song.author.profile_photo) : false
end