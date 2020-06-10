FactoryBot.define do 
   factory :outage, class: 'Outage' do 
        start_time { Time.now }
        end_time { start_time + Random.rand(1e4..1e6).minutes}
        is_recurring { false }
        frequency { "None" }
        reason { Faker::Company.bs }
        service_id { Random.rand(1..50) }
   end 

  
end