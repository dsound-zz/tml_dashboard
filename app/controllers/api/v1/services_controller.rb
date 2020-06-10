class Api::V1::ServicesController < ApplicationController
  before_action :find_service, only: [:show, :update]
  # before_action :authenticate_user, only: :show

  def index
    down_services = Service.all.order("updated_at DESC").where(is_down: true) 
    up_services = Service.all.order("updated_at DESC").where(is_down: false)
    @services = down_services + up_services
    render :json => @services, status: @ok 
  end

  def show
    render :json => @service, status: @ok
  end

  def update
  end

  private 

  def find_service
    @service = Service.find(params[:id])
  end
end
