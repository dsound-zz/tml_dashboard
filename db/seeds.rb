services = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

services.each { |service| Service.create(name: service) }

User.create(username: 'automated', password: 'sd0fu9sudafjo4') 
User.create(username: 'admin', password: 'admin')

# 5.times do |x| 
#     Service.find(Random.rand(1..50)).update(is_down: true)
# end 

# Outage.create(start_time: Time.now + 3e4, end_time: Time.now + 2e4, reason: "expected outage for AL", service_id: Service.where(:name => "AL"))
# Outage.create(start_time: Time.now, end_time: Time.now + 3e3, reason: "This outage was a restart of service", service_id: 10)
# Outage.create(start_time: Time.now + 2e4, end_time: Time.now + 2e4, is_recurring: true, frequency: "Weekly", service_id: 23)
# Outage.create(start_time: Time.now + 2e4, end_time: Time.now + 2e7, is_recurring: true, frequency: "Monthly", service_id: 23)




