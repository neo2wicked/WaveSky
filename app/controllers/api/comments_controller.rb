class Api::CommentsController < ApplicationController

    def index
        song = Song.find(comments_params[:song_id])
        @comments = song.comments.order(created_at: :desc)
        if (@comments)
            render "/api/comments/index"
        else
            @comments = {}
            render "/api/comments/index"
        end
    end

    def create
        comment = Comment.new(comments_params)
        if (comment.save)
            render json: ["The comment was saved."], status: 200
        else
            render json: ["The comment was not saved."], status: 422
        end

    end

    def destroy
        comment = Comment.find(params[:id])
        if comment
             comment.destroy
            render json: ["The comment was deleted."], status: 200
        else
            render json: ["The comment was not found."], status: 404
        end
    end

    private
    def comments_params
        params.require(:comment).permit(:body, :author_id, :song_id, :parent_id)
    end
end
