class Song < ApplicationRecord
    validates :title, presence: true
    validates :duration, presence: true

    serialize :metadata, Array
    
    
    has_one_attached :music
    
    validate :ensure_music
    
    
    has_one_attached :music_image
    validates :music_image, content_type: ['image/jpg', 'image/png', 'image/jpeg']
    # validates :music_image, allow_nil: true
    # validate :ensure_image

    has_many :likes,
        primary_key: :id,
        foreign_key: :song_id,
        class_name: :Like



    belongs_to :author,
        primary_key: :username,
        foreign_key: :username,
        class_name: :User

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


end
