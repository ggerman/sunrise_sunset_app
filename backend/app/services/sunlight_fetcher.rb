# app/services/sunlight_fetcher.rb

require 'net/http'
require 'uri'
require 'json'

class SunlightFetcher
  def self.find_or_fetch(location:, date:)
    period = SunlightPeriod.find_by(location: location, date: date)
    return period if period.present?

    response = fetch_from_api(location.latitude, location.longitude, date)

    raise "No data found for date #{date}" unless response

    SunlightPeriod.create!(
      location: location,
      date: date,
      golden_hour: response["golden_hour"],
      sunrise: response["sunrise"],
      sunset:  response["sunset"]
    )
  end

  def self.fetch_from_api(lat, lng, date)
    url = URI("https://api.sunrisesunset.io/json?lat=#{lat}&lng=#{lng}&date=#{date}")
    response = Net::HTTP.get_response(url)

    return nil unless response.is_a?(Net::HTTPSuccess)

    json = JSON.parse(response.body)
    data = json["results"]

    {
      "sunrise" => Time.parse(data["sunrise"]).utc.strftime("%H:%M:%S"),
      "golden_hour" => Time.parse(data["golden_hour"]).utc.strftime("%H:%M:%S"),
      "sunset"  => Time.parse(data["sunset"]).utc.strftime("%H:%M:%S")
    }
  rescue => e
    Rails.logger.error("Failed to fetch sunrise/sunset: #{e.message}")
    nil
  end
end

