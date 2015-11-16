# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Bench.create(lat: 40.735768, lng: -73.990752, seating: 4,
  description: "A lovely spot in Union Square, great for people-watching!")

Bench.create(lat: 40.861626, lng: -73.931708, seating: 4,
  description: "A secluded spot in Fort Tryon Park, perfect for wildlife.")

Bench.create(lat: 40.796972, lng: -73.951248, seating: 3,
  description: "A nice spot in Central Park, good for people-watching and aquatic life!")
