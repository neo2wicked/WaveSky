class AddToSongsMetadata < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :metadata, :string
  end
end
