class Api::LikesController < ApplicationController
    def create
        like = Like.find_by(user_id: like_params[:user_id], song_id: like_params[:song_id])
        if like
            like.destroy
            render json: ["Like deleted"], status: 200
        else
            like = Like.new(like_params)
            if like.save
                render json: ["Like created"], status: 200
            else
                render json: ["Unable to save the like"], status: 422
            end
        end

    end

    private
    def like_params
        params.require(:like).permit(:user_id, :song_id)
    end
end
