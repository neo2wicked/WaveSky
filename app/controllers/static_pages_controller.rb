require "byebug"
class StaticPagesController < ApplicationController

    def root
        if (params[:username])
            user = User.find_by(username: params[:username])
            if (user)
                render `/#{user.username}`
            else
                redirect_to '/'
            end
        end
    end

    
    
end
