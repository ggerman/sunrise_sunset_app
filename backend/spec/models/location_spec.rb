# spec/models/location_spec.rb
require "spec_helper"

RSpec.describe Location, type: :model do
  describe ".find_or_create_with_coordinates" do
    it "creates a location with valid geocoding" do
      location = Location.find_or_create_with_coordinates(location_name: "Barcelona", country: "Spain")
      expect(location).to be_persisted
      expect(location.latitude).not_to be_nil
      expect(location.longitude).not_to be_nil
    end
  end

  describe ".create_all_possible_matches" do
    it "creates multiple matches for a city name" do
      locations = Location.create_all_possible_matches(location_name: "Lyon")
      expect(locations.size).to be >= 1
    end
  end
end

