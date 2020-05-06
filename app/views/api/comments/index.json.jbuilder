if(@comments)
    @comments.each do |comment|
        json.set! comment.id do
            json.extract! comment, :body, :author_id
        end
    end
else
    ({})
end