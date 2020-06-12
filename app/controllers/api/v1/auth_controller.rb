class Api::V1::AuthController < ApplicationController

    def login
        @user = User.find_by(username: params[:username])
        if @user && @user.authenticate(params[:password])
            token = encode_token(@user.id)
            render json: {user: UserSerializer.new(@user), token: token}, status: :ok
        else
            render json: {errors: "Your username/password is incorrect"}
        end
    end

    def get_user_from_token
        curr_user = User.find(2) 
        if curr_user 
            render json: { currentUser: curr_user }
        else
             render json: {errors: 'No user'}
        end
    end

end
