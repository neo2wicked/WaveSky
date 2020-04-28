class Song < ApplicationRecord
    validates :title, presence: true

    has_one_attached :music
end
