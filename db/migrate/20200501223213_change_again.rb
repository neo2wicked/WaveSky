class ChangeAgain < ActiveRecord::Migration[5.2]
  def change
    change_column :songs, :duration, :float
  end
end
