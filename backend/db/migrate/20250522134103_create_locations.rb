class CreateLocations < ActiveRecord::Migration[8.0]
  def change
    create_table :locations do |t|
      t.string :location_name
      t.string :country
      t.string :state_code
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
