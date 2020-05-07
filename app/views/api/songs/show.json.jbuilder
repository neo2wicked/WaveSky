json.extract! @song, :id, :title, :username, :metadata, :duration, :genre, :description
json.musicUrl url_for(@song.music)
json.imageUrl (@song.music_image.attached?) ? url_for(@song.music_image) : false
json.profilePhoto  (@user.profile_photo.attached?) ? url_for(@user.profile_photo) : false

if(@song.likes.length != 0)
    json.likes do
        @song.likes.each do |like|
            json.set! like.user_id do
                json.extract! like, :user_id, :song_id
            end
        end
    end
else
    json.likes ({})
end


if(@song.comments.length != 0)
    comments = []
    @song.comments.order(created_at: :desc).each do |comment|
        comments << comment.id
    end

    json.comments comments
else
    json.comments ([])
end



