require "spec_helper"
require 'webmock/rspec'

RSpec.describe SunlightFetcher do
  let(:location) {
    Location.create!(
      location_name: "Lisbon",
      country: "Portugal",
      latitude: 38.7169,
      longitude: -9.1399
    )
  }

  let(:date) { Date.new(2025, 5, 22) }

  let(:api_url) {
    "https://api.sunrisesunset.io/json?lat=#{location.latitude}&lng=#{location.longitude}&date=#{date}"
  }

  let(:mock_response) {
    {
      "results": {
        "sunrise": "05:55:00",
        "golden_hour": "7:34:09",
        "sunset": "20:30:00"
      }
    }.to_json
  }

  before do
    stub_request(:get, api_url)
      .to_return(status: 200, body: mock_response, headers: { 'Content-Type' => 'application/json' })
  end

  context "when no record exists for the date and location" do
    it "creates a new SunlightPeriod with fetched data" do
      result = SunlightFetcher.find_or_fetch(location: location, date: date)

      expect(result).to be_a(SunlightPeriod)
      expect(result.sunrise.utc.strftime("%H:%M")).to eq("05:55")
      expect(result.sunset.utc.strftime("%H:%M")).to eq("20:30")
    end
  end

  context "when a record already exists" do
    before do
      SunlightPeriod.create!(
        location: location,
        date: date,
        sunrise: Time.utc(2025, 5, 22, 6, 0).strftime("%H:%M:%S"),
        golden_hour: Time.utc(2025, 5, 22, 6, 0).strftime("%H:%M:%S"),
        sunset: Time.utc(2025, 5, 22, 20, 0).strftime("%H:%M:%S")
      )
    end

    it "returns the existing record without calling the API" do
      expect(Net::HTTP).not_to receive(:get_response)
      result = SunlightFetcher.find_or_fetch(location: location, date: date)

      expect(result.sunrise.utc.hour).to eq(6)
    end
  end
end
