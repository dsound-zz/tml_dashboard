class Api::V1::OutagesController < ApplicationController
  before_action :find_outage, only: [:show, :update, :destroy]
  before_action :check_outage_expire

  def index
    @outages = Outage.all 
    render :json => @outages, status: @ok 
  end

  def show
    render :json => @outage, status: @ok 
  end

  def create
    @outage = Outage.create!(outage_params) 
    if @outage.save 
      render :json => @outage, status: @ok   
    else        
      render :json => { errors: @outage.errors.full_messages }, status:  @unprocessible_entity
    end
  end

  def update
     @outage.update!(outage_params) 
     if @outage.save
      render :json => @outage, status: @ok 
    else       
      render :json => { errors: @outage.errors.full_messages }, status:  @unprocessible_entity
    end
  end

  def destroy
    outage_id = @outage.id
    @outage.delete  
    render :json =>  { outageId: outage_id}
  end

  private 

  def find_outage
    @outage = Outage.find(params[:id])
  end

  def outage_params
    params.permit(:start_time, :end_time, :is_recurring, :frequency, :reason, :service_id) 
  end

  def check_outage_expire
    expired_outages = Outage.where("end_time < ?", Time.now) 
    expired_outages.each { |eo| Outage.find(eo.id).delete }
  end


end
