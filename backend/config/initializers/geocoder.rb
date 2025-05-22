Geocoder.configure(
  lookup: :opencagedata,
  api_key: ENV['OPENCAGE_API_KEY'],
  units: :km,
  timeout: 5
)

