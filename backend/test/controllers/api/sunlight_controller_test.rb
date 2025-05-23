require "test_helper"

class Api::SunlightControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get api_sunlight_show_url
    assert_response :success
  end
end
