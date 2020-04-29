class ChangeUserIdTypeInSong < ActiveRecord::Migration[5.2]
  def change
    rename_column :songs, :user_id, :username
    change_column :songs, :username, :string
  end
end
