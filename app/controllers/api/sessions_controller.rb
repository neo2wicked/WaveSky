class Api::SessionsController < ApplicationController

    def show       
        @user = User.find_by(username: params[:user][:username])
        if (@user)
            render json: ["user was found"], status: 200
        else
            render json: ["The user was not found."], status: 404 
        end
    end

    def create
        @user = User.find_by_credentials(
            params[:user][:username],
            params[:user][:password]
        )
        if (@user)
            login!(@user)
            render "/api/users/show"
        else
            render json: ["Invalid credentials. Please try again."], status: 401
        end
    end

    def destroy
        user = current_user
        if user
            logout!
        else
            render json: ["Nobody signed in."], status: 404  
        end
    end
end
