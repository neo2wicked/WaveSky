class AddNotNullOnSongs < ActiveRecord::Migration[5.2]
  def change
    change_column_null :songs, :user_id, false
  end
end
