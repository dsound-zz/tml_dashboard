Rails.application.routes.draw do

  root 'dashboard#app', as: 'dashboard'
  
  get '/login', to: 'auth#login'  
  get '/app', to: 'dashboard#app', as: 'app'
  
  namespace :api do
    namespace :v1 do 
      resources :services, only: [:index, :show, :update] 
      resources :notes
      resources :outages
      get "current_user", to: "auth#get_user_from_token"
      post "login", to: "auth#login"
    end
  end


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.htm
end
