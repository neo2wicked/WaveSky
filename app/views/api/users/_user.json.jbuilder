json.extract! user, :id, :username
json.profilePhoto  user.profile_photo.attached? ? url_for(user.profile_photo) : false
json.profileBackground user.profile_background.attached? ? url_for(user.profile_background) : false
