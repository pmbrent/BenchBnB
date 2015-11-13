class Bench < ActiveRecord::Base

  def self.in_bounds(bounds)
    # bounds in the following format:
    # {
    #   "northEast"=> {"lat"=>"37.80971", "lng"=>"-122.39208"},
    #   "southWest"=> {"lat"=>"37.74187", "lng"=>"-122.47791"}
    # }

    return Bench.where("lat <= ? AND lat >= ?", bounds["northEast"]["lat"], bounds["southWest"]["lat"])
                .where("lng <= ? AND lng >= ?", bounds["northEast"]["lng"], bounds["southWest"]["lng"])
  end

end
