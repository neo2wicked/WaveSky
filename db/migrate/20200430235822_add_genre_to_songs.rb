class AddGenreToSongs < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :genre, :string
    add_index :songs, :genre
  end


end
