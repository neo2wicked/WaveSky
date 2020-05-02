class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render "/api/users/show"
        else
            render json: @user.errors.full_messages, status: 422
        end
        
    end

    def index
        username = user_params[:username].to_s
        @user = User.find_by(username: username)
        if (@user)
            render :index
        else
            render json: ["The user was not found."], status: 404
        end
    end


      def show
        @user = User.find(params[:id])
        if (@user)
            render :show
        else
            render json: ["The user was not found."], status: 404
        end
    end

    def update
        username = user_params[:username].to_s
        @user = User.find_by(username: username)
        if (@user)
            @user.update(user_params)
            render json: ["successful update."], status: 200
        else
            render json: ["The user was not found."], status: 404
        end
        
    end
    private
    def user_params
        params.require(:user).permit(:username, :password, :profile_photo, :background_photo)
    end
end
