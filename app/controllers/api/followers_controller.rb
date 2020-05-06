class Api::FollowersController < ApplicationController
    def create
        follower = Follower.find_by(user_id: follower_params[:user_id], follower: follower_params[:follower])
        if follower
            follower.destroy
            render json: ["Follower deleted"], status: 200
        else
            follower = Follower.new(follower_params)
            if follower.save
                render json: ["Follower created"], status: 200
            else
                render json: ["Unable to save the follower"], status: 422
            end
        end

    end

    private
    def follower_params
        params.require(:follower).permit(:user_id, :follower)
    end
end
