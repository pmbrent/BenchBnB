class AddSeatingColumn < ActiveRecord::Migration
  def change
    add_column :benches, :seating, :integer, null: false, default: 3
  end
end
