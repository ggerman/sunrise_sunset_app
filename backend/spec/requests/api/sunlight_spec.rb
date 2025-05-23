require 'swagger_helper'

RSpec.describe 'api/sunlight', type: :request do
  before(:each) do
    WebMock.allow_net_connect!
  end

  path '/api/sunlight/show' do

    get('show sunlight') do

      tags "Sunlight"
      produces "application/json"
      parameter name: :location, in: :query, type: :string, required: true, description: "City or place name"
      parameter name: :start_date, in: :query, type: :string, format: :date, required: false, description: "Date in YYYY-MM-DD format (defaults to today)"
      parameter name: :end_date, in: :query, type: :string, format: :date, required: false, description: "Date in YYYY-MM-DD format (defaults to today)"

      response(200, 'successful') do
        let(:location) { "Lisbon" }
        let(:start_date) { "2025-01-01" }
        let(:end_date) { "2025-06-01" }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end

      response "400", "missing location" do
        let(:location) { nil }
        let(:start_date) { "2025-01-01" }
        let(:end_date) { "2025-06-01" }

        it "returns a 400 response" do |example|
          submit_request(example.metadata)
          expect(response).to have_http_status(:bad_request)
        end
      end

      response "400", "internal error" do
        let(:location) { "!" * 300 }

        it "returns a 400 response" do |example|
          submit_request(example.metadata)
          expect(response).to have_http_status(:bad_request)
        end
      end

    end
  end
end
