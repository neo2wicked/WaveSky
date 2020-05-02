class ChangeFloat < ActiveRecord::Migration[5.2]
  def change
    change_column :songs, :duration, :decimal
  end
end
