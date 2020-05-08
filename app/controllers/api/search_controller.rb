class Api::SearchController < ApplicationController
     def index
        @songs = Song.where("lower(title) LIKE :search OR lower(genre) LIKE :search", {:search => "%#{params[:search]}%"})
        render "api/songs/index"
    end
end
