class Api::SongsController < ApplicationController

    def index
        @user = User.find_by(username: song_params[:username])
        if (@user)
            @songs = @user.songs

            render "/api/songs/index"
        else
            render json: ["The user was not found. Can not fetch songs."], status: 404
        end
    end

    def show
        @song = Song.find(params[:id])
        @user = User.find_by(username: @song.username)
        render :show
    end

    def create
        correct_params = song_params.deep_dup
        correct_params[:duration] = correct_params[:duration].to_f
        correct_params[:metadata] = correct_params[:metadata].split(",")#.map{|ele| ele.to_f}
        song = Song.new(correct_params)
        if (song.save)
            render json: ["Upload was successful"], status: 200
        else
            render json: song.errors.full_messages, status: 422
        end
    end

    def update
        song = Song.find(params[:id])
        if song.update(metadata: song_params[:metadata])
            render json: ["Update was successful"], status: 200
        else
            render json: song.errors.full_messages, status: 422
        end
    end

    private
    def song_params
        params.require(:song).permit(:title, :username, :metadata, :music_image, :music, :genre, :description, :duration)
    end
end