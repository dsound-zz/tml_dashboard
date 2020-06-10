class Service < ApplicationRecord
    has_many :outages
    has_many :notes 

    after_update :automated_note
    
    private 

  

    def automated_note  
        if self.is_down    
            self.notes.create(user_id: 1, entry: "This service went down on #{self.updated_at.localtime} for #{self.name}.")
        else       
            self.notes.create(user_id: 1, entry: "This service went back up on #{self.updated_at.localtime} for #{self.name}.")
        end   
    end

end
