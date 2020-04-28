class AddAuthorIdToSongs < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :user_id, :integer
    add_index :songs, :user_id
  end
end
