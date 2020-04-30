class Song < ApplicationRecord
    validates :title, presence: true

    serialize :metadata, Array
    
    
    has_one_attached :music
    validates :music, presence: true, blob: { content_type: :audio } # supported options: :image, :audio, :video, :text
    validate :ensure_music
    
    
    has_one_attached :image
    validates :image, presence: true, blob: { content_type: :image } # supported options: :image, :audio, :video, :text
    validate :ensure_image



    def ensure_music
        unless self.music.attached?
            errors[:music] << "The audio file was not attached."
        end
    end

    def ensure_image
        unless self.image.attached?
            errors[:image] << "The image file was not attached."
        end
    end



    belongs_to :author,
        primary_key: :username,
        foreign_key: :username,
        class_name: :User
end
