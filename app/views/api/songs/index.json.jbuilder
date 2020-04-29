json.array! @songs do |song|
    json.set! song.id do
        json.extract! song, :id, :title, :user_id
        json.musicUrl url_for(song.music)
    end
end