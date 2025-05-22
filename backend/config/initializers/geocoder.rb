Geocoder.configure(
  lookup: :opencage,
  api_key: ENV['OPENCAGE_API_KEY'],
  units: :km,
  timeout: 5
)

