class FixNewMigration < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :song_id, :integer, null: false
    add_index :comments, :song_id
  end
end
