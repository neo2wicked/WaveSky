if(@comments)
    json.array! @comments do |comment|
        json.username comment.user.username
        json.profile_photo (comment.user.profile_photo.attached? ? url_for(comment.user.profile_photo) : false)
        json.extract! comment, :id, :body, :author_id
    end
else
    ([])
end