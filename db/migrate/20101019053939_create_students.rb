class CreateStudents < ActiveRecord::Migration
  def self.up
    create_table :students do |t|
      t.string :name, :null => false
      t.string :yomi, :null => false
      t.string :grade
      t.timestamps
    end
  end

  def self.down
    drop_table :students
  end
end
