require 'rails_helper'

RSpec.describe Note, type: :model do
  let(:note) { build(:note) }

  describe "associations" do 
    it { should belong_to(:user).class_name("User") }
    it { should belong_to(:service).class_name("Service") }
  end

  describe "validations" do 
    it { should validate_presence_of(:entry) }
    it { should validate_presence_of(:is_public) }

    context "length" do   
      it { should validate_length_of(:entry).is_at_least(2) }
      it { should validate_length_of(:entry).is_at_most(100) }
    end
  end

  describe "custom validations" do 
    
  end

end
