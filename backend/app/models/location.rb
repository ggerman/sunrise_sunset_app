class Location < ApplicationRecord

  geocoded_by :full_location

  after_validation :geocode, :if => :should_geocode?
  after_validation :set_location_details, :if => :should_geocode?

  validates :location_name, :presence => true
  validates :latitude, :longitude, :presence => true, :on => :update

  def full_location
    [location_name, country].compact.join(",")
  end

  def should_geocode?
    (latitude.blank? || longitude.blank?) && location_name.present?
  end

  def self.find_or_create_with_coordinates(location_name:, country: nil)
    location = find_by(:location_name => location_name, :country => country)

    return location if location.present?

    location = new(:location_name => location_name, :country => country)

    location.geocode
    location.set_location_details if location.latitude.present?

    
    if location.save
      location
    else
      raise StandardError, "Could not geocode: #{location.errors.full_messages.join(', ')}"
    end
  end

  def self.create_all_possible_matches(location_name:)
    results = Geocoder.search(location_name)
    saved_locations = []

    results.each do |geo|
      name = location_name
      country = geo.country
      lat = geo.latitude
      lon = geo.longitude
      state_code = geo.state_code

      next if Location.exists?(location_name: name, country: country)

      location = Location.new(
        location_name: name,
        country: country,
        state_code: state_code,
        latitude: lat,
        longitude: lon
      )

      if location.save
        saved_locations << location
      else
        Rails.logger.warn "No se pudo guardar: #{location.errors.full_messages.join(', ')}"
      end
    end

    saved_locations
  end

  def set_location_details
    return unless latitude.present? && longitude.present?

    geo = Geocoder.search([latitude, longitude]).first
    return unless geo

    self.country ||= geo.country
    self.state_code   ||= geo.state_code
  end
end
