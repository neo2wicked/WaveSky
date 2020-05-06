class Comment < ApplicationRecord
    validates :author_id, :body, :song_id, presence: true

end
