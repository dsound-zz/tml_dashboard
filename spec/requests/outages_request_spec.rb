require 'rails_helper'

RSpec.describe "Outages", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/outages/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/outages/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/outages/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/outages/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/outages/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
