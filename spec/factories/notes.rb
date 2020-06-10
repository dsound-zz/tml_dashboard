FactoryBot.define do 
    factory :note do 
        entry { Faker::Company.bs }
        is_public { true }
        user_id { 2 }
        service_id { Random.rand(1..50) }
    end 
end