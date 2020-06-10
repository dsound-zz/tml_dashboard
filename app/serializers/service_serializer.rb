class ServiceSerializer < ActiveModel::Serializer
  has_many :notes 
  has_many :outages

  attributes :id, :name, :is_down, :updated_at 

  
end
