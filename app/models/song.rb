class Song < ApplicationRecord
    validates :title, presence: true

    has_one_attached :music

    has_one :author,
        foreign_key: :user_id,
        class_name: :User
end
