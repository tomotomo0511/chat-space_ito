class CreateGroupUserrails < ActiveRecord::Migration[5.0]
  def change
    create_table :group_userrails do |t|
      t.references :group, foreign_key: true
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
