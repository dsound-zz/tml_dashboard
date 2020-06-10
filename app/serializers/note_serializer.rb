class NoteSerializer < ActiveModel::Serializer
  belongs_to :service 
  belongs_to :user

  attributes :id, :entry, :is_public, :created_at, :user_id, :username, :service_id

  def username 
    object.user.username 
  end
end
