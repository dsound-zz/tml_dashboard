require 'rails_helper'

RSpec.describe Outage, type: :model do
  let(:outage) { build(:outage) }


  describe "associations" do 
    it { should belong_to(:service) }
  end

  describe "validations" do 
    it { should validate_presence_of(:start_time) }
    it { should validate_presence_of(:end_time) }
    it { should validate_presence_of(:reason) }
    it { should validate_presence_of(:frequency) }  

    context "length" do 
      it { should validate_length_of(:reason).is_at_least(10) }
      it { should validate_length_of(:reason).is_at_most(200) }
    end 

    context "inclusion" do 
      it { should validate_inclusion_of(:frequency).in_array(["None", "Daily", "Monthly", "Yearly"]) }
    end

   

  end


end
