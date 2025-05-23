class Api::SunlightController < ApplicationController
  def show
    location_name = params[:location]
    date = params[:date] || Date.today.to_s

    location = Location.find_or_create_with_coordinates(location_name: location_name)
    data = SunlightFetcher.find_or_fetch(location: location, date: date)

    render json: {
      location: {
        name: location.location_name,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude
      },
      date: date,
      sunrise: data[:sunrise],
      golden_hour: data[:golden_hour],
      sunset: data[:sunset]
    }
  rescue => e
    if e.message == "Location not found"
      render json: { error: e.message }, status: 400
    else
      render json: { error: e.message }, status: 500
    end
  end
end
