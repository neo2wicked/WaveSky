class SongsController < ApplicationController

    def index
        user = User.find(song_params[:user_id])
        if (user)
            @songs = user.songs
            render :index
        else
            render json: ["The user was not found. Can not fetch songs."], status: 404
        end
    end

    def show
        @song = Song.find(params[:id])
        render :show
    end

    def create
        song = Song.new(song_params)
        if (song.save)
            render json: ["Upload was successful"], status: 200
        else
            render json: ["Unable to upload the file"], status: 422
        end
    end

    private
    def song_params
        params.require(:song).permit(:title, :user_id, :music)
    end
end