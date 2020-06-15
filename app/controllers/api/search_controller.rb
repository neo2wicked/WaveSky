class Api::SearchController < ApplicationController
     def index
        @songs = Song.where("lower(title) LIKE :search OR lower(genre) LIKE :search OR lower(username) LIKE :search", {:search => "%#{params[:search].downcase}%"})
        render "api/songs/index"
    end
end
