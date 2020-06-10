class OutageSerializer < ActiveModel::Serializer
  belongs_to :service
  attributes :id, :start_time, :end_time, :is_recurring, :frequency, :reason, :service_id
end
