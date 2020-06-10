class Note < ApplicationRecord
  belongs_to :service
  belongs_to :user

  validates_presence_of :entry
  validates_length_of :entry, minimum: 2, maximum: 100
end
