class Follower < ApplicationRecord
       validates :user_id, uniqueness: { scope: :follower }
    
    # belongs_to :user,
    #     primary_key: :id,
    #     foreign_key: :user_id,
    #     class_name: :User
    
    #     belongs_to :follower,
    #     primary_key: :id,
    #     foreign_key: :follower_id,
    #     class_name: :User
end
