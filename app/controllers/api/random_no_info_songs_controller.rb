class Api::RandomNoInfoSongsController < ApplicationController
    def index
        @songs = Song.limit(12).order("RANDOM()")
        render "/api/random_no_info_songs/main"
    end
end
