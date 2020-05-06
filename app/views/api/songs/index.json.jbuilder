@songs.each do |song|
    json.set! song.id do
        json.extract! song, :id, :title, :username, :metadata, :duration, :genre, :description
        json.musicUrl url_for(song.music)
        json.imageUrl (song.music_image.attached?) ? url_for(song.music_image) : false
        json.profilePhoto  (@user.profile_photo.attached?) ? url_for(@user.profile_photo) : false
       # json.profileBackground (@user.profile_background.attached?) ? url_for(@user.profile_background) : false
        
        if(song.likes.length != 0)
            json.likes do
                song.likes.each do |like|
                    json.set! like.user_id do
                        json.extract! like, :user_id, :song_id
                    end
                end
            end
        else
            json.likes ({})
        end
    end
end