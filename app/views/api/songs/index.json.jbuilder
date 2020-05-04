@songs.each do |song|
    json.set! song.id do
        json.extract! song, :id, :title, :username, :metadata, :duration
        json.musicUrl url_for(song.music)
        json.imageUrl (song.music_image.attached?) ? url_for(song.music_image) : false
        json.profilePhoto  (@user.profile_photo.attached?) ? url_for(@user.profile_photo) : false
        json.profileBackground (@user.profile_background.attached?) ? url_for(@user.profile_background) : false
    end
end