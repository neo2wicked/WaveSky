class Song < ApplicationRecord
    validates :title, presence: true

    has_one_attached :music

    belongs_to :author,
        primary_key: :username,
        foreign_key: :username,
        class_name: :User
end
