class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :password_digest, null: false 
      t.boolean :is_admin, default: false 
      t.timestamps
    end
  end
end
