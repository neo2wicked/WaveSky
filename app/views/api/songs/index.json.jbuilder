@songs.each do |song|
    json.set! song.id do
        json.extract! song, :id, :title, :username, :metadata
        json.musicUrl url_for(song.music)
        json.imageUrl (song.music_image.attached?) ? url_for(song.music_image) : false
    end
end