class Song < ApplicationRecord
    validates :title, presence: true

    serialize :metadata, Array
    
    
    has_one_attached :music
    validate :ensure_music
    
    
    has_one_attached :music_image
    # validate :ensure_image



    def ensure_music
        unless self.music.attached?
            errors[:music] << "The audio file was not attached."
        end
    end

    # def ensure_image
    #     unless self.music_image.attached?
    #         errors[:image] << "The image file was not attached."
    #     end
    # end



    belongs_to :author,
        primary_key: :username,
        foreign_key: :username,
        class_name: :User
end
