@songs.each do |song|
    json.set! song.id do
        json.extract! song, :id, :title, :username
        json.musicUrl url_for(song.music)
    end
end