class Api::SunlightController < ApplicationController
  def show
    location_name = params[:location]
    start_date = params[:start_date] || Date.today.to_s
    end_date = params[:end_date] || Date.today.to_s

    locations_sunlight = []

    locations = Location.create_all_possible_matches(location_name: location_name)
 
    locations.each do |location|

      (start_date..end_date).step(1) do |date|
        data = SunlightFetcher.find_or_fetch(location: location, date: date)

        locations_sunlight << {
          location: {
            name: location.location_name,
            country: location.country,
            latitude: location.latitude,
            longitude: location.longitude
          },
          date: date,
          sunrise: data[:sunrise].to_time.strftime("%H:%M:%S"),
          golden_hour: data[:golden_hour].to_time.strftime("%H:%M:%S"),
          sunset: data[:sunset].to_time.strftime("%H:%M:%S")
        }
      end

    end

    render json: locations_sunlight

  rescue => e
    if e.message == "Location not found"
      render json: { error: e.message }, status: 400
    else
      render json: { error: e.message }, status: 500
    end
  end
end
