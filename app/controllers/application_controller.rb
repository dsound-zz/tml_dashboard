class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token

    def encode_token(user_id)
      JWT.encode({user_id: user_id}, Rails.application.credentials.jwt)
  end

  def token
    request.headers["Authorization"]
  end

  def decode_token
    begin
      JWT.decode(token, Rails.application.credentials.jwt).first
    rescue
      nil
    end
  end

  def curr_user
    decode_token && User.find_by(id: decode_token["user_id"]) 
  end

  def authenticate_user
  #   if curr_user
  #     true
  #   else
  #     render json: {error: 'Unauthorized User'}, status: :unauthorized
  #     false
  #   end
  # end
  curr_user = User.find(2) 
  end 
  
end
