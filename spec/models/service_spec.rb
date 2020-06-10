require 'rails_helper'

RSpec.describe Service, type: :model do
  let(:service) { build(:service) }

  describe "assocications" do 
    it { should have_many(:notes) }
    it { should have_many(:outages) }
  end

  
end
