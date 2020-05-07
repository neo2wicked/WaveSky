class Api::RandomSongsController < ApplicationController
    def index
        @songs = Song.limit(12).order("RANDOM()")
        render "/api/songs/index"

    end
end
