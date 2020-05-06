json.extract! user, :id, :username, :instagram, :facebook, :description
json.profilePhoto  user.profile_photo.attached? ? url_for(user.profile_photo) : false
json.profileBackground user.profile_background.attached? ? url_for(user.profile_background) : false
json.tracks user.songs.length
if(user.followers.length != 0)
    json.followers do
        user.followers.each do |person|
            json.set! person.follower do
                json.extract! person, :follower
            end
        end
    end
else
    json.followers ({})
end

if(user.following.length != 0)
    json.following do
        user.following.each do |person|
            json.set! person.user_id do
                json.extract! person, :user_id
            end
        end
    end
else
    json.following ({})
end



