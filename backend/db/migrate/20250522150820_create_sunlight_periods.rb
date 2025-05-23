class CreateSunlightPeriods < ActiveRecord::Migration[8.0]
  def change
    create_table :sunlight_periods do |t|
      t.references :location, null: false, foreign_key: true
      t.date :date
      t.datetime :sunrise
      t.datetime :sunset
      t.datetime :golden_hour

      t.timestamps
    end
  end
end
