class CreateFollowers < ActiveRecord::Migration[5.2]
  def change
    create_table :followers do |t|
      t.integer :user_id, null: false
      t.integer :follower, null: false

      t.timestamps
    end
    add_index :followers, :user_id
    add_index :followers, :follower
    add_index :followers, [:user_id, :follower], unique: true
  end
end
