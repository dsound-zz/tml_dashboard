class Outage < ApplicationRecord
    belongs_to :service 
  
    validate :end_time_is_after_start_time
    validate :overlap
    validates_presence_of :start_time, :end_time, :reason, :frequency
    validates_inclusion_of :frequency, in: ["None", "Daily", "Monthly", "Yearly"]
    validates_length_of :reason, minimum: 10, maximum: 200

    
    

    private 
    
    def end_time_is_after_start_time
        errors.add(:end_time, 'is not after start time') unless end_time > start_time
    end

    def overlap
        if Outage.where('? < end_time AND ? > start_time AND service_id = ?', self.start_time, self.end_time, self.service_id).any? 
            errors.add(:base, message: "Outage range for service overlaps another")
        else      
            self 
        end     
    end 
    
end
